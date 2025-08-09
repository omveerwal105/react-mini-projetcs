import React, { useContext, useState } from 'react'
import { TaskContext } from './TaskContext';

const Task = () => {

    const { dispatch } = useContext(TaskContext);

    const [taskName , setTaskName] = useState('');

  


    const handleAdd = () => {
        if(!taskName.trim()) return ;

        dispatch({
            type : 'ADD',
            payload : taskName
        })
         setTaskName('');
    }
 



  return (
    <div className='container mt-2'>
        <div className='d-flex justify-content-center  '>
        <input className='form-control w-50'
        placeholder='enter the name...'
        value={taskName}
        onChange={(e)=>setTaskName(e.target.value)}
        />

        <button className='btn btn-primary mx-2' onClick={handleAdd} >Add</button>
        </div>



    </div>
  )
}

export default Task