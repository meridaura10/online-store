import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
const initialState = getLocalStorage("user") || {
  email: null,
  name: null,
  img: null,
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, actions) {
      state.email = actions.payload.email;
      state.name = actions.payload.name;
      state.img = actions.payload.img;
      state.id = actions.payload.id;
      setLocalStorage("user", actions.payload);
    },
    removeUser(state) {
      state.email = null;
      state.name = null;
      state.img = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
