import React, { Component } from 'react';

class CallWindow extends Component {

  constructor(props) {
    super(props);
  }

  call() {
    
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
