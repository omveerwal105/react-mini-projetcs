import React, { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'SET_INPUT':
            return {
                ...state,
                inputValue: action.payload
            };
        default:
            return state;
    }
}

function taskReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { id: Date.now(), title: action.payload, completed: false }];

        case 'DELETE_TODO':
            return state.filter((task) => task.id !== action.payload);

        case 'TOGGLE_TODO':
            return state.map((task) =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );
        default:
            return state;
    }
}

const ToDoWithUseReducer = () => {
    const [state, dispatch] = useReducer(reducer, { inputValue: '' });
    const [taskState, dispatchTask] = useReducer(taskReducer, []);

    const addTask = () => {
        if (state.inputValue.trim() === '') return;
        dispatchTask({
            type: 'ADD_TODO',
            payload: state.inputValue
        });
        dispatch({
            type: 'SET_INPUT',
            payload: ''
        });
    };

    const deleteTask = (index) => {
        dispatchTask({
            type: 'DELETE_TODO',
            payload: index
        });
    };

    const toggleTask = (index) => {
        dispatchTask({
            type: 'TOGGLE_TODO',
            payload: index
        });
    };

    const handleChange = (e) => {
        dispatch({
            type: 'SET_INPUT',
            payload: e.target.value
        });
    };

    return (
        <div className='container mt-3'>
            <div className="d-flex gap-2">
                <input
                    className="form-control"
                    placeholder="Enter a task"
                    value={state.inputValue}
                    onChange={handleChange}
                />
                <button className="btn btn-primary" onClick={addTask}>
                    Add
                </button>
            </div>

            <ul className='list-group mt-4'>
                {taskState.map((task) => (
                    <li
                        key={task.id}
                        className={`list-group-item d-flex justify-content-between ${task.completed ? 'text-decoration-line-through' : ''
                            }`}
                    >
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleTask(task.id)}
                        >
                            {task.title}
                        </span>

                        <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoWithUseReducer;
