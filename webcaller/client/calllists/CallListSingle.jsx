import React from 'react';
import ReactDOM from 'react-dom';

export default class CallListSingle extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(<li><a href={"calllists/"+this.props.list._id}>{this.props.list.name}</a><button>X</button></li>);
    }

}