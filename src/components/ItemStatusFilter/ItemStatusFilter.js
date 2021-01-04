import React, {Component} from 'react';

import './ItemStatusFilter.css';

export default class ItemStatusFilter extends Component {
  constructor() {
    super();

    this.state = {
      sorts: [
        'all',
        'active', 
        'done',
      ],
    }

    this.onClickFilter = value => {
      this.props.onFilterByValue(value);
      this.state.sortActive = value;
    }
  }
  render() {
    const {filterActive} = this.props;
    const btns = this.state.sorts.map(item => {
      const btnText = item[0].toUpperCase() + item.slice(1);
      let classNames = `btn ${item === filterActive ? ' btn-info' : ' btn-outline-secondary'}`;

      return <button 
              onClick={() => this.onClickFilter(item)} 
              type="button"
              key={item}
              className={classNames}>
              {btnText}</button>;
    });

    return (
      <div className="btn-group item-status-filter">
        {btns}
      </div>
    );
  }
}