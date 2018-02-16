import React, { Component } from 'react';
import './styles/MainView.css'

class MainView extends Component {
  render() {
    return (
          <div>
            <div id="profile">
              <p>Username</p>
              <button>Logout</button>
            </div>
            <div id="contacts">
                <p>Contacts</p>
            </div>
          </div>
    ); 
  }
}

export default MainView;