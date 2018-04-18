import React, { Component } from 'react';

class CallWindow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="Call-window-outer">
        <div className="Call-window-inner">
          <h1>Call</h1>
          <h3>{this.props.customer.name}</h3>
          <h3>{this.props.customer.company}</h3>
          <button onClick={this.props.onClick}>Hang up</button>
        </div>
      </div>
    );
  }
}
export default CallWindow;
