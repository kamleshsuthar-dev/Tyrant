// import { createSlice } from "@reduxjs/toolkit";
// import { addReview, deleteReview, fetchReview } from "../action/reviewAction";

// const initialState = {
//   reviews: [],
//   totalReviews:null,
//   ratingDistributionCount:null,
//   fetchStatus: { loading: false, error: null, success: null },
//   addStatus: { loading: false, error: null, success: null },
// //   updateStatus: { loading: false, error: null, success: null },
//   deleteStatus: { loading: false, error: null, success: null },
// }


// const categorySlice = createSlice({
//     name: "category",
//     initialState,
//     reducers :{
//         clearAddStatus :(state)=>{
//             state.addStatus.success=null
//         }
//     },
//     extraReducers :(builder)=>{
//         builder 

//         .addCase(fetchReview.pending, (state) => {
//            state.fetchStatus.loading = true;
//            state.fetchStatus.error = null;
//          })
//          .addCase(fetchReview.fulfilled, (state, action) => {
//             const {totalReviews,reviews ,ratingDistributionCount} = action.payload
//            state.fetchStatus.loading = false;
//            state.reviews = {...state.reviews , reviews }
//            state.totalReviews= totalReviews
//            state.ratingDistributionCount= ratingDistributionCount
//          })
//          .addCase(fetchReview.rejected, (state, action) => {
//            state.fetchStatus.loading = false;
//            state.fetchStatus.error = action.payload;
//          })

//         .addCase(addReview.pending, (state) => {
//             state.addStatus.loading = true;
//             state.addStatus.error = null;
//         })
//         .addCase(addReview.fulfilled, (state, action) => {
//            const {message} = action.payload
//             state.addStatus.loading = false;
//             state.addStatus.success = message || "Category added successfully!";
           
//         })
//         .addCase(addReview.rejected, (state, action) => {
//             state.addStatus.loading = false;
//             state.addStatus.error = action.payload;
//         })
        
//         .addCase(deleteReview.pending, (state) => {
//             state.deleteStatus.loading = true;
//             state.deleteStatus.error = null;
//         })
//         .addCase(deleteReview.fulfilled, (state, action) => {
//             const {itemId , response} = action.payload 
//             state.deleteStatus.loading = false;
//         state.cartItems = state.cartItems.filter(item => item._id !== itemId);
//             state.deleteStatus.success = response
//         })
//         .addCase(deleteReview.rejected, (state, action) => {
//             state.deleteStatus.loading = false;
//             state.deleteStatus.error = action.payload;
//         })
         

//     }
// })

// export const {clearAddStatus} = categorySlice.actions

// export default categorySlice.reducer



import { createSlice } from "@reduxjs/toolkit";
import { addReview, deleteReview, fetchReviews } from "../action/reviewAction";

const initialState = {
  reviews: [],
  ratingStats: {
    average: 0,
    totalReviews: 0,
    distribution: [0, 0, 0, 0, 0],
  },
  currPage: 1,
  reviewMessage: null,
  fetchStatus: { loading: false, error: null, success: null },
  addStatus: { loading: false, error: null, success: null },
  deleteStatus: { loading: false, error: null, success: null },
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearAddStatus: (state) => {
      state.addStatus.success = null;
      state.addStatus.error = null;
    },
    clearDeleteStatus: (state) => {
      state.deleteStatus.success = null;
      state.deleteStatus.error = null;
    },
    clearReviewMessage: (state) => {
      state.reviewMessage = null;
    },
    resetReviews: (state) => {
      state.reviews = [];
      state.currPage = 1;
      state.reviewMessage = null;
    },
    setRatingStats: (state, action) => {
      state.ratingStats = { ...state.ratingStats, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.fetchStatus.loading = true;
        state.fetchStatus.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        const { reviews, totalReviews, ratingDistributionCount, page } = action.payload;
        
        state.fetchStatus.loading = false;
        state.fetchStatus.success = "Reviews fetched successfully";
        
        // If it's page 1, replace reviews; otherwise, append
        if (page === 1) {
          state.reviews = reviews;
        } else {
          state.reviews = [...state.reviews, ...reviews];
        }
        
        state.currPage = page;
        state.ratingStats.totalReviews = totalReviews;
        state.ratingStats.distribution = Object.values(ratingDistributionCount || {}).reverse() || [0, 0, 0, 0, 0];
        
        // Calculate average rating
        const total = state.ratingStats.distribution.reduce((sum, count, index) => sum + count * (5 - index), 0);
        state.ratingStats.average = totalReviews > 0 ? (total / totalReviews).toFixed(1) : 0;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.fetchStatus.loading = false;
        state.fetchStatus.error = action.payload;
      })

      // Add Review
      .addCase(addReview.pending, (state) => {
        state.addStatus.loading = true;
        state.addStatus.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const { message } = action.payload;
        state.addStatus.loading = false;
        state.addStatus.success = message;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.addStatus.loading = false;
        state.addStatus.error = action.payload;
      })

      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.deleteStatus.loading = true;
        state.deleteStatus.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        const { reviewId, message } = action.payload;
        state.deleteStatus.loading = false;
        state.deleteStatus.success = message;
        
        // Remove the deleted review from the state
        state.reviews = state.reviews.filter(review => review._id !== reviewId);
        
        // Update total reviews count
        if (state.ratingStats.totalReviews > 0) {
          state.ratingStats.totalReviews -= 1;
        }
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.deleteStatus.loading = false;
        state.deleteStatus.error = action.payload;
      });
  },
});

export const {
  clearAddStatus,
  clearDeleteStatus,
  clearReviewMessage,
  resetReviews,
  setRatingStats,
} = reviewSlice.actions;

export default reviewSlice.reducer;