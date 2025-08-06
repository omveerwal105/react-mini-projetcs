import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice'
import themeReducer from './themeSlice'
import taskReducer from './taskSlice'

const store = configureStore({
    reducer : {
        counter : counterReducer ,
        theme : themeReducer,
        todos : taskReducer
    }
})

export default store;