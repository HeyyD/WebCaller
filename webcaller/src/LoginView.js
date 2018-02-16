import React, { Component } from 'react';
import './styles/LoginView.css'

class LoginView extends Component {
  render(){
    return(
      <form>
        <label>Username:</label>
        <input type="text"/>
        <label>Password:</label>
        <input type="text"/>
      </form>
    );
  }
}
export default LoginView;