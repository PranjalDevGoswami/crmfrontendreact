import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../utils/slices/projectSlice.js";
import userReducer from "../utils/slices/userSlice.js";
import addMultipleSampleCpiReducer from "../utils/slices/addMutipleSampleCpiSlice.js";
import SelectedUserReducer from "../utils/slices/selectedUserFilterSlice.js";
import notificationCountReducer from "../utils/slices/notificationSlice.js";
import themeSettingReducer from "../utils/slices/themeSettingSlice.js";
import projectEntryFormReducer from "../utils/slices/projectEntryFormSlice.js";
import dataTableReducer from "../utils/slices/dataTableSlice.js";
import filterSliceReducer from "../utils/slices/filterSlice.js";
import projectAssignmentSlice from "../utils/slices/projectAssignmentSlice.js";
import financeDepartmentSlice from "../utils/slices/financeDepartmentSlice.js";
import generateInvoiceSlice from "../utils/slices/generateInvoiceSlice.js";
import multipleManDaysSlice from "../utils/slices/addMultipleManDaysSlice.js";
import ReportSlice from "../utils/slices/reportSlice.js";
import userProfileSlice from '../utils/slices/userProfileSlice.js'

export default configureStore({
  reducer: {
    projectData: projectReducer,
    userData: userReducer,
    addMultipleSampleCpi: addMultipleSampleCpiReducer,
    selectedUserFilter: SelectedUserReducer,
    notification: notificationCountReducer,
    themeSetting: themeSettingReducer,
    projectEntryForm: projectEntryFormReducer,
    dataTable: dataTableReducer,
    filterSlice: filterSliceReducer,
    projectAssignment: projectAssignmentSlice,
    financeDepartment: financeDepartmentSlice,
    generateInvoice: generateInvoiceSlice,
    MultipleManDays: multipleManDaysSlice,
    ReportSlice:ReportSlice,
    userProfile:userProfileSlice
  },
});
