import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "all",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, actions) {
      state.selectedCategory = actions.payload.selectedCategory;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
