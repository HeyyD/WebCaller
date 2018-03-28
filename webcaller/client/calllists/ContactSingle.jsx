import React from 'react';
import ReactDOM from 'react-dom';

export default class ContactSingle extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(<li><a href={"calllists/"+this.props.contact._id}>{this.props.contact.name}</a><button>X</button></li>);
    }

}