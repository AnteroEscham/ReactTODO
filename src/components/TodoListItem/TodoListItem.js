import React from 'react';
import './TodoListItem.css';

const TodoListItem = (props) => {
  const {label, important, done, onDeleted, onToggleImportant, onToggleDone} = props;
  let classNames = 'todo-list-item';
  
  if (done) {
    classNames += ' done';
  }

  if (important) {
    classNames += ' important';
  }

  return (
    <span className={classNames}>
      <span onClick={onToggleDone} className="todo-list-item-label">{label}</span>
      <button onClick={onToggleImportant} type="button" className="btn btn-outline-success btn-small">
        <i className="fa fa-exclamation"></i>
      </button>
      <button onClick={onDeleted} type="button" className="btn btn-outline-danger btn-small">
        <i className="fa fa-trash-o"></i>
      </button>
    </span>
  )
}

export default TodoListItem;