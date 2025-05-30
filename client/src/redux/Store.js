import { configureStore } from '@reduxjs/toolkit'
import pincodeReducer from '../features/profile/Pincode'
export const store = configureStore({
  reducer: {
    pincode: pincodeReducer
  },
})