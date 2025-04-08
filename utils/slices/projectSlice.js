import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  filteredProjects: [],
  exportProjects: [],
  projectsWithoutAnyFilter: [],
  isAddClient: false,
  projectType: [
    { id: 1, name: "Demo CATI" },
    { id: 2, name: " Demo CAWI" },
  ],
  projectManager: [
    { id: 1, name: "Demo Manager" },
    { id: 2, name: " Demo Manager" },
  ],
  clients: [
    { id: 1, name: "demo client 1" },
    { id: 2, name: "demo client 2" },
  ],
  page_number: 1,
  page_size: 30,
  totalRows: null,
  activeTab: "all",
  selectedAssignedTeamLead: [],
};

const projectSlice = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    setProjects(state, action) {
      // If action.payload is an array (old usage), wrap it in the new format
      const isOldFormat = Array.isArray(action.payload);
      const data = isOldFormat ? action.payload : action.payload.data;
      const reset = isOldFormat ? false : action.payload.reset || false;
    
      if (reset) {
        // Reset mode: overwrite the project list
        state.projects = data;
      } else {
        // Append mode with deduplication
        const allProjects = [...state.projects, ...data];
        const uniqueProjects = Array.from(
          new Map(allProjects.map((project) => [project.id, project])).values()
        );
        state.projects = uniqueProjects;
      }
    }
    
,    
    addFilterProjectData: (state, action) => {
      state.filteredProjects = action.payload;
    },
    addExportData: (state, action) => {
      state.items = action.payload;
    },
    addProjectWithoutAnyFilter: (state, action) => {
      state.projectsWithoutAnyFilter = action.payload;
    },
    removeProject(state, action) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    toggleAddClient: (state, action) => {
      state.isAddClient = !state.isAddClient;
    },
    addProjectType(state, action) {
      state.projectType = action.payload;
    },
    addProjectManager(state, action) {
      state.projectManager = action.payload;
    },
    addClientList(state, action) {
      state.clients = action.payload;
    },
    addPageNumber: (state, action) => {
      state.page_number = action.payload;
    },
    addPageSize: (state, action) => {
      state.page_size = action.payload;
    },
    addTotalRows: (state, action) => {
      state.totalRows = action.payload;
    },
    addActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    addAssignedTeamLead: (state, action) => {
      state.selectedAssignedTeamLead = action.payload;
    },
  },
});

export const {
  setProjects,
  removeProject,
  addFilterProjectData,
  addExportData,
  addProjectWithoutAnyFilter,
  toggleAddClient,
  addProjectType,
  addProjectManager,
  addClientList,
  addPageNumber,
  addPageSize,
  addTotalRows,
  addActiveTab,
  addAssignedTeamLead,
} = projectSlice.actions;
export default projectSlice.reducer;
