import React, { useState } from "react";

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (taskText.trim() === "") return;
    setTasks([...tasks, { text: taskText, completed: false }]);
    setTaskText("");
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Task Tracker ✅</h2>

      {/* Add Task */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="btn-group mb-3">
        <button
          className={`btn btn-${filter === "all" ? "dark" : "secondary"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn btn-${filter === "completed" ? "dark" : "secondary"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`btn btn-${filter === "pending" ? "dark" : "secondary"}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      <ul className="list-group">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "black",
                }}
              >
                {task.text}
              </span>
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteTask(index)}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;
