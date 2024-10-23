import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

const initialState = {
  user: userData || null,
  token: token || "",
  isAdmin: isAdmin || false,
  sideBar: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin || false;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", JSON.stringify(state.token));
      localStorage.setItem("isAdmin", JSON.stringify(state.isAdmin));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
    },
    setSideBar: (state, { payload }) => {
      state.sideBar = payload;
    },
    setIsAdmin: (state, { payload }) => {
      state.isAdmin = payload;
    },
  },
});

export const { loginSuccess, logout, setSideBar, setIsAdmin } = authSlice.actions;

export default authSlice.reducer;
