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
        return(<tr><td className="agentSingle">{this.props.agent.username}</td>
                    <td className="agentBtn"><button  onClick={this.deleteAgent}>
                        delete
                    </button></td>
                </tr>);
    }

}