import React, { Component } from 'react';
import './styles/ContactList.css';
import CallWindow from "./CallWindow";

class ContactList extends Component {
  constructor(props){
    super(props);
    this.createContactList = this.createContactList.bind(this);

    this.state = {
      showCallWindow: false
    };
  }

  makeCall(customer){
    Meteor.call('makeCall', customer.number, (error) => {
      console.log(customer);
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
        <td className="Contact-table-call"><a href="" onClick={ () => this.makeCall(contactList[i])}>Call</a></td>
      </tr>);
    }
    return tableRows;
  }

  render(){
    return (
        <div>
          <table className="Contact-table">
            <thead>
            <tr>
              <th>Phone</th>
              <th>Name</th>
              <th>Company</th>
            </tr>
            </thead>
            <tbody className="Contact-table">
              {this.createContactList()}
            </tbody>
          </table>
          <button id="addContactButton" onClick={this.props.onClick}>Add Contact</button>
          {this.state.showCallWindow ?
            <CallWindow/>
            : null
          }
        </div>
    );
  }
}
export default ContactList;