import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo } from './todosSlice';
import { toggleTheme } from '../theme/themeSlice';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const todos = useSelector((state) => state.todos);
  const theme = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();

  const parseTags = (raw) =>
    raw
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);

  const handleAdd = () => {
    const trimmed = task.trim();
    if (!trimmed) return;
    const tags = parseTags(tagsInput);
    dispatch(addTodo({ text: trimmed, tags }));
    setTask('');
    setTagsInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const allTags = useMemo(() => {
    const set = new Set();
    todos.forEach((t) => {
      (t.tags || []).forEach((tag) => set.add(tag));
    });
    return Array.from(set);
  }, [todos]);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return todos;
    return todos.filter((t) =>
      activeFilters.every((tag) => (t.tags || []).includes(tag))
    );
  }, [todos, activeFilters]);

  const toggleFilter = (tag) => {
    setActiveFilters((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  return (
    <div
      className={`container-fluid min-vh-100 py-4 ${
        theme ? 'bg-dark text-light' : 'bg-light text-dark'
      }`}
    >
      {/* Theme toggle */}
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-secondary mb-3"
          onClick={() => dispatch(toggleTheme())}
        >
          Switch to {theme ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      <h2 className="text-center fw-bold mb-4">Todo List</h2>

      {/* Add Todo */}
      <div className="d-flex justify-content-center mb-4 gap-2 flex-wrap">
        <input
          className="form-control"
          style={{ maxWidth: '300px' }}
          placeholder="Enter the task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="form-control"
          style={{ maxWidth: '300px' }}
          placeholder="Tags (comma separated)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-primary px-4"
          onClick={handleAdd}
          disabled={!task.trim()}
        >
          Add
        </button>
      </div>

      {/* Filter Bar */}
      <div
        className={`mb-4 p-3 rounded ${
          theme ? 'bg-secondary bg-opacity-25' : 'bg-light border'
        }`}
      >
        <div className="mb-2 fw-semibold">Filter by tag:</div>
        <div className="d-flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`btn btn-sm ${
                activeFilters.includes(tag)
                  ? 'btn-primary'
                  : 'btn-outline-primary'
              }`}
              onClick={() => toggleFilter(tag)}
            >
              {tag}
            </button>
          ))}
          {activeFilters.length > 0 && (
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Todo List */}
      <div className="d-flex flex-column align-items-center">
        {filtered.map((t) => (
          <div
            className={`card mb-3 w-100 shadow-sm ${
              theme ? 'bg-dark text-light border-light' : ''
            }`}
            style={{ maxWidth: '600px' }}
            key={t.id}
            onClick={() => dispatch(toggleTodo(t.id))}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5
                  className="card-title mb-1"
                  style={{
                    textDecoration: t.completed ? 'line-through' : 'none',
                  }}
                >
                  {t.text}
                </h5>
                {t.tags && t.tags.length > 0 && (
                  <div className="mt-1">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`badge me-2 ${
                          theme ? 'bg-light text-dark' : 'bg-secondary'
                        }`}
                        style={{ fontSize: '0.8rem' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteTodo(t.id));
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-muted mt-4">
          No todos match the current filter.
        </div>
      )}
    </div>
  );
};

export default TodoList;
