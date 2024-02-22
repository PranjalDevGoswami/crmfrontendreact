// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   isLoggedIn: false,
//   user: null,
// };

// const loginSlice = createSlice({
//   name: "login",
//   initialState : false,
//   reducers: {
//     loginSuccess(state, action) {
//       state.isLoggedIn = true;
//       state.user = action.payload; // Assuming the payload contains user data
//       localStorage.setItem('user', JSON.stringify(action.payload));
//     },
//     logout(state) {
//       state.isLoggedIn = false;
//       state.user = null;
//       localStorage.removeItem('user');
//     },
//   },
// });

// export const { loginSuccess, logout } = loginSlice.actions;

// export default loginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: "login",
  initialState : {
    isLoggedIn: false,
    user: null,
  },
  reducers:{
    login : (state,action) =>{
      state.isLoggedIn = true,
      user = action.payload; 
    }
  }
})
export const {login} = loginSlice.actions;
export default loginSlice.reducer;