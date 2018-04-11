import React, { Component } from 'react';

class DropdownMultiSelect extends Component {

  constructor(props) {
    super(props);
    this.itemSelected = this.itemSelected.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
    this.deselectItem = this.deselectItem.bind(this);

    this.state = {
      selected: [],
      unselected: [],
      options: [],
      tags: []
    }
  }

  componentWillMount() {
    for(let o of this.props.options) {
      this.state.unselected.push(o);
    }
    this.updateMenu(this.state.unselected);
  }

  updateMenu(array) {
    let temp = [];
    for(let o of array) {
      temp.push(<option>{o}</option>);
    }

    this.setState({
      options: temp
    });
  }

  itemSelected(event) {

    this.state.selected.push(event.target.value);

    let index = this.state.unselected.indexOf(event.target.value);
    this.state.unselected.splice(index, 1);

    event.target.value = "default";

    this.updateMenu(this.state.unselected);
    this.updateTags(this.state.selected);
  }

  updateTags(array) {
    let temp = [];
    for(o of array) {
      temp.push(<button value={o} onClick={this.deselectItem}>{o}</button>);
    }

    this.setState({
      tags: temp
    })
  }

  deselectItem(event) {
    event.preventDefault();

    this.state.unselected.push(event.target.value);

    let index = this.state.selected.indexOf(event.target.value);
    this.state.selected.splice(index, 1);

    this.updateMenu(this.state.unselected);
    this.updateTags(this.state.selected);
  }

  render() {
    return(
      <label>
        <h4>{this.props.title}</h4>
        <div>
          {this.state.tags}
        </div>
        <div>
          <select onChange={this.itemSelected}>
            <option disabled selected value="default"> -- select an option -- </option>
            {this.state.options}
          </select>
        </div>
      </label>
    );
  }
}
export default DropdownMultiSelect;