import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/Utils/axios";


export const fetchCartProduct = createAsyncThunk(
  '/product/cart-product',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/product/cart-product');
      console.log("shopping cart item:", res.data); // ✅ correct usage
      return res.data.reverse();
    } catch (error) {
      console.log("shopping cart item error:", error);

      return rejectWithValue (
           error.response.data.message || error.message || "something went wrong try again"
      )
    }
  }
);

export const addToCart = createAsyncThunk(
    '/product/add-cart-product',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post('/product/add-cart-product',data);
            // console.log(res.data);
            
            return { message: res.data.message, prdId: res.data.updatedItem.productId };
        } catch (error) {
            console.log("shopping cart item error:", error);
            return rejectWithValue(
                error?.response?.data?.message || error.message || 'Failed to add cart product'
            );
        }
    }
);

export const deleteToCart = createAsyncThunk(
    '/product/delette-cart-product',
    async (itemId, { rejectWithValue }) => {
        try {
            console.log("shopping cart item:", itemId);
            const res = await axios.delete(`/product/delete-cart-product/${itemId}`);
            // console.log(res.data);
            
            return { itemId, response: res.data.message };
        } catch (error) {
            console.log("shopping cart item error:", error);
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to delete item'
            );
        }
    }
);

export const updateCartQuantity = createAsyncThunk(
    '/product/cartitem-quantity-update',
    async ({cartId,newQuantity}, { rejectWithValue }) => {
        try {
            console.log("shopping cart item:", cartId , newQuantity);
            const res = await axios.put(`/product/cartitem-quantity-update/${cartId}` , {quantity:newQuantity});
            console.log(res.data);
            
            return { cartId, response: res.data.message , quantity : newQuantity };
        } catch (error) {
            console.log("shopping cart item error:", error);
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to delete item'
            );
        }
    }
);


