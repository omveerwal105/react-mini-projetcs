import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchGitHubUser = createAsyncThunk(
    'github/fetchUser',
    async (username) => {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
    }
);

const githubSlice = createSlice({
    name : 'github',
    initialState : {
        loading : false,
        error : null ,
        user : null
    },
    reducers : {},

    extraReducers : (builder) => {
        builder
        .addCase(fetchGitHubUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchGitHubUser.fulfilled , (state , action)=>{
            state.loading = false;
            state.user = action.payload;
        })

        .addCase(fetchGitHubUser.rejected , (state,action)=>{
            state.loading = false;
            state.error = 'Failed to fetch user'
        })
    }
});

export default githubSlice.reducer 