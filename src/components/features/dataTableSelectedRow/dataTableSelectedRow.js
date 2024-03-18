import {createSlice} from '@reduxjs/toolkit'

const getSelectedRowDataReducer = createSlice({
    name:'selectedRow',
    initialState:{
        Row:null
    },
    reducers:{
        getSelectedRow :(state,action) =>{
            state.Row = action.payload
        }
    }
})
export const {selectedRow} = getSelectedRowDataReducer.actions;
export default getSelectedRowDataReducer.reducer;