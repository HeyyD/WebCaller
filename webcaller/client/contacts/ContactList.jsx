import React, { Component } from 'react';

class ContactList extends Component {
  constructor(props){
    super(props);
    this.createContactList = this.createContactList.bind(this);
  }

  makeCall(number){
    Meteor.call('makeCall', number, (error) => {
      console.log('hi!');
    });
  }

  createContactList(){
    let contactList = this.props.contacts;
    let tableRows = [];

    for(let i = 0; i < contactList.length; i++) {
      tableRows.push(<tr key={i}>
        <td>{contactList[i].phone}</td>
        <td>{contactList[i].name}</td>
        <td>{contactList[i].company}</td>
        <td><button onClick={ () => this.makeCall(contactList[i].phone)}>Call</button></td>
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
export default ContactList;