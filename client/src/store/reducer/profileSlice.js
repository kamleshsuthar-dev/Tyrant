import { createSlice } from "@reduxjs/toolkit";
import { addAddress, deleteAddress, fetchAddress, updateAddress } from "../action/profileAction";

const initialState = {
 
    profile: null ,
    address: [],
    defaultAddress : null,

  fetchStatus: { loading: false, error: null, success: null },
  addStatus: { loading: false, error: null, success: null },
  deleteStatus: { loading: false, error: null, success: null },
  updateStatus: { loading: false, error: null, success: null },
}


const profile = createSlice({
    name: "profile",
    initialState,
    reducers :{
       clearAddAddress : (state)=>{
            state.addStatus.success = null,
            state.addStatus.error = null
       }
    },
    extraReducers :(builder)=>{
        builder 

        .addCase(fetchAddress.pending, (state) => {
           state.fetchStatus.loading = true;
           state.fetchStatus.error = null;
         })
         .addCase(fetchAddress.fulfilled, (state, action) => {
            const {success , address} = action.payload
            state.fetchStatus.loading = false;
            state.address = address.reverse();
            state.fetchStatus.success= success
         })
         .addCase(fetchAddress.rejected, (state, action) => {
           state.fetchStatus.loading = false;
           state.fetchStatus.error = action.payload;
         })

     
        .addCase(addAddress.pending, (state) => {
            state.addStatus.loading = true;
            state.addStatus.error = null;
        })
        .addCase(addAddress.fulfilled, (state, action) => {
            const  { message} = action.payload
            state.addStatus.loading = false;
            state.addStatus.success = message || "Address added Successfully!";
        })
        .addCase(addAddress.rejected, (state, action) => {
            state.addStatus.loading = false;
            state.addStatus.error = action.payload;
        })

        .addCase(updateAddress.pending, (state) => {
            state.updateStatus.loading = true;
            state.updateStatus.error = null;
        })
        .addCase(updateAddress.fulfilled, (state, action) => {
           
            state.updateStatus.loading = false;
            state.updateStatus.success = action.payload;
        })
        .addCase(updateAddress.rejected, (state, action) => {
            state.updateStatus.loading = false;
            state.updateStatus.error = action.payload;
        })
        
        .addCase(deleteAddress.pending, (state) => {
            state.deleteStatus.loading = true;
            state.deleteStatus.error = null;
        })
        .addCase(deleteAddress.fulfilled, (state, action) => {
            const {addressId ,deleteMessage  } = action.payload 
            state.deleteStatus.loading = false;
            state.deleteStatus.success = deleteMessage

            state.address = state.address.filter((ad)=>ad._id !== addressId)
        })
        .addCase(deleteAddress.rejected, (state, action) => {
            state.deleteStatus.loading = false;
            state.deleteStatus.error = action.payload;
        })

    }
})

export const { clearAddAddress} = profile.actions

export default profile.reducer