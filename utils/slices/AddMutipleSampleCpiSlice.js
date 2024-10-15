import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isMultipleSample: false,
  isMultipleSampleSelected: false,
};

const AddMultipleSampleCpiSlice = createSlice({
  name: "addMultipleSampleCpi",
  initialState,
  reducers: {
    toggleMultipleSampleCpi(state, action) {
      state.isMultipleSample = action.payload;
    },
    checkedMultipleSampleCpi(state, action) {
      state.isMultipleSampleSelected = action.payload;
    },
  },
});

export const { toggleMultipleSampleCpi, checkedMultipleSampleCpi } =
  AddMultipleSampleCpiSlice.actions;

export default AddMultipleSampleCpiSlice.reducer;
