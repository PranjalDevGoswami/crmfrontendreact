import {createSlice} from '@reduxjs/toolkit'

const departmentSlice = createSlice({
    name:'department',
    initialState:{
        departments:''
    },
    reducers:{
        getDepartment :(state,action) =>{
            state.departments = action.payload
        }
    }
})
export const {getDepartment} = departmentSlice.actions;
export default departmentSlice.reducer;