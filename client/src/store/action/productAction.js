import axios from '@/Utils/axios'
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchProduct = createAsyncThunk(
  '/product/product',
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


export const fetchCategoryProduct = createAsyncThunk(
  '/product/product-by-category',
  async ( cId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/product/product-by-category?cId=${cId}`);
      console.log("fetch product by category:", res.data); // ✅ correct usage
      return res.data.products.reverse();
    } catch (error) {
      console.log("fetch product by category: error:", error);

      return rejectWithValue (
           error.response.data.message || error.message || "something went wrong try again"
      )
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  '/product/single-product',
  async ( pId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/product/single-product?pId=${pId}`);
      console.log("fetch single product :", res.data); // ✅ correct usage
      return res.data.product
    } catch (error) {
      console.log("fetch single product : error:", error);

      return rejectWithValue (
           error.response.data.message || error.message || "something went wrong try again"
      )
    }
  }
);









export const addProduct = createAsyncThunk(
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

export const deleteProduct = createAsyncThunk(
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