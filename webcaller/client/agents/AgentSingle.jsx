import React from 'react';
import ReactDOM from 'react-dom';

export default class AgentSingle extends React.Component {

    constructor(props){
        super(props);
    }

    deleteAgent(){
        Meteor.call('deleteAgent', this.props.agent._id);
    }

    render(){
        console.log(this.props.agent);
        return(<li>{this.props.agent.username}<button onClick={this.deleteAgent}>delete</button></li>);
    }

}