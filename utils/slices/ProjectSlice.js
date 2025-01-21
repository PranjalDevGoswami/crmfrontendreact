import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
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
  },
});

export const { setProjects, addProject, removeProject } = projectSlice.actions;
export default projectSlice.reducer;
