import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AgentsForm from './AgentsForm.jsx';
import AgentSingle from './AgentSingle.jsx';
import './styles/agentStyles.css';

export default class AgentsPage extends TrackerReact(React.Component) {


    constructor(props){
        super(props);

        this.onSubscriptionReady = this.onSubscriptionReady.bind(this);
        this.state = ({
            subscription: {
                agents: Meteor.subscribe("subUsers"),
                projects: Meteor.subscribe("userProjects", this.onSubscriptionReady)
            },
            projects: []
        });
    }

    onSubscriptionReady(){
        
        let projects = CallProjects.find().fetch();
        this.setState({
            projects: projects
        })
    }

    componentWillUnmount(){
        this.state.subscription.agents.stop();
        this.state.subscription.projects.stop();
    }

    subUsers(){
        return Meteor.users.find().fetch();
    }
    renderContent(){
        if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
            return(
                <div>
                <AgentsForm projects={this.state.projects}/>
                <table className="agentsList">
                    {this.subUsers().map((agent) => {
                        if(agent._id != Meteor.userId())
                            return <AgentSingle key={agent._id} agent={agent} />;
                    })}
                </table>
            </div>
            );
        }else {
            return(
                <div>
                    <p> Not authorized! </p>
                </div> 
            );
        }
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }


}