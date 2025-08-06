import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: 'todos',
  initialState: {
    tasks: []
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false
      };
      state.tasks.push(newTask);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  
  }
});

export const { addTask, deleteTask, toggleTask } = taskSlice.actions;
export default taskSlice.reducer;
