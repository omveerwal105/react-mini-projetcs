// userReducer.js
const initialState = {
  loading: false,
  users: [],
  error: ''
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_USERS_FAILURE':
      return { ...state, loading: false, users: [], error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
