import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name:'userProfile',
    initialState:null,
    reducers:{
        addUserProfile:(state,action)=>{
            return action.payload
        },
        removeUserProfile:(state,action)=>{
            return null
        }
    }
})
export const {addUserProfile,removeUserProfile} = userProfileSlice.actions
export default userProfileSlice.reducer