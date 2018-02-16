import React, { Component } from 'react';
import './styles/MainView.css'
import Contacts from './Contacts';

class MainView extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
          <div>
            <div id="profile">
              <p>Username</p>
              <button onClick={this.props.onClick}>Logout</button>
            </div>
            <div id="contacts">
                <p>Contacts</p>
                <Contacts/>
            </div>
          </div>
    ); 
  }
}

export default MainView;