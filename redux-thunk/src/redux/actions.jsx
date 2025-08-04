import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    
    dispatch(fetchUsersSuccess(response.data));
  } catch (err) {
    dispatch(fetchUsersFailure(err.message));
  }
};
