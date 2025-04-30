import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nickName: "",
    landmark: "",
    addressLine: "",
    locality: "",
    pinCode: "",
    state: "",
    city: "",
    type: "Home",
    isDefault: false,
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
   
  },
})

// Action creators are generated for each case reducer function
export const {  } = addressSlice.actions

export default addressSlice.reducer