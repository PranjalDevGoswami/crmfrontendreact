import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "formSlice",
  initialState: {
    items: [],
  },
  reducers: {
    addFormData: (state, action) => {
      const newData = Array.isArray(action.payload) ? action.payload : [];
      const uniqueData = newData.filter(
        (item) =>
          !state.items.some((existingItem) => existingItem.id == item.id)
      );
      state.items = state.items.concat(uniqueData);
    },
    deleteFormData: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addFormData, deleteFormData } = FormSlice.actions;
export default FormSlice.reducer;
