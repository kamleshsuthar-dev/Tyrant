import { addCategory, deleteCategory, fetchCategory, updateCategory } from "../action/categoryAction";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryItems: [],
  fetchStatus: { loading: false, error: null, success: null },
  addStatus: { loading: false, error: null, success: null },
  updateStatus: { loading: false, error: null, success: null },
  deleteStatus: { loading: false, error: null, success: null },
}


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers :{
        clearAddStatus :(state)=>{
            state.addStatus.success=null
        }
    },
    extraReducers :(builder)=>{
        builder 

        .addCase(fetchCategory.pending, (state) => {
           state.fetchStatus.loading = true;
           state.fetchStatus.error = null;
         })
         .addCase(fetchCategory.fulfilled, (state, action) => {
           state.fetchStatus.loading = false;
           state.categoryItems = action.payload;
         })
         .addCase(fetchCategory.rejected, (state, action) => {
           state.fetchStatus.loading = false;
           state.fetchStatus.error = action.payload;
         })

        .addCase(addCategory.pending, (state) => {
            state.addStatus.loading = true;
            state.addStatus.error = null;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
           const {message} = action.payload
            state.addStatus.loading = false;
            state.addStatus.success = message || "Category added successfully!";
           
        })
        .addCase(addCategory.rejected, (state, action) => {
            state.addStatus.loading = false;
            state.addStatus.error = action.payload;
        })

        .addCase(updateCategory.pending, (state) => {
            state.addStatus.loading = true;
            state.addStatus.error = null;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            const  {prdId , message} = action.payload
            state.addStatus.loading = false;
            state.addStatus.success = message || "Item added to cart!";
            //  state.cartItems.push(prdId);
        })
        .addCase(updateCategory.rejected, (state, action) => {
            state.addStatus.loading = false;
            state.addStatus.error = action.payload;
        })
        
        .addCase(deleteCategory.pending, (state) => {
            state.deleteStatus.loading = true;
            state.deleteStatus.error = null;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            const {itemId , response} = action.payload 
            state.deleteStatus.loading = false;
        state.cartItems = state.cartItems.filter(item => item._id !== itemId);
            state.deleteStatus.success = response
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.deleteStatus.loading = false;
            state.deleteStatus.error = action.payload;
        })
         

    }
})

export const {clearAddStatus} = categorySlice.actions

export default categorySlice.reducer