import React, {Component} from 'react';

import AppHeader from '../AppHeader';
import ItemStatusFilter from '../ItemStatusFilter';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemAddForm from '../ItemAddForm';

export default class App extends Component {
  constructor() {
    super();

    this.maxId = 0;

    const createTodoItem = label => {
      return {
        id: this.maxId++,
        label,
        important: false,
        done: false,
      }
    }
    
    this.state = {
      todoData: [
        createTodoItem('Drink Coffee'),
        createTodoItem('Create React App'),
        createTodoItem('Funny!'),
      ],
      term: '',
      filterProp: 'all',
    };

    this.createTodoItem = createTodoItem;

    this.deleteItem = id => {
      this.setState(({todoData}) => {
        const newArray = todoData.filter(e => e.id !== id);

        return {
          todoData: newArray,
        }
      });
    }

    this.addItem = text => {
      this.setState(({todoData}) => {
        const newItem = this.createTodoItem(text);
        const newArray = [...todoData, newItem];

        return {
          todoData: newArray,
        }
      });
    }

    const toggleProperty = function (arr, id, propName) {
      const index = arr.findIndex(e => e.id === id);
      const oldItem = arr[index];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      const newArray = [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index + 1),
      ];

      return newArray;
    }

    this.onToggleImportant = id => {
      this.setState(({todoData}) => {
        return {
          todoData: toggleProperty(todoData, id, 'important'),
        }
      });
    }

    this.onToggleDone = id => {
      this.setState(({todoData}) => {
        return {
          todoData: toggleProperty(todoData, id, 'done'),
        }
      });
    }

    this.searchByValue = term => {
      this.setState({term});
    }

    this.search = (items, term) => {
      if (!term.length) return items;
      
      return items.filter(
        e => e.label.toLowerCase().indexOf(term.toLowerCase()) !== -1
      );
    }

    this.filterByProp = (items, filterProp) => {
      switch (filterProp) {
        case 'all':
          return items;
        case 'active': 
          return items.filter(e => !e.done);
        case 'done':
          return items.filter(e => e.done);
        default:
          return items;
      }
    }

    this.filterByValue = filterProp => {
      this.setState({filterProp});
    }
  }
  render() {
    const {todoData, term, filterProp} = this.state;
    let visibleTodos = this.filterByProp(this.search(todoData, term), filterProp);
    const doneCount = todoData.filter(e => e.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="container">
        <AppHeader todo={todoCount} done={doneCount}/>
        <div className="d-flex">
          <SearchPanel onSearchByValue={this.searchByValue}/>
          <ItemStatusFilter onFilterByValue={this.filterByValue} filterActive={filterProp}/>
        </div>
        <TodoList 
        onDeleted={this.deleteItem}
        onToggleDone={this.onToggleDone}
        onToggleImportant={this.onToggleImportant}
        todos={visibleTodos}/>
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
  
    );
  }
}