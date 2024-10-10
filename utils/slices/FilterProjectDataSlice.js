import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  projects: [],
};

const FilterDataSlice = createSlice({
  name: "FilterProjectData",
  initialState,
  reducers: {
    addFilterProjectData(state, action) {
      state.projects = action.payload;
    },
  },
});
export const { addFilterProjectData } = FilterDataSlice.actions;

export default FilterDataSlice.reducer;
