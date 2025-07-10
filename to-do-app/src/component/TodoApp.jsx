import React, { useState } from 'react';
import TodoList from './TodoList';

const TodoApp = () => {
    const [task, setTask] = useState('');
    const [toDo, setToDO] = useState([]);
    const [filter, setFilter] = useState('all');

    const handleAddTask = () => {
        if (task.trim() === '') return;

        const newTask = {
            text: task,
            completed: false,
        };
        setToDO([...toDo, newTask]);
        setTask('');
    };

    const handleDelete = (index) => {
        const updatedList = toDo.filter((_, i) => i !== index);
        setToDO(updatedList);
    };
    const handleComplete = (index) => {
        const updateList = [...toDo];
         updateList[index].completed = !updateList[index].completed;
        setToDO(updateList);
    }
    const filteredToDos = toDo.filter((toDo) => {
        if (filter === 'completed') return toDo.completed;
        if (filter === 'incomplete') return !toDo.completed;
        return true;
    })

    return (
        <div className='container'>
            <h1>Todo App</h1>
            <input
                type='text'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
            />
            <button onClick={handleAddTask}>Add</button>

            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>


            <TodoList toDo={filteredToDos} onDelete={handleDelete} onComplete={handleComplete} />
        </div>
    );
};

export default TodoApp;
