import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, fetchCategoryProduct, fetchProduct, fetchSingleProduct } from "../action/productAction";

const initialState = {
  productItems: [],
  singleProduct : null ,
  fetchStatus: { loading: false, error: null, success: null },
  fetchCPStatus: { loading: false, error: null, success: null },
  fetchSPStatus: { loading: false, error: null, success: null },
  addStatus: { loading: false, error: null, success: null },
  deleteStatus: { loading: false, error: null, success: null },
  UpdateStatus: { loading: false, error: null, success: null },
}


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers :{
        clearSingleProduct:(state)=>{
            state.singleProduct = null
        }
    },
    extraReducers :(builder)=>{
        builder 

        .addCase(fetchSingleProduct.pending, (state) => {
           state.fetchStatus.loading = true;
           state.fetchStatus.error = null;
         })
         .addCase(fetchSingleProduct.fulfilled, (state, action) => {
           state.fetchStatus.loading = false;
           state.singleProduct = action.payload;
         })
         .addCase(fetchSingleProduct.rejected, (state, action) => {
           state.fetchStatus.loading = false;
           state.fetchStatus.error = action.payload;
         })

        .addCase(fetchCategoryProduct.pending, (state) => {
           state.fetchCPStatus.loading = true;
           state.fetchCPStatus.error = null;
         })
         .addCase(fetchCategoryProduct.fulfilled, (state, action) => {
           state.fetchCPStatus.loading = false;
           state.productItems = action.payload;
         })
         .addCase(fetchCategoryProduct.rejected, (state, action) => {
           state.fetchCPStatus.loading = false;
           state.fetchCPStatus.error = action.payload;
         })

        .addCase(addProduct.pending, (state) => {
            state.addStatus.loading = true;
            state.addStatus.error = null;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            const  {prdId , message} = action.payload
            state.addStatus.loading = false;
            state.addStatus.success = message || "Item added to cart!";
            //  state.cartItems.push(prdId);
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.addStatus.loading = false;
            state.addStatus.error = action.payload;
        })
        
        .addCase(deleteProduct.pending, (state) => {
            state.deleteStatus.loading = true;
            state.deleteStatus.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            const {itemId , response} = action.payload 
            state.deleteStatus.loading = false;
        // state.cartItems = state.cartItems.filter(item => item._id !== itemId);
            state.deleteStatus.success = response
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.deleteStatus.loading = false;
            state.deleteStatus.error = action.payload;
        })
         

    }
})

export const {clearSingleProduct} = productSlice.actions

export default productSlice.reducer