import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset } from './redux/actions/CounterActions';
import { toggleMode } from './redux/actions/ThemeActions';
import { addTodo, deleteTodo, toggleTodo } from './redux/actions/todoActions';

const App = () => {
  const count = useSelector(state => state.counter.count);
  const themeMode = useSelector(state => state.theme.darkMode);
  const { tasks: todos, filter } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const [taskInput, setTaskInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = taskInput.trim();
    if (!trimmed) return;
    dispatch(addTodo(trimmed));
    setTaskInput('');
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === 'COMPLETED') return t.completed;
    if (filter === "ACTIVE") return !t.completed;
    return true;

  });


  const appStyle = {
    backgroundColor: themeMode ? '#333' : '#fff',
    color: themeMode ? '#fff' : '#333',
    textAlign: 'center',
    height: '100vh',
    paddingTop: '100px',
  }
  return (
    <div style={appStyle}>
      
      <button onClick={() => dispatch(toggleMode())} className='btn btn-primary d-flex justify-content-left'>
        Switch to {themeMode ? 'light' : 'dark'} Mode
      </button>
      <h1>Redux Counter</h1>
      <h2>{count}</h2>

      <button className='btn btn-sm btn-outline-primary me-1' onClick={() => dispatch(increment())}>++</button>
      <button className='btn btn-sm btn-outline-danger me-1' onClick={() => dispatch(decrement())}>--</button>
      <button className='btn btn-sm btn-outline-success me-1' onClick={() => dispatch(reset())}>Reset</button>

      <br></br>
      

      <br></br>
      <div className='container mt -2 '>
        <input className='form-control' placeholder='add a task' value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />

        <button className='btn btn-primary mt-4' onClick={handleAdd}>Add Task</button>

        <div className='mt-4 '>
          <button className='btn btn-sm btn-outline-secondary me-1'
            onClick={() => dispatch({ type: 'SET_FILTER', payload: 'ALL' })} disabled={filter === 'ALL'}>ALL</button>

          <button
            onClick={() => dispatch({ type: 'SET_FILTER', payload: 'ACTIVE' })} className='btn btn-sm btn-outline-secondary me-1' disabled={filter === 'ACTIVE'}>
            Active
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_FILTER', payload: 'COMPLETED' })}
            className='btn btn-sm btn-outline-secondary me-1' disabled={filter === 'COMPLETED'}>
            Completed
          </button>
        </div>

        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="d-flex justify-content-between align-items-center border p-2 my-1"
            style={{ cursor: 'pointer' }}
          >
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </div>

        ))}
      </div>

    

    </div>
  )
}

export default App