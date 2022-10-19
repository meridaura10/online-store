import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { removeToFirebaseCollectionsCart, writeToFirebaseDatabaseCart } from "../../firebase/cart";
import { getLocalStorage } from "../../utils/localStorage";
export const getFirebaseGoods = createAsyncThunk(
  "cart/getFirebaseGoods",
  async function (_, { rejectWithValue }) {
    try {
      const userId = getLocalStorage('user').id
      const docSnap = await getDocs(collection(db, `cart/${userId}/goods`));
      return docSnap.docs.map(e => e.data())
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    status: null,
    items: [],
    totalPrice: 0,
    count: 0,
    error: null,
  },
  reducers: {
    addCartGoods(state, actions) {
      const findItem = state.items.find((obj) => obj.id === actions.payload.id);
      if (findItem) {
        findItem.count++;
        writeToFirebaseDatabaseCart(findItem,actions.payload.userId);
      } else {
        writeToFirebaseDatabaseCart({ ...actions.payload, count: 1,userId: actions.payload.userId});
        state.items.push({
          ...actions.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.count = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    minusGood(state, actions) {
      const findItem = state.items.find((obj) => obj.id === actions.payload.id);
      if (findItem) {
        findItem.count--;
        writeToFirebaseDatabaseCart(findItem);
      }
      state.count = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeGoods(state, actions) {
      state.items = state.items.filter((obj) => obj.id !== actions.payload);
      state.count = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearCart(state) {
      // removeToFirebaseCollectionsCart()
      state.items = [];
    },
  },
  extraReducers: {
    [getFirebaseGoods.pending]: (state) => {
      state.status = "loading";
    },
    [getFirebaseGoods.fulfilled]: (state, actions) => {
      state.status = "resolved";
      state.items = actions.payload;
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.count = state.items.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    [getFirebaseGoods.rejected]: (state, actions) => {
      state.status = "error";
      state.error = actions.payload;
    },
  },
});
export const { addCartGoods, minusGood, removeGoods, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
