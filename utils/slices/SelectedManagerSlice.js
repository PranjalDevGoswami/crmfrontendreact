import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Managers: [],
  ManagerListArray: [],
};
const SelectedManagerSlice = createSlice({
  name: "SelectedManager",
  initialState,
  reducers: {
    addSelectedManager(state, action) {
      state.Managers.push(action.payload);
    },
    addSelectedManagerListArray(state, action) {
      state.Managers.push(action.payload);
    },
    removeSelectedManager(state, action) {
      state.Managers.pop(action.payload);
    },
  },
});
export const {
  addSelectedManager,
  removeSelectedManager,
  addSelectedManagerListArray,
} = SelectedManagerSlice.actions;
export default SelectedManagerSlice.reducer;
