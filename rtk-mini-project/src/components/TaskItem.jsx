import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../redux/taskSlice';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className='card my-2'>
      <div className='card-body d-flex justify-content-between align-items-center'>
        <span
          onClick={() => dispatch(toggleTask(task.id))}
          style={{
            cursor: 'pointer',
            textDecoration: task.completed ? 'line-through' : 'none',
            flexGrow: 1
          }}
        >
          {task.text}
        </span>
        <button
          className='btn btn-danger btn-sm ms-3'
          onClick={() => dispatch(deleteTask(task.id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
