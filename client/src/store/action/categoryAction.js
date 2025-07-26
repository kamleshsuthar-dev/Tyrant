import axios from '@/Utils/axios'
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchCategory = createAsyncThunk(
  '/category/all-category',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/category/all-category');
      console.log("category fetch ", res.data.Categories); // ✅ correct usage
      return res.data.Categories.reverse();
    } catch (error) {
      console.log("category item error:", error);

      return rejectWithValue (
           error.response.data.message || error.message || "something went wrong try again"
      )
    }
  }
);


export const addCategory = createAsyncThunk(
    '/category/add-category',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post('/category/add-category',data);
            console.log( "add category ",res.data);
            
              return { message:res.data.success };
        } catch (error) {
            console.log("shopping cart item error:", error);
            return rejectWithValue(
                error?.response?.data?.message || error.message || 'Failed to add cart product'
            );
        }
    }
);

export const updateCategory = createAsyncThunk(
    '/category/edit-category',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post('/category/edit-category',data);
            console.log( "add category ",res.data);
            
            // return { message: res.data.message, prdId: res.data.updatedItem.productId };
        } catch (error) {
            console.log("shopping cart item error:", error);
            return rejectWithValue(
                error?.response?.data?.message || error.message || 'Failed to add cart product'
            );
        }
    }
);

export const deleteCategory = createAsyncThunk(
    '/category/delete-category',
    async (itemId, { rejectWithValue }) => {
        try {
            console.log("shopping cart item:", itemId);
            const res = await axios.delete(`/category/delelte-category/${itemId}`);
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