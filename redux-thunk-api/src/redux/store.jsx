// redux/store.jsx
import { createStore, applyMiddleware, combineReducers } from 'redux';
import userReducer from './reducer/userReducer'; 


const thunkMiddleware = ({ dispatch, getState }) => (next) => (action) =>
  typeof action === 'function' ? action(dispatch, getState) : next(action);

const rootReducer = combineReducers({
  user: userReducer, // state.user
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;


