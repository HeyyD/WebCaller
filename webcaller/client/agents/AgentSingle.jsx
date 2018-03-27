import React from 'react';
import ReactDOM from 'react-dom';

export default class AgentSingle extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(<li>{this.props.agent.username}</li>);
    }

}