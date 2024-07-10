import { createSlice } from "@reduxjs/toolkit";
import { getUsersThunks } from "../users/usersThunks";

const INITIAL_STATE = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      //кейси для отримання постів із firebase
      .addCase(getUsersThunks.pending, (state) => {
        console.log("status pending юзеров");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersThunks.fulfilled, (state, action) => {
        console.log("status fullfilled users");
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getUsersThunks.rejected, (state, action) => {
        console.log("status error users");
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
