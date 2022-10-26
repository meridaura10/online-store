import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import {
  removeFavoriteFirebase,
  writeToFirebaseFavorites,
} from "../../firebase/favorite";
import { getLocalStorage } from "../../utils/localStorage";
export const getFirebaseFavorites = createAsyncThunk(
  "favorite/getFirebaseFavorites",
  async function (_, { rejectWithValue }) {
    try {
      const userId = getLocalStorage("user").id;
      const docSnap = await getDocs(collection(db, `favorite/${userId}/goods`));
      return docSnap.docs.map((e) => e.data());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const cartSlice = createSlice({
  name: "favorite",
  initialState: {
    status: null,
    items: [],
    count: 0,
    totalPrice: 0,
    error: null,
  },
  reducers: {
    addFavorite(state, actions) {
      state.items.push(actions.payload.item);
      writeToFirebaseFavorites(actions.payload.item, actions.payload.userId);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
      state.count = state.items.length;
    },
    removeFavorite(state, actions) {
      removeFavoriteFirebase(actions.payload.id, actions.payload.userId);
      state.items = state.items.filter((obj) => obj.id !== actions.payload.id);
      state.count = state.items.length;
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
    },
    clearFavorite(state) {
      state.items = [];
      state.totalPrice = 0;
      state.count = 0;
    },
  },
  extraReducers: {
    [getFirebaseFavorites.pending]: (state) => {
      state.status = "loading";
    },
    [getFirebaseFavorites.fulfilled]: (state, actions) => {
      state.status = "resolved";
      state.items = actions.payload;
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
      state.count = state.items.length;
    },
    [getFirebaseFavorites.rejected]: (state, actions) => {
      state.status = "error";
      state.error = actions.payload;
    },
  },
});
export const { addFavorite, clearFavorite, removeFavorite } = cartSlice.actions;

export default cartSlice.reducer;
