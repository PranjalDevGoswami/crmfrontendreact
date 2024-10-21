import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sampleCpiRecord: [],
};

const MultipleSampleCpiSlice = createSlice({
  name: "MultipleSampleCpiValue",
  initialState,
  reducers: {
    addMultipleSample(state, action) {
      state.sampleCpiRecord = action.payload;
    },
    removeMultipleSample(state) {
      state.sampleCpiRecord = [];
    },
  },
});

export const { addMultipleSample, removeMultipleSample } =
  MultipleSampleCpiSlice.actions;
export default MultipleSampleCpiSlice.reducer;
