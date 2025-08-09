import React, { useContext } from 'react';
import { TaskContext } from './TaskContext';

const TaskList = () => {
  const { state, dispatch } = useContext(TaskContext);

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "ACTIVE") return !task.completed;
    if (state.filter === "COMPLETED") return task.completed;
    return true; // ALL
  });

  return (
    <div className="container mt-3">
      {/* Header + Actions */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Tasks</h4>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        >
          Clear Completed
        </button>
      </div>

      {/* Task List */}
      <ul className="list-group mb-3">
        {filteredTasks.length === 0 ? (
          <li className="list-group-item text-muted">No tasks found</li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`list-group-item d-flex align-items-center ${
                task.completed ? 'list-group-item-success' : ''
              }`}
            >
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={task.completed}
                onChange={() =>
                  dispatch({ type: "TOGGLE_TASK", payload: task.id })
                }
              />
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.text}
              </span>
            </li>
          ))
        )}
      </ul>

      {/* Footer Summary */}
      <p className="fw-bold">
        {state.tasks.filter((t) => !t.completed).length} tasks left
      </p>
    </div>
  );
};

export default TaskList;
