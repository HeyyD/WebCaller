import React, { Component } from 'react';

class LoginView extends Component {
  render(){
    return(
      <form>
        Username: <input type="text"/>
        Password: <input type="text"/>
      </form>
    );
  }
}
export default LoginView;