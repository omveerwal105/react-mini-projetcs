import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Child from './Child';

const Parent = () => {
    const [taskList, setTaskList] = useState([]);
    const [addTask, setAddTask] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [debounce, setDebounce] = useState('');

    const handleAdd = useCallback(() => {

        if (addTask.trim() === '') return;

        setTaskList((prev) => [...prev, addTask])

        setAddTask('');
    }, [addTask, taskList]);

    const handleDelete = useCallback((index) => {
        setTaskList((prev)=>prev.filter((_,id)=>id!==index));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(searchTerm);
        }, 500);
    return () => {
        clearTimeout(timer);
    }

}, [searchTerm]);

const filtered = useMemo(() => {
    const search = debounce.toLowerCase();
    return taskList.filter((task) => {

        return task.toLowerCase().includes(search);
    })
}, [debounce, taskList])




return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
        <input
            type='text'
            value={addTask}
            onChange={(e) => setAddTask(e.target.value)}
        />

        <input
            type='text'
            placeholder='search the list..'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

        <Child onAdd={handleAdd} filtered={filtered} onDelete={handleDelete} />
    </div>
)
}

export default Parent