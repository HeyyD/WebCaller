import React from 'react';
import ReactDOM from 'react-dom';

export default class AgentSingle extends React.Component {

    constructor(props){
        super(props);
        this.deleteAgent = this.deleteAgent.bind(this);
    }

    deleteAgent(){
        Meteor.call('deleteAgent', this.props.agent._id);
    }

    render(){
        console.log(this.props.agent);
        return(<li className="agentSingle">{this.props.agent.username}
                    <button className="agentBtn" onClick={this.deleteAgent}>
                        delete
                    </button>
                </li>);
    }

}