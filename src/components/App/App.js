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
      ]
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

    const changeProperty = function (arr, id, propName) {
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
          todoData: changeProperty(todoData, id, 'important'),
        }
      });
    }

    this.onToggleDone = id => {
      this.setState(({todoData}) => {
        return {
          todoData: changeProperty(todoData, id, 'done'),
        }
      });
    }
  }
  render() {
    const {todoData} = this.state;
    const doneCount = todoData.filter(e => e.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="container">
        <AppHeader todo={todoCount} done={doneCount}/>
        <div className="d-flex">
          <SearchPanel/>
          <ItemStatusFilter/>
        </div>
        <TodoList 
        onDeleted={this.deleteItem}
        onToggleDone={this.onToggleDone}
        onToggleImportant={this.onToggleImportant}
        todos={todoData}/>
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
  
    );
  }
}