import React from 'react';

import TodolistItem from '../TodoListItem';
import './TodoList.css';

const TodoList = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {

  const elements = todos.map((item) => {
    return (
      <li className="list-group-item" key={item.id}>
        <TodolistItem 
        onDeleted={() => onDeleted(item.id)} 
        onToggleImportant={() => onToggleImportant(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        {...item}/>
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      {elements}
    </ul>
  );
}

export default TodoList;