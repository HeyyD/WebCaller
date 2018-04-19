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

    componentWillReceiveProps(props){
        this.setState({contacts: props.contacts});
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    

    render(){

    }
}