// import axios from '@/Utils/axios'
// import { createAsyncThunk } from '@reduxjs/toolkit';


// export const fetchReview = createAsyncThunk(
//   '/product/single-product',
//   async ({page, pId ,sortValue,filterValue}, { rejectWithValue }) => {
//     try {
//        let res = await axios.get(`/product/single-product/${pId}/reviews`,
//         {
//           params: {
//             page,
//             limit: 5,
//             sort: sortValue,
//             rating: filterValue,
//           },
//         },
//       );
//       console.log("review fetch ", res.data); // ✅ correct usage
//     //   return res.data.Categories.reverse();
//     } catch (error) {
//       console.log("review fetch error:", error);

//       return rejectWithValue (
//            error.response.data.message || error.message || "something went wrong try again"
//       )
//     }
//   }
// );


// export const addReview = createAsyncThunk(
//     '/product/add-product',
//     async (data, { rejectWithValue }) => {
//         try {
//             const res = await axios.post('/product/add-product',data);
//             console.log( "add category ",res.data);
            
//               return { message:res.data.success };
//         } catch (error) {
//             console.log("shopping cart item error:", error);
//             return rejectWithValue(
//                 error?.response?.data?.message || error.message || 'Failed to add cart product'
//             );
//         }
//     }
// );


// export const deleteReview = createAsyncThunk(
//     '/product/delete-product',
//     async (reviewId, { rejectWithValue }) => {
//         try {
//             console.log("shopping cart item:", itemId);
//             const res = await axios.delete(`/product/delete-product/${reviewId}`);
//             // console.log(res.data);
            
//             return { itemId, response: res.data.message };
//         } catch (error) {
//             console.log("shopping cart item error:", error);
//             return rejectWithValue(
//                 error.response?.data?.message || error.message || 'Failed to delete item'
//             );
//         }
//     }
// );



import axios from '@/Utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async ({ page, pId, sortValue, filterValue }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/product/single-product/${pId}/reviews`, {
        params: {
          page,
          limit: 4,
          sort: sortValue,
          rating: filterValue,
        },
      });
      
      return {
        reviews: res.data.reviews,
        totalReviews: res.data.totalReviews,
        ratingDistributionCount: res.data.ratingDistributionCount,
        page,
      };
    } catch (error) {
      console.log("review fetch error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch reviews"
      );
    }
  }
);

export const addReview = createAsyncThunk(
  '/product/add-review',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('/product/add-review', data);
      
      return {
        message: res.data.success || "Review added successfully",
        productId : data.productId,
      };
    } catch (error) {
      console.log("add review error:", error);
      return rejectWithValue(
        error?.response?.data?.error || error.message || 'Failed to add review'
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  '/product/delete-review',
  async ({ reviewId, pId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/product/delete-review/${reviewId}`);
      
      return {
        reviewId,
        productId: pId,
        message: res.data.message || "Review deleted successfully",
      };
    } catch (error) {
      console.log("delete review error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete review'
      );
    }
  }
);