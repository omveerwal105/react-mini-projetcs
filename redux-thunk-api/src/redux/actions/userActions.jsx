// redux/actions/userActions.js
import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: 'FETCH_USERS_REQUEST' });
  try {
    const response = await axios.get('https://api.github.com/users');
    dispatch({
      type: 'FETCH_USERS_SUCCESS',
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: 'FETCH_USERS_FAILURE',
      payload: err.message || 'Failed to fetch users'
    });
  }
};
