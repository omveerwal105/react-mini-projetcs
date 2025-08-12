import React, { useEffect, useState } from "react";

const Task = () => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskPriority, setTaskPriority] = useState("Low");
  const [filterTask, setFilterTask] = useState("All");
  const [editId, setEditId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("task"));
      if (Array.isArray(stored)) {
        setTasks(stored);
      }
    } catch (err) {
      console.error("Error parsing tasks:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("task", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const handleAdd = () => {
    if (!taskInput.trim()) return;

    const newTask = {
      text: taskInput,
      id: Date.now(),
      completed: false,
      priority: taskPriority,
    };

    if (editId !== null) {
      const editTasks = tasks.map((task) =>
        task.id === editId
          ? { ...task, text: taskInput, priority: taskPriority }
          : task
      );
      setEditId(null);
      setTasks(editTasks);
    } else {
      setTasks((prev) => [...prev, newTask]);
    }

    setTaskInput("");
    setTaskPriority("Low");
  };

  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const handleFilter = () => {
    if (!Array.isArray(tasks)) return [];

    if (filterTask === "pending") {
      return tasks.filter((task) => !task.completed);
    }
    if (filterTask === "done") {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  };

  const filtered = handleFilter();

  const handleDelete = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setTaskInput(task.text);
    setTaskPriority(task.priority);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const pendingCount = tasks.filter((task) => !task.completed).length;

  const getPriorityBadge = (priority) => {
    const colors = {
      Low: "success",
      Medium: "warning",
      High: "danger",
    };
    return <span className={`badge bg-${colors[priority]}`}>{priority}</span>;
  };

  return (
    <div className="container p-4">
      <h2 className="text-center mb-4">Task Manager 📝</h2>

      {/* Input Row */}
      <div className="d-flex gap-2">
        <input
          className="form-control"
          placeholder="Enter the task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <select
          className="form-select"
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button className="btn btn-primary" onClick={handleAdd}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="d-flex gap-2 mt-3">
        <button
          className={`btn ${filterTask === "All" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setFilterTask("All")}
        >
          All
        </button>
        <button
          className={`btn ${filterTask === "done" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setFilterTask("done")}
        >
          Done
        </button>
        <button
          className={`btn ${filterTask === "pending" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setFilterTask("pending")}
        >
          Pending ({pendingCount})
        </button>
      </div>

      {/* Task List */}
      <div className="mt-4">
        {filtered.length === 0 ? (
          <p className="text-muted text-center">No tasks found.</p>
        ) : (
          filtered.map((task) => (
            <div
              className={`card mt-2 shadow-sm border-0 ${
                task.completed ? "bg-light" : ""
              }`}
              key={task.id}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div
                  onClick={() => toggleTask(task.id)}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {task.text} &nbsp; {getPriorityBadge(task.priority)}
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Task;
