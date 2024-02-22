import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "formSlice",
  initialState: {
    items: [],
  },
  reducers: {
    addFormData: (state, action) => {
      // Ensure action.payload is an array
      const newData = Array.isArray(action.payload) ? action.payload : [];
      // Filter out any items that already exist in the state
      const uniqueData = newData.filter(item => !state.items.some(existingItem => existingItem.id === item.id));
      // Concatenate the new data with the existing state
      state.items = state.items.concat(uniqueData);
    },
    deleteFormData: (state, action) => {
      // Filter out the item to delete
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});



export const { addFormData, deleteFormData } = FormSlice.actions;
export default FormSlice.reducer;
