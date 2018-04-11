import React, { Component } from 'react';

class DropdownMultiSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      unselected: []
    }
  }

  componentWillMount() {
    for(let o of this.props.options) {
      this.state.unselected.push(<option>{o}</option>);
    }
  }

  render() {
    return(
      <label>
        {this.props.title}
        <div>
          <select>
            {this.state.unselected}
          </select>
        </div>
      </label>
    );
  }
}
export default DropdownMultiSelect;