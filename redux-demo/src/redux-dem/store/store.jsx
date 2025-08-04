import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../slices/counterSlice';
import themeReducer from '../slices/themeSlice';
import githubReducer from '../slices/githubSlice';
import userReducer from '../slices/userSlice';


const store = configureStore({
    reducer : {
       counter : counterReducer,
       theme : themeReducer,
       github : githubReducer ,
       user : userReducer
    }
});

export default store