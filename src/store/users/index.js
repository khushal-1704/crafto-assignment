import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth_token: null,
    user_name: '',
};

export const appUserSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    addAuthToken: (state, actions) => {
      state.auth_token = actions.payload.authToken;
      state.user_name = actions.payload.username;
    },
    resetUser: (state) => {
      state.auth_token = null
      state.user_name = ''
    }
  },
});

export const { addAuthToken, resetUser } = appUserSlice.actions;

export const authToken = (state) => state.appUser.auth_token;

export default appUserSlice.reducer;
