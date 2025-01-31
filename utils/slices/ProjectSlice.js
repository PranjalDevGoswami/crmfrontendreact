import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  page_number:1,
  page_size: 30,
  totalRows:0,
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
    }

  },
});

export const { setProjects, addProject, removeProject,addPageNumber,addPageSize,addTotalRows } = projectSlice.actions;
export default projectSlice.reducer;
