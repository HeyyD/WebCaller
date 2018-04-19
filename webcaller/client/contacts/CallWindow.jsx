import React, { Component } from 'react';

class CallWindow extends Component {

  constructor(props) {
    super(props);
    this.call = this.call.bind(this);
    this.hangUp = this.hangUp.bind(this);
    this.changeCustomer = this.changeCustomer.bind(this);
  }

  call() {

  }

  hangUp() {

  }

  changeCustomer() {

  }

  render() {
    return(
      <div className="Call-window-outer">
        <div className="Call-window-inner">
          <h1>Call</h1>
          <h3>{this.props.customer.name}</h3>
          <h3>{this.props.customer.company}</h3>
          <div className="Call-window-button-container">
            <button>Previous</button>
            <button onClick={this.props.onClick}>Hang up</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    );
  }
}
export default CallWindow;
