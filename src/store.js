import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/projectData/projectDataSlice.js";
import loginReducer from "./features/login/loginSlice.js";
import departmentReducer from "./features/department/departmentSlice.js";
import { toggleDarkMode } from "./features/darkmode/DarkmodeSlice.js";
// import {RowDataReducer} from './components/features/dataTableSelectedRow/dataTableSelectedRow.js'

export default configureStore({
  reducer: {
    login: loginReducer,
    FormData: formReducer,
    getDepartment: departmentReducer,
    darkMode: toggleDarkMode,
    // getSelectedRowData:getSelectedRowDataReducer
  },
});
