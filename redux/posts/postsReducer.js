import { createSlice } from "@reduxjs/toolkit";
// import { getPostsThunks } from "./postsThunks.jsx";
import { getPostsThunks2 } from "./postsThunks.jsx";

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {
    setPosts: (state, action) => {
      //   state.currentPage = action.payload;
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      //кейси для отримання постів із firebase
      .addCase(getPostsThunks2.pending, (state) => {
        console.log("status pending постов");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPostsThunks2.fulfilled, (state, action) => {
        console.log("status fullfilled posts");
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPostsThunks2.rejected, (state, action) => {
        console.log("status error posts");
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setPosts } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
