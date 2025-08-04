// features/store/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // no need to add thunk; it's already included by default
});

export default store;
