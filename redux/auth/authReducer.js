import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const { setCurrentUser, setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
