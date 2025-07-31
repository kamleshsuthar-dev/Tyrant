import axios from '@/Utils/axios'
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchAddress = createAsyncThunk(
  '/user/get-address',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/user/get-address');
      console.log("get address:", res.data); // ✅ correct usage
      return res.data
    } catch (error) {
      console.log("get address error:", error);

      return rejectWithValue (
           error?.response?.data?.error ||error?.response?.data?.message || error?.message || "something went wrong try again"
      )
    }
  }
);


export const addAddress = createAsyncThunk(
  '/user/add-address',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('/user/add-address', data);
      
            console.log(res.data);
        return {message : res.data.message}
    } catch (error) {
      console.log("add review error:", error);
      return rejectWithValue(
         error.response.data.error ||error.response.data.message || error.message || "something went wrong try again"
      );
    }
  }
);
export const updateAddress = createAsyncThunk(
  '/user/edit-address',
  async ({ AddressId,data}, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/user/edit-address/${AddressId}`, data);
      
            console.log(res.data);
        return res.data
    } catch (error) {
      console.log("add review error:", error);
      return rejectWithValue(
         error.response.data.error ||error.response.data.message || error.message || "something went wrong try again"
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  '/user/delete-address',
  async (addressId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/user/delete-address/${addressId}`);
      
            console.log("delete address",res.data);
            return { addressId , deleteMessage:res.data.message}
    } catch (error) {
      console.log("delete review error:", error);
      return rejectWithValue(
          error.response.data.error ||error.response.data.message || error.message || "something went wrong try again"
      );
    }
  }
);