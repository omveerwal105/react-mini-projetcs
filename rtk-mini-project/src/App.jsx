import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Decrement, Increment, Reset } from './redux/counterSlice';
import { toggleTheme } from './redux/themeSlice';
import TaskInput from './components/TaskInput';

const App = () => {

  const count = useSelector((state) => state.counter.count);
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  return (

    <div className={`container p-4 ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <button className='btn btn-secondary mx-2' onClick={() => dispatch(toggleTheme())}>
        Switch to {isDark ? 'light' : 'dark'} Mode
      </button>
      <TaskInput />

    </div>
  )
}

export default App