import { configureStore } from '@reduxjs/toolkit'
import formReducer from './components/features/projectData/projectDataSlice.js'
import loginReducer from './components/features/login/loginSlice.js'

export default configureStore({
  reducer: {
    login: loginReducer,
    FormData:formReducer
  },
})