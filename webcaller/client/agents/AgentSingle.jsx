import React from 'react';
import ReactDOM from 'react-dom';

export default class AgentSingle extends React.Component {

    constructor(props){
        super(props);
    }

    deleteAgent(){
        
    }

    render(){
        return(<li>{this.props.agent.username}<button onclick={this.deleteAgent}>delete</button></li>);
    }

}