"use client";
import { useLocation } from "react-router-dom";
import React, { useState,useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import axios from "axios";
import { useGoogleAuthContext } from "@/context/GoogleAuth";
import { Delete, Star } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"

import Login from "@/component/Auth/Login/Login";

const SkeletonCartItem = () => {
  return (
    <div className="flex items-center p-4 border-b animate-pulse">
      <div className="bg-gray-200 h-20 w-20 mr-4"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="mx-4">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};


export default function WishList() {

    const [wishlistItems,setWishlistItems] = useState([])
    const {isLoginUser,userDetails} = useGoogleAuthContext()
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(true)
    // const [username, setUsername] = useState(userDetails.name)
    // console.log(userDetails?.name);
    const userName =  userDetails?.name || " "

useEffect(()=>{
  const wishlistfun = async()=>{

      if (isLoginUser === true) {
        try {
          let res = await axios.get(`${import.meta.env.VITE_PRODUCT_WISHLIST}`,{withCredentials: true})
                  console.log("whislist true",res.data.data.wishlist);
                    setWishlistItems(res.data.data.wishlist.reverse())
                    setIsLoading(false)
          } catch (error) {
              console.log("whislist false",error);    
              setIsLoading(false)       
        }
      } else {
        setILoading(false)
      document.querySelector('.main-container').innerHTML =  `<h3 class = 'text-3xl text-center pt-[170px] pb-0'>
                                                        User Not Authenticate , Login kar Lowde
                                                      </h3>`;    
      }
  }
  if(isLoginUser !== undefined){
    wishlistfun()
  }
},[isLoginUser])

const deleteBtn = async(productId)=>{
  console.log("delete" , productId);
  try {
    await axios.post(`${import.meta.env.VITE_PRODUCT_TOGGLE_WISHLIST}`, { productId }, { withCredentials: true });
    setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
   
  } catch (error) {
    console.log("wishlist delete error", error);
  }
}

const productDetailFunction = (wishlistID,wishlistItems)=>{
  // console.log("wishlistitems",wishlistItems);
  console.log(wishlistID);
      navigate(`/productdetails/${wishlistID}`)
      // navigate(`/productdetails/${wishlistID}`);   
}
 
const addtoCart = (wishlistID,wishlist) => {
  console.log("addtocart wishlist" , wishlistID , wishlist);
  
  const cartfun = async () => {
       try {
         let res = await axios.post(`${import.meta.env.VITE_ADD_CART_PRODUCT}`, {
           productId: wishlist._id,
           quantity: 1,
           color: wishlist,
           size: selectedSize,
         });
 
         console.log(res.data.message);
       } catch (error) {
         console.log("add cart api error", error);
       }
   }
   popUp.current.click();
   
     cartfun()
 };

  return (
    <div className="main-container mx-auto px-4 py-8">
    <div className="text-sm breadcrumbs mb-6">
      <span className="text-muted-foreground">MY ACCOUNT &gt; WISHLIST</span>
    </div>

    <div className="mb-8">
      <h1 className="text-2xl font-semibold">WELCOME TO,</h1>
      <h2 className="text-3xl font-bold ml-36">{userName}</h2>
    </div>

    <div className="space-y-6 overflow-y-auto ">
      {isLoading=== true ? (
        <>
        <SkeletonCartItem/>
        <SkeletonCartItem/>
        <SkeletonCartItem/>
        </>
      ):
   (   wishlistItems.length<1 ? (
          <h1 className=" text-4xl text-center flex-grow h-40 border rounded-xl flex justify-center items-center">No items in Wishlist </h1>
      ) : (
         wishlistItems.map((wishlist) => (
        <div key={wishlist._id}  className="flex items-center gap-6 border rounded-xl p-4">

          <div className="shrink-0" onClick={()=>productDetailFunction(wishlist._id,wishlistItems)}>
            <img src={wishlist.pImages[0].URL} alt={wishlist.pName} width={100} height={100} className="rounded-md" />
          </div>

          <div className="flex-grow" onClick={()=>productDetailFunction(wishlist._id,wishlistItems)}>
            <h3 className="font-medium mb-2">{wishlist.pName}</h3>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < wishlist.pRatingsReviews ? "fill-primary text-primary bg-black" : "fill-muted text-muted-foreground bg-red-500"
                  }`}
                />
                ))}
            </div>
            <p className="text-sm text-muted-foreground">Status: {wishlist.pStatus}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bold">Rs.{(wishlist.pPrice * (100 - wishlist.pOffer)) / 100}</span>
              <span className="text-sm text-muted-foreground line-through">Rs.{wishlist.pPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={()=>productDetailFunction(wishlist._id,wishlistItems)}>VIEW PRODUCT</Button>
            <Button onClick={()=>deleteBtn(wishlist._id)} variant="destructive" >DELETE</Button>
          </div>
        </div>
                ))))
      }
    </div>
  </div>
  );
}

