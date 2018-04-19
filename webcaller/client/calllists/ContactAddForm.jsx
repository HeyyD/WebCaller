import React from 'react';
import ReactDOM from 'react-dom';

export default class ContactAddForm extends React.Component {
    constructor(props){
        super(props);

        this.state = ({
            contacts: []
        })
        this.handleChange = this.handleChange.bind(this);
        this.addContact = this.addContact.bind(this);
    }

    

    render(){

    }
}