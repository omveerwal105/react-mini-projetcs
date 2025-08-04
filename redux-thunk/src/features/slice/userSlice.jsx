import {createSlice}  from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading : false ,
    error : null,
    user : null
};

const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
        fetchUserStart : (state) =>{
            state.loading = true;
            state.error = null;
        },

        fetchUserSuccess : (state , action) => {
            state.loading = false;
            state.user = action.payload;
        },

        fetchUserFailure : (state , action) => {
            state.loading = false;
            state.error =  action.payload
        }
    }
});

export const {
      fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure, } = userSlice.actions ;

  export default userSlice.reducer;

export const fetchGitHubUser =  (username) => async (dispatch) => {
    dispatch(fetchUserStart());
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        dispatch(fetchUserSuccess(response.data));
 
    }
    catch (err) {
        dispatch(fetchUserFailure(err.message));
    }
};
