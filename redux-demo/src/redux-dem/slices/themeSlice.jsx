import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode : false
};

const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers : {
        toggle_Theme : (state) => {
            state.darkMode = !state.darkMode
        }
    }
});

export const {toggle_Theme} = themeSlice.actions;
export default themeSlice.reducer;