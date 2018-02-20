import React, { Component } from 'react';

import './styles/MainView.css'

let contacts;

class Contacts extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    //TODO: Contact class
    return <ContactList/>
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
      <button>Add Contact</button>
    </div>
    );
  }
}