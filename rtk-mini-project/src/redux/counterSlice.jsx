import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice ({
    name : 'counter',
    initialState : {
        count : 0
    },
    reducers : {
        Increment : (state) => {
             state.count +=1;
        },
        Decrement : (state) => {
              state.count -= 1
        },
        Reset : (state) => {
           state.count = 0;
        }
    }
});

export const {Increment , Decrement , Reset } = counterSlice.actions;
export default counterSlice.reducer;