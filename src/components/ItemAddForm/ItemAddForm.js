import React, {Component} from 'react';

import './ItemAddForm.css';

export default class ItemAddForm extends Component {
  constructor() {
    super();

    this.state = {
      label: '',
    }

    this.onLabelChange = event => {
      this.setState({
        label: event.target.value.toUpperCase(),
      });
    }

    this.onSubmit = event => {
      event.preventDefault();
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: '',
      });
    }
  }

  render() {
    return (
      <form 
        onSubmit={this.onSubmit} 
        className="item-add-form">
        <input
          className="form-control" 
          type="text"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}/>
        <button className="btn btn-outline-secondary">
          Add Item
        </button>
      </form>
    );
  }
}