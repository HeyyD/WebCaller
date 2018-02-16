import React, { Component } from 'react';
import LoginView from './LoginView';
import MainView from './MainView';

class App extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {"loggedIn": false};
  }

  login(event){
    event.preventDefault();
    this.setState({"loggedIn": !this.state.loggedIn});
  }

  render() {
    if(this.state.loggedIn)
      return <MainView onClick={this.login}/>
    else
      return <LoginView onClick={this.login}/>
  }
}

export default App;
