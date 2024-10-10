import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isMultipleSample: false,
};

const AddMultipleSampleCpiSlice = createSlice({
  name: "addMultipleSampleCpi",
  initialState,
  reducers: {
    toggleMultipleSampleCpi(state, action) {
      state.isMultipleSample = action.payload;
    },
  },
});

export const { toggleMultipleSampleCpi } = AddMultipleSampleCpiSlice.actions;

export default AddMultipleSampleCpiSlice.reducer;
