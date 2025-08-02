import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../slices/counterSlice';
import themeReducer from '../slices/themeSlice';
import githubReducer from '../slices/githubSlice';


const store = configureStore({
    reducer : {
       counter : counterReducer,
       theme : themeReducer,
       github : githubReducer 
    }
});

export default store