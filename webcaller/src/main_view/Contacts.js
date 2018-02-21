import React, { Component } from 'react';

import './MainView.css'
import './AddContact.css'

//let contacts;

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
    if(this.state.addContactView)
      return (
          <div>
            <form id="addContact">
              <div>
                <label>Phone:</label>
                <input type="number"/>
              </div>
              <div>
                <label>Name:</label>
                <input type="text"/>
              </div>
                <label>Company:</label>
                <input type="text"/>
            </form>

            <div id="lastRow">
              <button>Add Contact</button>
              <button>Cancel</button>
            </div>
          </div>
      );
    else
      return <ContactList onClick={this.addContact}/>;
  }
}
export default Contacts;

class ContactList extends Component {
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