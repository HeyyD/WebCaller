import React, { Component } from 'react';

class CallWindow extends Component {

  constructor(props) {
    super(props);
    this.call = this.call.bind(this);
    this.hangUp = this.hangUp.bind(this);
    this.changeCustomer = this.changeCustomer.bind(this);
    this.exit = this.exit.bind(this);

    this.state = {
      current: this.props.currentCustomer,
      calling: false,
      button: {
        value: 'Call',
        onClick: this.call
      },
      customer : {
        name: this.props.contacts[this.props.currentCustomer].name,
        company: this.props.contacts[this.props.currentCustomer].company,
        number: this.props.contacts[this.props.currentCustomer].phone
      }
    }
  }

  call() {
    Meteor.call('makeCall', this.state.customer.number);

    this.setState({
      calling: true,
      button: {
        value: 'Hang up',
        onClick: this.hangUp
      }
    });
  }

  hangUp() {
    this.setState({
      calling: false,
      button: {
        value: 'Call',
        onClick: this.call
      }
    });
  }

  changeCustomer(index) {
    this.setState({
      current: index,
      customer: {
        name: this.props.contacts[index].name,
        company: this.props.contacts[index].company,
        number: this.props.contacts[index].phone
      }
    });
  }

  exit(event) {
    if(event.target.className === 'Call-window-outer') {
      if(this.state.calling) {
        alert('You cannot exit call view while calling to the customer');
      } else {
        this.props.toggle();
      }
    }
  }

  render() {
    return(
      <div className="Call-window-outer" onClick={this.exit}>
        <div className="Call-window-inner">
          <h1>Call</h1>
          <h3>{this.state.customer.name}</h3>
          <h3>{this.state.customer.company}</h3>
          <h3>{this.state.customer.number}</h3>
          <div className="Call-window-button-container">
            <input  type="button"
                    value="Previous"
                    onClick={() => this.changeCustomer(this.state.current - 1)}
                    disabled={this.state.current === 0}/>
            <input  type="button" value={this.state.button.value} onClick={this.state.button.onClick}/>
            <input  type="button"
                    value="Next"
                    onClick={() => this.changeCustomer(this.state.current + 1)}
                    disabled={this.state.current === (this.props.contacts.length - 1)}/>
          </div>
        </div>
      </div>
    );
  }
}
export default CallWindow;
