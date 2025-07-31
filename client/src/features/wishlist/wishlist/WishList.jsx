"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import WishlistSkeleton from "../components/WishlistSkeleton";
import WishlistCard from "../components/WishlistCard";
import { fetchWishlist, toggleWishlistData } from "@/store/action/wishlistAction";
import {  selectWishlistItems, selectWishlistLoading, selectWishlistError, clearError, selectToggleLoading, selectToggleError,} from "@/store/reducer/wishlistSlice";

export default function WishList() {
    const dispatch = useDispatch();
   
    const { isLogin, userData } = useSelector(state => state?.auth);
    const [deletingId, setDeletingId] = useState(null);


    const wishlistItems = useSelector(selectWishlistItems);
    const isLoading = useSelector(selectWishlistLoading);
    const error = useSelector(selectWishlistError);
    const toggleLoading = useSelector(selectToggleLoading);
    const toggleError = useSelector(selectToggleError);
    
    const userName = userData?.name || " ";

    useEffect(() => {
        if (isLogin !== undefined) {
            if (isLogin) {
                dispatch(fetchWishlist());
            } else {
                console.log("User not authenticated");
            }
        }
    }, [isLogin, dispatch]);


    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const deleteBtn = async (productId) => {
        console.log("delete", productId);
        try {
          setDeletingId(productId)
            await dispatch(toggleWishlistData(productId)).unwrap();
            console.log("Item deleted successfully");
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const addToCart = async (wishlistID, wishlist) => {
        console.log("addtocart wishlist", wishlistID, wishlist);

        try {
            const res = await axios.post(`${import.meta.env.VITE_ADD_CART_PRODUCT}`, {
                productId: wishlistID,
                quantity: 1,
                color: wishlist,
                // Note: selectedSize is not defined in your component, you might need to add this
                // size: selectedSize,
            });
            console.log(res.data.message);
        } catch (error) {
            console.log("add cart api error", error);
        }
    };

   
    if (isLogin === false) {
        return (
            <div className="main-container mx-auto max-w-6xl px-4 py-8">
                <div className="flex h-40 items-center justify-center">
                    <h3 className="text-3xl text-center">
                        Please login to view your wishlist
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div className="main-container mx-auto max-w-6xl px-4 py-8">
            <div className="breadcrumbs mb-6 text-sm">
                <span className="text-muted-foreground">MY ACCOUNT &gt; WISHLIST</span>
            </div>

            <div className="mb-8">
                <h1 className="text-2xl font-semibold">WELCOME TO,</h1>
                <h2 className="ml-36 text-3xl font-bold">{userName}</h2>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    Error loading wishlist: {error}
                    <button 
                        onClick={() => dispatch(clearError())}
                        className="ml-2 text-sm underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {toggleError && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    Error deleting item: {toggleError}
                    <button 
                        onClick={() => dispatch(clearError())}
                        className="ml-2 text-sm underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <div className="space-y-6 overflow-y-auto">
                {isLoading ? (
                    <WishlistSkeleton />
                ) : wishlistItems.length < 1 ? (
                    <h1 className="flex h-40 flex-grow items-center justify-center rounded-xl border text-center text-4xl">
                        No items in Wishlist
                    </h1>
                ) : (
                    wishlistItems.map((wishlist) => (
                        <WishlistCard 
                            key={wishlist._id} 
                            wishlist={wishlist} 
                            deleteBtn={deleteBtn} 
                            addToCart={addToCart}
                            toggleLoading={deletingId === wishlist._id }
                        />
                    ))
                )}
            </div>
        </div>
    );
}



