import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AgentsForm from './AgentsForm.jsx';
import AgentSingle from './AgentSingle.jsx';
import './styles/agentStyles.css';

export default class AgentsPage extends TrackerReact(React.Component) {


    constructor(props){
        super(props);
        this.state = ({
            subscription: {
                agents: Meteor.subscribe("subUsers"),
                projects: Meteor.subscribe("userProjects")
            }
        });
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
                <AgentsForm />
                <ul className="agentsList">
                    {this.subUsers().map((agent) => {
                        if(agent._id != Meteor.userId())
                            return <AgentSingle key={agent._id} agent={agent} />;
                    })}
                </ul>
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