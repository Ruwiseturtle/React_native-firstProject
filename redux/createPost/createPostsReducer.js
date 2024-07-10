import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  selectedImage: false,
  selectedLocation: false,
  locationName: null,
};

const createPostSlice = createSlice({
  name: "createPost",
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedImageToStore: (state, action) => {
      state.selectedImage = action.payload;
    },
    setSelectedLocationToStore: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setLocationNameToStore: (state, action) => {
      state.locationName = action.payload;
    },
  },
});

export const {
  setSelectedImageToStore,
  setSelectedLocationToStore,
  setLocationNameToStore,
} = createPostSlice.actions;
export const createPostReducer = createPostSlice.reducer;
