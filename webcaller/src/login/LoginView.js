import React, { Component } from 'react';
import './LoginView.css'

class LoginView extends Component {

  render(){
    return(
      <form>
        <div>
          <label>Username:</label>
          <input type="text"/>
          <label>Password:</label>
          <input type="text"/>
          <button onClick={this.props.onClick}>Login</button>
        </div>
      </form>
    );
  }
}
export default LoginView;