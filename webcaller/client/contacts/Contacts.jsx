import React, { Component } from 'react';

import './styles/AddContact.css'

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
            <form id="addContact">
              <div>
                <label>Phone:</label>
                <input type="number" name="phone" onChange={this.handleChange}/>
              </div>
              <div>
                <label>Name:</label>
                <input type="text" name="name" onChange={this.handleChange}/>
              </div>
                <label>Company:</label>
                <input type="text" name="company" onChange={this.handleChange}/>
            </form>

            <div id="lastRow">
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

class ContactList extends Component {

  constructor(props){
    super(props);
    this.createContactList = this.createContactList.bind(this);
  }

  createContactList(){
    let contactList = this.props.contacts;
    let tableRows = [];
    
    for(let i = 0; i < contactList.length; i++) {
      tableRows.push(<tr key={i}>
                      <td>{contactList[i].phone}</td>
                      <td>{contactList[i].name}</td>
                      <td>{contactList[i].company}</td>
                      <td><button>Call</button></td>
                    </tr>);
    }
    return tableRows;
  }

  render(){    
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Phone</th>
              <th>Name</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {this.createContactList()}
          </tbody>
        </table>
        <button id="addContactButton" onClick={this.props.onClick}>Add Contact</button>
    </div>
    );
  }
}