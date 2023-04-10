import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      localStorage.setItem("authState", JSON.stringify(state));
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectToken = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.userId;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
