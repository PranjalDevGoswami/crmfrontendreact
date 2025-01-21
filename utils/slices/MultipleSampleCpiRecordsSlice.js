import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sampleCpiRecord: [],
  isViewMultipleSampleCpiRecords: false,
};

const MultipleSampleCpiRecords = createSlice({
  name: "MultipleSampleCpiValue",
  initialState,
  reducers: {
    addMultipleSample(state, action) {
      state.sampleCpiRecord = action.payload;
    },
    toggleViewMultipleCpiSample(state, action) {
      state.isViewMultipleSampleCpiRecords = action.payload;
    },
    removeMultipleSample(state) {
      state.sampleCpiRecord = [];
    },
  },
});

export const {
  addMultipleSample,
  removeMultipleSample,
  toggleViewMultipleCpiSample,
} = MultipleSampleCpiRecords.actions;
export default MultipleSampleCpiRecords.reducer;
