import React, { Component } from 'react';
import './styles/ContactList.css';
import CallWindow from "./CallWindow";

class ContactList extends Component {
  constructor(props){
    super(props);
    this.createContactList = this.createContactList.bind(this);
    this.openCall = this.openCall.bind(this);
    this.toggleCallWindow = this.toggleCallWindow.bind(this);
    this.initProjects = this.initProjects.bind(this);
    this.initCallLists = this.initCallLists.bind(this);

    this.state = {
      showCallWindow: false,
      currentCustomer: null,
      projectOptions: [],
      projects: [],
      subscription: {
        projects: Meteor.subscribe("userProjects", this.initProjects),
        callLists: Meteor.subscribe('callLists', this.initCallLists)
      }
    };
  }

  initProjects() {
    let pr = CallProjects.find().fetch();

    for(let i = 0; i < pr.length; i++) {
      this.state.projectOptions.push(<option key={i}>{pr[i].name}</option>);
    }

    this.setState({
      projects : pr
    });
  }

  initCallLists() {
    console.log('init');
  }

  toggleCallWindow() {
    this.setState({
      showCallWindow: !this.state.showCallWindow
    });
  }

  openCall(customer){
    this.setState({
      showCallWindow: !this.state.showCallWindow,
      currentCustomer: customer
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
        <td className="Contact-table-call"><a href="" onClick={ () => this.openCall(i)}>Call</a></td>
      </tr>);
    }
    return tableRows;
  }
  render(){
    return (
        <div>

          <select>
            {this.state.projectOptions}
          </select>

          <select>
            <option>Call list</option>
          </select>

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
          {this.state.showCallWindow ?
            <CallWindow toggle={this.toggleCallWindow} currentCustomer={this.state.currentCustomer} contacts={this.props.contacts}/>
            : null
          }
        </div>
    );
  }
}
export default ContactList;