import React, { useEffect, useReducer, useState } from 'react';


const initialState = {
    tasks: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            const { task, priority } = action.payload;
            const getTimeByPriority = (p) => {
                switch (p) {
                    case 'HIGH': return 180;
                    case 'MEDIUM': return 300;
                    case 'LOW':
                    default: return 420;
                }
            };
            const newTask = {
                text: task,
                id: Date.now(),
                priority,
                timeLeft: getTimeByPriority(priority),
                status: 'active'
            };
            return {
                ...state,
                tasks: [...state.tasks, newTask]
            };
        }

        case 'TICK': {
            const updatedTasks = state.tasks
                .map((t) => {
                    if (t.timeLeft > 0) {
                        return { ...t, timeLeft: t.timeLeft - 1 };
                    } else if (t.timeLeft === 0 && t.status === 'active') {
                        return { ...t, status: 'blinking', blinkStart: Date.now() };
                    } else if (t.status === 'blinking' && Date.now() - t.blinkStart > 5000) {
                        return { ...t, status: 'expired' };
                    }
                    return t;
                })
                .filter((t) => t.status !== 'expired');

            updatedTasks.sort((a, b) => a.timeLeft - b.timeLeft);

            return { ...state, tasks: updatedTasks };
        }

        default:
            return state;
    }
};

const Task = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('LOW');

    const handleAdd = () => {
        if (!taskName.trim()) return;
        dispatch({
            type: 'ADD',
            payload: { task: taskName, priority }
        });
        setTaskName('');
        setPriority('LOW');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: 'TICK' });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mt-4 task-container">
            <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
                <input
                    className="form-control flex-grow-1"
                    placeholder="Enter task..."
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>

                <button
                    className="btn btn-success"
                    onClick={handleAdd}
                    disabled={!taskName.trim()}
                >
                    Add Task
                </button>
            </div>

            {state.tasks.map((task) => (
                <div
                    key={task.id}
                    className={`card p-3 mb-2 shadow-sm 
                        ${task.status === 'blinking' ? 'blink bg-warning' : ''}
                        ${task.status === 'expired' ? 'd-none' : ''}`}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">{task.text}</h5>
                            <span className={`badge me-2 
                                ${task.priority === 'HIGH' ? 'bg-danger' :
                                task.priority === 'MEDIUM' ? 'bg-primary' :
                                    'bg-secondary'}`}>
                                {task.priority}
                            </span>
                        </div>
                        <div className="text-end">
                            <span className="text-muted small">
                                Time Left: <strong>{task.timeLeft}s</strong>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Task;
