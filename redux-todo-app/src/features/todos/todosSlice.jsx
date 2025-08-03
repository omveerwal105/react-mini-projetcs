import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const todosSlice = createSlice({
    name : 'todos',
    initialState ,
    reducers: {

        addTodo : (state,action) => {
            const {text , tags = [] } = action.payload
            const newTask = {text, id:Date.now() , completed:false , tags };
            state.push(newTask);
        },

        toggleTodo : (state,action) => {
            const todo = state.find((todo)=>todo.id===action.payload);
            if(todo){
                todo.completed = !todo.completed
            }
        },
        deleteTodo :(state,action) => {
            return state.filter((todo)=>todo.id!==action.payload)
        }

    }
});

export const {addTodo , toggleTodo , deleteTodo} = todosSlice.actions;
export default todosSlice.reducer;