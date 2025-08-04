import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers =  createAsyncThunk('users/fetchUsers', async(_,thunkAPI) => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        return res.data.map((user)=>user.name);
    }
    catch (err) {
         return thunkAPI.rejectWithValue(err.message);
    }
});

const userSlice = createSlice({
    name : 'user',
    initialState : {
        loading : false,
        users : [],
        error :  ''
    },
    reducers : {},
    extraReducers : (builder) => {
        builder 
        .addCase(fetchUsers.pending , (state) => {
            state.loading =  true;
        })
        .addCase(fetchUsers.fulfilled , (state , action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected ,(state,action)=>{
            state.loading = false;
            state.users = [];
            state.error = action.payload;
        })
    }
});

export default userSlice.reducer;