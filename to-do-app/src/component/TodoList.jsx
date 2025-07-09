import React from 'react';

const TodoList = ({ toDo, onDelete }) => {
  return (
    <div>
      <h1>Todo List</h1>

      {toDo.map((task, index) => (
        <div key={index}>
          <p>{task}</p> 
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
