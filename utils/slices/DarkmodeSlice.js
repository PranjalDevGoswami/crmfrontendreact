import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: localStorage.getItem("isDarkMode") === "true" ? true : false,
};

const DarkModeSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
      localStorage.setItem("isDarkMode", action.payload);
    },
  },
});
export const { toggleDarkMode } = DarkModeSlice.actions;
export default DarkModeSlice.reducer;
