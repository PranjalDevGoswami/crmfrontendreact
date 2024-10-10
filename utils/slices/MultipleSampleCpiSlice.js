import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sampleCpiRecord: [],
};

const MultipleSampleCpiSlice = createSlice({
  name: "MultipleSampleCpiValue",
  initialState,
  reducers: {
    addMultipleSample(state, action) {
      // state.sampleCpiRecord.push(...action.payload);
      state.sampleCpiRecord = action.payload; // Replace the entire record with updated data
    },
  },
});

export const { addMultipleSample } = MultipleSampleCpiSlice.actions;
export default MultipleSampleCpiSlice.reducer;
