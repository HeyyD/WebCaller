import React, { Component } from 'react';

class CallWindow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="Call-window-outer">
        <div className="Call-window-inner">
          <h1>Call window</h1>
          <button onClick={this.props.onClick}>Hang up</button>
        </div>
      </div>
    );
  }
}
export default CallWindow;
