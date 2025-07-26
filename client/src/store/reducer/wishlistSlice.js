import { createSlice } from "@reduxjs/toolkit";
import { fetchWishlist, toggleWishlistData } from "../action/wishlistAction";

const initialState = {
    items: [],
    loading: false,
    error: null,
    toggleLoading: false,
    toggleError: null
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        // Synchronous reducers for immediate UI updates
        clearError: (state) => {
            state.error = null;
            state.deleteError = null;
        },
        clearWishlist: (state) => {
            state.items = [];
            state.error = null;
            state.toggleError = null;
        },
        // Optimistic update for delete (optional)
        optimisticDelete: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Wishlist Cases
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = action.payload || [];
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.items = [];
            })
            
            // Delete Wishlist Cases
            .addCase(toggleWishlistData.pending, (state) => {
                state.toggleLoading = true;
                state.toggleError = null;
            })
            .addCase(toggleWishlistData.fulfilled, (state, action) => {
                state.toggleLoading = false;
                state.toggleError = null;
                if (!Array.isArray(state.items)) {
                    state.items = [];
                }
                const {itemId,response}= action.payload

                if(response.message === "Product removed from wishlist"){
                    state.items = state?.items?.filter( item => item._id !== itemId);
                    
                }else if(response.message === "Product added to wishlist"){
                    // state.items = itemId
                    const existingIndex = state.items.findIndex(item => item._id === itemId);
                      if (existingIndex === -1) {
                        state.items.unshift(itemId);
                      }
                }

            })
            .addCase(toggleWishlistData.rejected, (state, action) => {
                state.toggleLoading = false;
                state.toggleError = action.payload.error;
            });
    }
});

// Export actions
export const { clearError, clearWishlist, optimisticDelete } = wishlistSlice.actions;

// Export selectors
export const selectWishlist = (state) => state.wishlist;
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistLoading = (state) => state.wishlist.loading;
export const selectWishlistError = (state) => state.wishlist.error;
export const selectToggleLoading = (state) => state.wishlist.toggleLoading;
export const selectToggleError = (state) => state.wishlist.toggleError;

// Export reducer
export default wishlistSlice.reducer;