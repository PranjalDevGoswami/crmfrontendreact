import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "formSlice",
  initialState: {
    items: [],
  },
  reducers: {
    addFormData: (state, action) => {
      action.payload.forEach(item => {
        state.items.push(item);
      })
    },
    addFormDataArray : (state,action)=>{
      state.items.push(action.payload);
    },
    deleteFormData: (state, action) => {
      state.items.pop(action.payload);
    },
  },
});

export const { addFormData, deleteFormData,addFormDataArray } = FormSlice.actions;
export default FormSlice.reducer;
