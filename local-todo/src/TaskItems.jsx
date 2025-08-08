import React, { useEffect, useState } from 'react'
import TaskList from './TaskList';

const TaskItems = () => {
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState('');
    const [editId, setEditId] = useState(null)
    const [filter, setFilter] = useState('ALL');

      useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('task'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(tasks))
    }, [tasks]);

  


    const handleAdd = () => {
        if (!taskName.trim()) return;

        const newTask = {
            id: Date.now(),
            completed: false,
            name: taskName
        }

        setTasks((prev) => (
            [...prev, newTask]
        ))
        setTaskName('');
    }

    const handleDelete = (id) => {
        const update = tasks.filter((task) => task.id !== id);
        setTasks(update);
    }

    const toggleTask = (id) => {
        const update = tasks.map((task) => task.id === id ?
            { ...task, completed: !task.completed } : task
        );
        setTasks(update);
    }

    const getFilteredTasks = () => {
        if (filter === 'Active') {
            return tasks.filter((task) => !task.completed);
        } else if (filter === 'Completed') {
            return tasks.filter((task) => task.completed);
        }
        return tasks;
    };

    const handleEdit = (task) => {
        setEdit(task.name);
        setEditId(task.id)
    }

    const handleUpdate = () => {
        const updateTask = tasks.map((task) => task.id === editId ?
            { ...task, name: edit } : task
        );

        setTasks(updateTask);
        setEdit('');
        setEditId(null);

    }

    const handleCancelEdit = () => {
        setEdit('');
        setEditId(null);
    };




    return (
        <div className='container p-4'>
            <input className='form-control w-75'
                placeholder='enter the taks'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <button className='btn btn-primary' onClick={handleAdd}>Add</button>

            <button className='btn btn-outline-secondary' onClick={() => setFilter('ALL')}>All</button>
            <button className='btn btn-outline-secondary' onClick={() => setFilter('Active')}>Active</button>
            <button className='btn btn-outline-secondary' onClick={() => setFilter('Completed')}>Completed</button>

            {getFilteredTasks().map((task) => (
                <div className='card mx-auto mt-2 w-75' key={task.id}>
                    {editId === task.id ? (
                        <div className='card-header'>
                            <input
                                className='form-control'
                                value={edit}
                                onChange={(e) => setEdit(e.target.value)}
                            />
                            <button className='btn btn-success' onClick={handleUpdate}>Update</button>
                            <button className='btn btn-secondary mt-2 ms-2' onClick={handleCancelEdit}>
                                Cancel
                            </button>

                        </div>
                    ) : (
                        <TaskList task={task} onDelete={handleDelete} onToggle={toggleTask} onEdit={handleEdit} />
                    )}

                </div>
            ))}
        </div>
    )
}

export default TaskItems