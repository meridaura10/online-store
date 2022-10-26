import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: null,
  },
  reducers: {
    setValueSearch(state, actions) {
        state.value = actions.payload
    },
  }
});
export const { setValueSearch } = searchSlice.actions;

export default searchSlice.reducer;