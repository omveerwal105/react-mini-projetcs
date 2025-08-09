import { createContext, useReducer } from "react";
import useLocalStorage from "./useLocalStorage";

export const TaskContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }] };
        case 'TOGGLE_TASK':
            return {
                ...state, tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                )
            };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        case 'CLEAR_COMPLETED':
            return { ...state, tasks: state.tasks.filter(task => !task.completed) };

        default:
            return state;
    }
};

export const TaskProvider = ({ children }) => {
    const [persistedState, setPersistedState] = useLocalStorage("taskState", {
        tasks: [],
        filter: "ALL"
    });

    const [state, dispatch] = useReducer((s, a) => {
        const newState = reducer(s, a);
        setPersistedState(newState); // save to localStorage every change
        return newState;
    }, persistedState);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};
