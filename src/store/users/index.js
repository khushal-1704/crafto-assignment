import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_name: '',
};

export const appUserSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    addUserName: (state, actions) => {
      state.user_name = actions.payload;
    },
    resetUser: (state) => {
      state.auth_token = null
      state.user_name = ''
    }
  },
});

export const { addUserName, resetUser } = appUserSlice.actions;

export const authToken = (state) => state.appUser.auth_token;

export default appUserSlice.reducer;
