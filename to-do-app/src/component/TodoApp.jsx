import React, { useState } from 'react';
import TodoList from './TodoList';

const TodoApp = () => {
    const [task, setTask] = useState('');
    const [toDo, setToDO] = useState([]);

    const handleAddTask = () => {
        if (task.trim() === '') return;
        setToDO([...toDo, task]);
        setTask('');
    };

    const handleDelete = (index) => {
        const updatedList = toDo.filter((_, i) => i !== index);
        setToDO(updatedList);
    };

    return (
        <div>
            <h1>Todo App</h1>
            <input
                type='text'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
            />
            <button onClick={handleAddTask}>Add</button>

            <TodoList toDo={toDo} onDelete={handleDelete} />
        </div>
    );
};

export default TodoApp;
