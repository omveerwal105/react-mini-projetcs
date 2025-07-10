import React from 'react';

const TodoList = ({ toDo, onDelete, onComplete }) => {
  return (
    <div className='container'>
      <h1>Todo List</h1>

      {toDo.map((task, index) => (
        <div key={index}>
          <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
          </p>
          <button onClick={() => onDelete(index)}>Delete</button>
          <button onClick={() => onComplete(index)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>

        </div>
      ))}
    </div>
  );
};

export default TodoList;
