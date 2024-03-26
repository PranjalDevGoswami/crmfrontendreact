import { createSlice } from "@reduxjs/toolkit";

const DarkModeSlice = createSlice({
    name: 'darkmode',
    initialState: {
        isDarkMode: false,
        // Other initial state properties if needed
    },
    reducers: {
        toggleDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
        }
    }
});

export const { toggleDarkMode } = DarkModeSlice.actions;
export default DarkModeSlice.reducer;
