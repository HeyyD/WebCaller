import React, { Component } from 'react';

import './styles/MainView.css'

let contacts;

class Contacts extends Component {

  constructor(props) {
    super(props);
    this.state = {"addContactView": false};
    this.addContact = this.addContact.bind(this);
  }

  addContact(){
    this.setState({"addContactView": !this.state.addContactView});
  }

  render() {
    if(!this.state.addContactView)
      return <ContactList onClick={this.addContact}/>
    else return <p>Jee</p>
  }
}
export default Contacts;

class ContactList extends Component {

  constructor(props){
    super(props);
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
          <tr>
            <td>+35840666666</td>
            <td>Banaani Tom</td>
            <td>PornHub</td>
            <td><button>Call</button></td>
          </tr>
        </tbody>
      </table>
      <button onClick={this.props.onClick}>Add Contact</button>
    </div>
    );
  }
}