import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  page_number:1,
  page_size: 30,
  totalRows:0,
  financeProjects:[]
};

const projectSlice = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
    addProject(state, action) {
      state.projects.push(action.payload);
    },
    removeProject(state, action) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    addPageNumber:(state,action)=>{
      state.page_number = action.payload
    },
    addPageSize:(state,action)=>{
      state.page_size = action.payload
    },
    addTotalRows:(state,action) =>{
      state.totalRows = action.payload
    },
    addFinanceProject:(state,action)=>{
      state.financeProjects = action.payload
    }

  },
});

export const { setProjects, addProject, removeProject,addPageNumber,addPageSize,addTotalRows,addFinanceProject } = projectSlice.actions;
export default projectSlice.reducer;
