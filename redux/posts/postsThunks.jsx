// import { requestGetAllPosts } from "../../API/posts/getPosts";
import { getDataFromFirestore } from "../../API/posts/getPosts";
import { createAsyncThunk } from "@reduxjs/toolkit";


// санка для отримання даних усіх постів з firebase
export const getPostsThunks2 = createAsyncThunk(
  "posts/get",
  async (_, thunkAPI) => {   
    try {
      const postsData = await getDataFromFirestore();      
      return postsData; // ЦЕ БУДЕ ЗАПИСАНО В ЕКШИН ПЕЙЛОАД
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }  
);