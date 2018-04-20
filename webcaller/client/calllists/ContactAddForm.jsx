import React from 'react';
import ReactDOM from 'react-dom';

export default class ContactAddForm extends React.Component {
    constructor(props){
        super(props);

        this.state = ({
            id: props.id,
            contacts: props.contacts,
            keys: Object.keys(props.contacts[0])
        })
        this.handleChange = this.handleChange.bind(this);
        this.addContact = this.addContact.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    addContact(event){

        let newContact = {};
        this.state.keys.map( (key) => {
            newContact[key] = this.state[key];
        });
        let newContacts = this.state.contacts;
        newContacts.push(newContact);
        Meteor.apply('insertContact', [this.state.id, newContacts]);

        this.refs.form.reset();
        event.preventDefault();
    }

    render(){

        return(
            <form ref="form">
                <div>
                    {this.state.keys.map( (key) => {
                        return(
                        <div>
                            <label>{key}</label>
                        
                            <input type="text" 
                                name={key}
                                ref={key}
                                onChange={this.handleChange}/>
                        </div>
                        )
                    })}
                    <button onClick={this.addContact}>Add Contact</button>
                </div>
            </form>
        );
    }
}