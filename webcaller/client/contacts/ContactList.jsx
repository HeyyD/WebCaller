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
    this.callListChange = this.callListChange.bind(this);
    this.projectChange = this.projectChange.bind(this);

    this.state = {
      showCallWindow: false,
      currentCustomer: null,
      currentList: null,
      tableRows: [],
      projectOptions: [],
      callListOptions: [],
      projects: [],
      callLists: [],
      subscription: {
        projects: Meteor.subscribe("userProjects", this.initProjects),
        callLists: Meteor.subscribe("callLists", this.initCallLists)
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
    let cl = CallLists.find().fetch();
    let temp = [];

    for(let i = 0; i < cl.length; i++) {
      temp.push(<option key={i} value={i}>{cl[i].name}</option>);
    }

    this.setState({
      callListOptions: temp,
      callLists: cl
    });
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

  createContactList(list){
    let tableRows = [];

    for(let i = 0; i < list.length; i++) {
      tableRows.push(<tr key={i}>
        <td>{list[i].phone}</td>
        <td>{list[i].name}</td>
        <td>{list[i].company}</td>
        <td className="Contact-table-call"><a href="" onClick={ () => this.openCall(i)}>Call</a></td>
      </tr>);
    }
    this.setState({
      currentList: list,
      tableRows: tableRows
    })
  }

  callListChange(event) {
    this.createContactList(this.state.callLists[event.target.value].contacts);
  }

  projectChange(event) {
    console.log(this.state.callListOptions);
    console.log(this.state.projects);
    console.log("PROJECT CHANGE " + event.target.value);

    let tempProject = this.state.projects.find((project) => {
      return event.target.value === project.name;
    });

    let cl = tempProject.callLists;
    let temp = [];

    for(let i = 0; i < cl.length; i++) {
      console.log("NAME: " + cl[i].name);
      temp.push(<option key={i} value={i}>{CallLists.find({_id: cl[i]}).fetch()[0].name}</option>);
    }

    this.setState({
      callListOptions: temp
    });
  }

  render(){
    return (
        <div>

          <select onChange={this.projectChange}>
            {this.state.projectOptions}
          </select>

          <select defaultValue="default" onChange={this.callListChange}>
            <option value="default" disabled>Select call list</option>
            {this.state.callListOptions}
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
              {this.state.tableRows}
            </tbody>
          </table>
          {this.state.showCallWindow ?
            <CallWindow toggle={this.toggleCallWindow}
                        currentCustomer={this.state.currentCustomer}
                        contacts={this.state.currentList}/>
            : null
          }
        </div>
    );
  }
}
export default ContactList;