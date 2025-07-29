import React, { useReducer } from 'react'


const reducerInput = (inputState , action) => {
    switch (action.type){
        case 'INPUT_' :
        return {inputValue : action.payload}

        case 'RESET_INPUT':
            return {inputValue : ''}

         default : 
        return inputState;
    }
}

const reducerTask = (taskState , action) => {
    switch (action.type){
        case 'ADD_TODO' : 
        const newTask = {text : action.payload , id : Date.now() , taskCompleted : false}
        return {tasks : [...taskState.tasks ,newTask]}

        case 'DELETE_TODO' : 
        return {
            ...taskState , 
            tasks : taskState.tasks.filter((task)=>task.id !==action.payload)
        }

        case 'TOGGLE_TASK' : 
        return {
            ...taskState ,
            tasks : taskState.tasks.map((task)=>(
                task.id === action.payload ? {...task , taskCompleted : !task.taskCompleted} : task
            ))
        }

        default : 
        return taskState ;
    }
}
const ToDoWithUseReducer = () => {
    const [inputState , dispatchInput] = useReducer(reducerInput , {inputValue : ''});

    const [taskState , dispatchTask] = useReducer(reducerTask , {tasks : []});

    const handleChange = (e) => {
        dispatchInput({
            type : 'INPUT_' ,
            payload : e.target.value
        })
    }

    const handleAdd = () => {
        if(inputState.inputValue.trim()===''){
            alert ('enter the task') ; return ;
        }

        dispatchTask({
            type : 'ADD_TODO',
            payload : inputState.inputValue
        })

        dispatchInput({type : 'RESET_INPUT'})
    }

    const handleDelete = (id) => {
        dispatchTask({
            type : 'DELETE_TODO',
            payload : id
        })
    }
    const handleToggle = (id) => {
        dispatchTask({
            type : 'TOGGLE_TASK',
            payload : id
        })
    }
  return (
    <div className='container p-4'>
        <div >
        <input 
        className='form-control mt-3'
        placeholder='enter the task'
        value={inputState.inputValue}
        onChange={handleChange}
        />
        <button className='btn btn-primary' onClick={handleAdd}>Add</button>
        </div>

        {taskState.tasks.length === 0 && <p className="mt-3">No tasks yet. Add one above!</p>}


        {taskState.tasks.map((task)=>(
            <div className='card p-2 mt-2' key={task.id}>
                <div onClick={()=>handleToggle(task.id)}
                style={{
                 textDecoration: task.taskCompleted ? 'line-through' : 'none',

                   cursor : 'pointer'
                }}
                >
                    {task.text}
                </div>
            

                <button className='btn btn-danger'onClick={()=>handleDelete(task.id)}>Delete</button>
            </div>
        ))}
    </div>
  )
}

export default ToDoWithUseReducer