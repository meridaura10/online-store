import { configureStore } from '@reduxjs/toolkit'
import cartsSlice from './Slices/cartsSlice'
import categorySlice from './Slices/categorySlice'
import userSlice from './Slices/userSlice'
export const store = configureStore({
  reducer: {
    category: categorySlice,
    cart: cartsSlice,
    user: userSlice,
  },
})