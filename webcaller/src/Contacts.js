import React, { Component } from 'react';

class Contacts extends Component {
  render() {
    //TODO: Contact class
    return (
      <table>
        <tr>
          <th>Phone</th>
          <th>Name</th>
          <th>Company</th>
        </tr>
        <tr>
          <td>+35840666666</td>
          <td>Banaani Tom</td>
          <td>PornHub</td>
          <td><button>Call</button></td>
        </tr>
      </table>
    );
  }
}
export default Contacts;