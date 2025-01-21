import { createSlice } from "@reduxjs/toolkit";

const ExportDataSlice = createSlice({
  name: "ExportDataSlice",
  initialState: {
    items: [],
  },
  reducers: {
    addExportData: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addExportData } = ExportDataSlice.actions;
export default ExportDataSlice.reducer;
