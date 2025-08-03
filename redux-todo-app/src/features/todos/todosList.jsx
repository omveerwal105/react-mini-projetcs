import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, toggleTodo } from './todosSlice';

const todosList = () => {

    const [task,setTask] = useState('');

    const todo = useSelector((state)=>state.todos);
    const dispatch = useDispatch();

    const handleAdd = () => {

        const trimmedTask = task.trim();
        if(!trimmedTask) return;

        dispatch(addTodo(trimmedTask));

        setTask('');
    }

   

  return (
    <div className='container'>
        <h2 className='text-center'>Todo List</h2>

        <input className='form-control w-25 mx-auto'
        placeholder='enter the task'
        value={task}
        onChange={(e)=>setTask(e.target.value)}
        />

        <button className='btn btn-primary mx-2' onClick={handleAdd}  >Add</button>

        {todo.map((task)=>(
            <div className='card mx-auto' key={task.id} onClick={()=>dispatch(toggleTodo(task.id))}
            style={{
                textDecoration : task.completed ? 'line-through' : 'none',
                cursor : 'pointer'
            }}
            >{task}
            <button className='btn btn-danger me-1' onClick={()=>dispatch(deleteTodo(task.id))}>
                Delete
            </button>
            </div>
        ))}


    </div>
  )
}

export default todosList