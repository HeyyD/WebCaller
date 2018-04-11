import React, { Component } from 'react';

class DropdownMultiSelect extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <label>
        {this.props.title}
        <select>
        </select>
      </label>
    );
  }
}
export default DropdownMultiSelect;