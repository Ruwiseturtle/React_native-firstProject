// import { requestGetAllPosts } from "../../API/posts/getPosts";
import { getUsersFromFirestore } from "../../API/users/getUsersFromFirestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

// санка для отримання даних усіх постів з firebase
export const getUsersThunks = createAsyncThunk(
  "usesr/get",
  async (_, thunkAPI) => {
    try {
      const usersData = await getUsersFromFirestore();
      return usersData; // ЦЕ БУДЕ ЗАПИСАНО В ЕКШИН ПЕЙЛОАД
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
