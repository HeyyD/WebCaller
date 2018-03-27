import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AgentsForm from './AgentsForm.jsx';
import AgentSingle from './AgentSingle.jsx';


export default class AgentsPage extends TrackerReact(React.Component) {


    constructor(props){
        super(props);
        this.state = ({
            subscription: {
                agents: Meteor.subscribe("subUsers")
            }
        });
    }

    componentWillUnmount(){
        this.state.subscription.agents.stop();
    }

    subUsers(){
        return Meteor.users.find().fetch();
    }

    render(){
        return(
            <div>
                <AgentsForm />
                <ul>
                    {this.subUsers().map((agent) => {
                        if(agent._id != Meteor.userId())
                            return <AgentSingle key={agent._id} agent={agent} />;
                    })}
                </ul>
            </div>
        );
    }


}