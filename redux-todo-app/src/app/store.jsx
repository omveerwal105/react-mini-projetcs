import { configureStore } from "@reduxjs/toolkit";
import todosReducer from '../features/todos/todosSlice';
import modalReducer from '../features/modal/modalSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
    reducer : {
        todos : todosReducer,
        modal : modalReducer,
        theme : themeReducer
    }
})