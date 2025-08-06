import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import TaskList from './TaskList';

const TaskInput = () => {
  const [inputTask, setInputTask] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!inputTask.trim()) return;
    dispatch(addTask(inputTask.trim()));
    setInputTask('');
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className='container p-4'>
      <h2 className='text-center text-primary'>Task Manager</h2>
      <div className='d-flex justify-content-center align-items-center gap-2'>
        <input
          className='form-control w-25'
          placeholder='Enter the task'
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className='btn btn-primary' onClick={handleAdd}>
          Add
        </button>
      </div>
      <TaskList />
    </div>
  );
};

export default TaskInput;
