import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
};

const notificationSlice = createSlice({
  name: "notificationCount",
  initialState,
  reducers: {
    setnotification(state, action) {
      state.notification = action.payload;
    },
    addNotification(state, action) {
      state.notification.push(action.payload);
    },
  },
});

export const { setnotification, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
