import React, {Component} from 'react';

import './SearchPanel.css';

export default class SearchPanel extends Component {
  constructor() {
    super();

    this.state = {
      label: '',
    }

    this.onLabelChange = event => {
      console.log(event.target.value, 'value')
      event.preventDefault();
      this.props.onSearchByValue(event.target.value);
      this.setState({
        label: event.target.value,
      });
    }
  }
  render() {
    return (
      <input 
        className="search-panel form-control" 
        type="text" 
        placeholder="Search"
        onChange={this.onLabelChange}
        value={this.state.label}/>
    );
  }
}