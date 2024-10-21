import { createSlice } from "@reduxjs/toolkit";

const ReRender = createSlice({
  name: "reRender",
  initialState: {
    count: 0,
  },
  reducers: {
    addReRender(state) {
      state.count += 1; // Increment the current count
    },
  },
});

export const { addReRender } = ReRender.actions;
export default ReRender.reducer;
