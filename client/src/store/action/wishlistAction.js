// import axios  from "@/Utils/axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";


// export const getWishlistData = createAsyncThunk(
//     '/product/wishlist-product' ,
//     async(data,{rejectWithValue,getState,dispatch})=>{
        
//        try {
//           let res = await axios.get('/product/wishlist-product');
          
//              console.log("wlaction",res.data.data.wishlist.reverse());
//              return res.data.data.wishlist.reverse()
//        } catch (error) {
//         console.log(error);
//          return rejectWithValue (error)
//        }
            
//     }

// )
// export const deleteWishlistData = createAsyncThunk(
//     '/product/toggle-wishlist-product' ,
//     async(itemId,{rejectWithValue,getState,dispatch})=>{
//         console.log(itemId);
//        try {
//           let res = await axios.post('/product/toggle-wishlist-product' ,{productId: itemIdi});
//                //  console.log(res);
//                 return res
//        } catch (error) {
//       //   console.log(error);
//          rejectWithValue(error)
//        }
//     }

// )

import axios from "@/Utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchWishlist = createAsyncThunk(
    '/product/wishlist-product',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('/product/wishlist-product');
            console.log("wlaction", res.data.data.wishlist);
            return res.data.data.wishlist.reverse();
        } catch (error) {
            console.log("Get wishlist error:", error);
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch wishlist'
            );
        }
    }
);


export const toggleWishlistData = createAsyncThunk(
    '/product/toggle-wishlist-product',
    async (itemId, { rejectWithValue }) => {
        try {
            console.log("toggle item:", itemId);
            const res = await axios.post('/product/toggle-wishlist-product', {productId: itemId });
            console.log(res.data);
            return { itemId, response: res.data };
        } catch (error) {
            console.log("Delete wishlist error:", error);
            return rejectWithValue(
                error.response?.data || error?.message || 'Failed to delete item'
            );
        }
    }
);

