import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AgentsForm from './AgentsForm.jsx';


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

    render(){
        return(
            <div>
                <AgentsForm />
            </div>
        );
    }


}