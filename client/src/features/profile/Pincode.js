import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for fetching pincode data
export const fetchPincodeData = createAsyncThunk(
  'pincode/fetchPincodeData',
  async (pincode, { rejectWithValue }) => {
    try {
      console.log('Fetching data for pincode:', pincode);
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = response.data;
      console.log('API response:', data);
      
      if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
        const location = data[0].PostOffice[0];
        console.log('Location found:', location);
        return {
          city: location.District || "",
          state: location.State || "",
          pincode: pincode
        };
      } else if (data[0].Status === "Error") {
        console.log('API error:', data[0].Message);
        return rejectWithValue(data[0].Message);
      }
      return rejectWithValue("Unknown error");
    } catch (error) {
      console.error('Exception in API call:', error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  pincode: '',
  city: '',
  state: '',
  loading: false,
  error: null
};

export const pincodeSlice = createSlice({
  name: 'pincode',
  initialState,
  reducers: {
    setPincode: (state, action) => {
      state.pincode = action.payload;
      if (action.payload.length !== 6) {
        state.city = '';
        state.state = '';
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPincodeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPincodeData.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;
        state.state = action.payload.state;
      })
      .addCase(fetchPincodeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.city = '';
        state.state = '';
      });
  }
});

export const { setPincode } = pincodeSlice.actions;

export default pincodeSlice.reducer;