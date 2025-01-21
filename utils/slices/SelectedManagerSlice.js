import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  SrManagers:[],
  Managers: [],
  AssManagers:[],
  TeamleadList:[],
  SrManagerListArray: [],
  ManagerListArray: [],
  AssManagerListArray: [],
  TeamleadListArray:[]
};
const SelectedManagerSlice = createSlice({
  name: "SelectedManager",
  initialState,
  reducers: {
    addSelectedSrManager(state, action) {
      state.SrManagers.push(action.payload);
    },
    addSelectedSrManagerListArray(state, action) {
      state.SrManagers.push(action.payload);
    },
    removeSelectedSrManager(state, action) {
      state.SrManagers.pop(action.payload);
    },
    addSelectedManager(state, action) {
      state.Managers.push(action.payload);
    },
    addSelectedManagerListArray(state, action) {
      state.Managers.push(action.payload);
    },
    removeSelectedManager(state, action) {
      state.Managers.pop(action.payload);
    },
    addSelectedAssManager(state, action) {
      state.AssManagers.push(action.payload);
    },
    addSelectedAssManagerListArray(state, action) {
      state.AssManagers.push(action.payload);
    },
    removeSelectedAssManager(state, action) {
      state.AssManagers.pop(action.payload);
    },
    addSelectedTeamLead(state, action) {
      state.TeamLead.push(action.payload);
    },
    addSelectedTeamLeadListArray(state, action) {
      state.TeamLead.push(action.payload);
    },
    removeSelectedTeamLead(state, action) {
      state.TeamLead.pop(action.payload);
    },
  },
});
export const {
  addSelectedSrManager,
  removeSelectedSrManager,
  addSelectedSrManagerListArray,
  addSelectedManager,
  removeSelectedManager,
  addSelectedManagerListArray,
  addSelectedAssManager,
  removeSelectedAssManager,
  addSelectedAssManagerListArray,
  addSelectedTeamLead,
  addSelectedTeamLeadListArray,
  removeSelectedTeamLead
} = SelectedManagerSlice.actions;
export default SelectedManagerSlice.reducer;
