import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  hods: [],
};
const SelectedHodSlice = createSlice({
  name: "SelectedHod",
  initialState,
  reducers: {
    addSelectedHod(state, action) {
      state.hods.push(action.payload);
    },
    removeSelectedHod(state, action) {
      state.hods.pop(action.payload);
    },
  },
});
export const { addSelectedHod, removeSelectedHod } = SelectedHodSlice.actions;
export default SelectedHodSlice.reducer;
