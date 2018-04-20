import React, { Component } from 'react';
import ContactList from './ContactList';

import './styles/AddContact.css';

class Contacts extends Component {

  contacts = [];

  constructor(props) {
    super(props);
    this.state = {"addContactView": false};
    this.changeAddContactView = this.changeAddContactView.bind(this);
    this.addContact = this.addContact.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changeAddContactView(){
    this.setState({"addContactView": !this.state.addContactView});
  }

  addContact(){
    let newContact = {phone: this.state.phone,
                      name: this.state.name,
                      company: this.state.company};

    this.contacts.push(newContact);
    this.changeAddContactView();
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    if(this.state.addContactView)
      return (
          <div>
            <table className="Add-contact">
              <tbody>
                <tr>
                  <td>Phone:</td>
                  <td><input type="number" name="phone" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td><input type="text" name="name" onChange={this.handleChange}/></td>
                </tr>
                <tr>
                  <td>Company:</td>
                  <td><input type="text" name="company" onChange={this.handleChange}/></td>
                </tr>
              </tbody>
            </table>
            <div className="Last-row">
              <button onClick={this.addContact}>Add Contact</button>
              <button onClick={this.changeAddContactView}>Cancel</button>
            </div>
          </div>
      );
    else
      return <ContactList onClick={this.changeAddContactView} contacts={this.contacts}/>;
  }
}
export default Contacts;