import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';


const TaskList = () => {
    const tasks = useSelector((state) => state.todos.tasks);
    const [filter, setFilter] = useState('All');

    const filteredTask = () => {
        if (filter === 'Active') {
            return tasks.filter((task) => !task.completed)
        }
        if (filter === 'Completed') {
            return tasks.filter((task) => task.completed)
        }
        else {
            return tasks;
        }
    };

    const filtered = filteredTask();




    return (
        <div className='d-flex flex-column mt-4 align-items-center'>
            <h4>Task Items:</h4>

            <div className='mb-3'>
                <button className='btn btn-outline-primary mx-1' onClick={() => setFilter('All')}>All</button>
                <button className={`btn mx-1 ${filter === 'Active' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilter('Active')}>Active</button>
                <button className='btn btn-outline-primary mx-1' onClick={() => setFilter('Completed')}>Completed</button>
            </div>

            <div className='w-75'>
                {filtered.length === 0 ? (
                    <p className="text-muted text-center">No tasks found.</p>
                ) : (
                    filtered.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))
                )}

            </div>
        </div>
    );
};

export default TaskList;
