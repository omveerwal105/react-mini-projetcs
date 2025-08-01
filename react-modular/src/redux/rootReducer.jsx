import { combineReducers } from 'redux';
import counterReducer from './reducers/counterReducer';
import themeReducer from './reducers/themeReducer';
import todoReducer from './reducers/todoReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer,
  todo : todoReducer
});

export default rootReducer;
