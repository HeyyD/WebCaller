import React, { Component } from 'react';

class CallWindow extends Component {
  render() {
    return(
      <div className="Call-window-outer">
        <div className="Call-window-inner">
          <h1>Call window</h1>
          <button>Hang up</button>
        </div>
      </div>
    );
  }
}
export default CallWindow;
