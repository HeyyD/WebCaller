import React, { Component } from 'react';

class CallWindow extends Component {

  constructor(props) {
    super(props);
    this.call = this.call.bind(this);
    this.hangUp = this.hangUp.bind(this);
    this.changeCustomer = this.changeCustomer.bind(this);

    this.state = {
      current: this.props.currentCustomer,
      customer : {
        name: this.props.contacts[this.props.currentCustomer].name,
        company: this.props.contacts[this.props.currentCustomer].company
      }
    }
  }

  call() {

  }

  hangUp() {

  }

  changeCustomer(index) {

  }

  render() {
    return(
      <div className="Call-window-outer">
        <div className="Call-window-inner">
          <h1>Call</h1>
          <h3>{this.state.customer.name}</h3>
          <h3>{this.state.customer.company}</h3>
          <div className="Call-window-button-container">
            <input type="button" value="Previous"/>
            <input type="button" value="Call"/>
            <input type="button" value="Next"/>
          </div>
        </div>
      </div>
    );
  }
}
export default CallWindow;
