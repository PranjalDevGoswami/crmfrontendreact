import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../utils/slices/projectDataSlice.js";
import loginReducer from "../utils/slices/loginSlice.js";
import darkModeReducer from "../utils/slices/DarkmodeSlice.js";
import projectReducer from "../utils/slices/ProjectSlice.js";
import userReducer from "../utils/slices/UserSlice.js";
import FilterProjectDataReducer from "../utils/slices/FilterProjectDataSlice.js";
import addMultipleSampleCpiReducer from "../utils/slices/AddMutipleSampleCpiSlice.js";
import MultiSampleCpiRecordReducer from "../utils/slices/MultipleSampleCpiRecordsSlice.js";
import ExportDataReducer from "../utils/slices/ExportDataSlice.js";
import SelectedHodReducer from "../utils/slices/SelectedHodSlice.js";
import SelectedManagerReducer from "../utils/slices/SelectedManagerSlice.js";
import ReRenderReducer from "../utils/slices/ReRenderSlice.js";
import  notificationCountReducer  from "../utils/slices/notificationCountSlice.js"
export default configureStore({
  reducer: {
    login: loginReducer,
    FormData: formReducer,
    darkMode: darkModeReducer,
    projectData: projectReducer,
    userData: userReducer,
    projectDataFiltered: FilterProjectDataReducer,
    addMultipleSampleCpi: addMultipleSampleCpiReducer,
    MultiSampleCpiRecord: MultiSampleCpiRecordReducer,
    ExportData: ExportDataReducer,
    selectedHod: SelectedHodReducer,
    selectedManager: SelectedManagerReducer,
    ReRender: ReRenderReducer,
    notificationCount: notificationCountReducer,
  },
});
