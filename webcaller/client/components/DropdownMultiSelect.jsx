import React, { Component } from 'react';

class DropdownMultiSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selects: []
    }
  }

  componentWillMount() {
    for(let o of this.props.options) {
      this.state.selects.push(<option>{o}</option>);
    }
  }

  render() {
    return(
      <label>
        {this.props.title}
        <select>
          {this.state.selects}
        </select>
      </label>
    );
  }
}
export default DropdownMultiSelect;