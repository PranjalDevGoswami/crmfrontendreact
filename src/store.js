import { configureStore } from '@reduxjs/toolkit'
import formReducer from './components/features/projectData/projectDataSlice.js'
import loginReducer from './components/features/login/loginSlice.js'
import departmentReducer from './components/features/department/departmentSlice.js'
import { toggleDarkMode } from './components/features/darkmode/DarkmodeSlice.js'

export default configureStore({
  reducer: {
    login: loginReducer,
    FormData:formReducer,
    getDepartment:departmentReducer,
    darkMode : toggleDarkMode
  },
})