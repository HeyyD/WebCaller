import React, { Component } from 'react';
import './styles/LoginView.css'

class LoginView extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(event) {
    event.preventDefault();
  }

  render(){
    return(
      <form>
        <div>
          <label>Username:</label>
          <input type="text"/>
          <label>Password:</label>
          <input type="text"/>
          <button onClick={this.login}>Login</button>
        </div>
      </form>
    );
  }
}
export default LoginView;