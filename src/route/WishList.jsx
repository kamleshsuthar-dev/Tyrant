"use client";
import { useLocation } from "react-router-dom";
import React, { useState,useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import axios from "axios";
import { useGoogleAuthContext } from "@/context/GoogleAuth";
import { Delete, Star } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
export default function WishList() {
    const {googleData} =useGoogleAuthContext()
    const [wishlistItems,setWishlistItems] = useState([])
    const navigate = useNavigate()
  // const wishlistItems = [
  //   {
  //     id: 1,
  //     name: "Adaa Jaipur Comfort Floral Printed Casual Shirt",
  //     rating: 4,
  //     status: "In Stock",
  //     price: 1299.0,
  //     originalPrice: 1500.0,
  //   },
  //   {
  //     id: 2,
  //     name: "Adaa Jaipur Comfort Floral Printed Casual Shirt",
  //     rating: 4,
  //     status: "In Stock",
  //     price: 1299.0,
  //     originalPrice: 1500.0,
  //   },
  //   {
  //     id: 3,
  //     name: "Adaa Jaipur Comfort Floral Printed Casual Shirt",
  //     rating: 4,
  //     status: "In Stock",
  //     price: 1299.0,
  //     originalPrice: 1500.0,
  //   },
  // ]

  


useEffect(()=>{
  (async()=>{
   try {
     let res = await axios.get(`${import.meta.env.VITE_PRODUCT_WISHLIST}`,{withCredentials: true})
             console.log("whislist true",res.data.data.wishlist);
              setWishlistItems(res.data.data.wishlist)
            } catch (error) {
     console.log("whislist false",error);
              
   }
            
  })()
},[])

const deleteBtn = async(productId)=>{
  console.log("delete" , productId);
  try {
    await axios.post(`${import.meta.env.VITE_PRODUCT_TOGGLE_WISHLIST}`, { productId }, { withCredentials: true });
    setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
   
  } catch (error) {
    console.log("wishlist delete error", error);
  }
}

const productDetailFunction = (e,wishlistItems)=>{
       e.preventDefault();
      navigate('/productdetails',{state:{wishlistItems}})
           
}
 

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="text-sm breadcrumbs mb-6">
      <span className="text-muted-foreground">MY ACCOUNT &gt; WISHLIST</span>
    </div>

    <div className="mb-8">
      <h1 className="text-2xl font-semibold">WELCOME TO,</h1>
      <h2 className="text-3xl font-bold">WISHLIST</h2>
    </div>

    <div className="space-y-6">
      {wishlistItems.map((wishlist) => (
        <div key={wishlist._id} onClick={productDetailFunction} className="flex items-center gap-6 border rounded-lg p-4">
          <div className="shrink-0">
            <img src={wishlist.pImages[0].URL} alt={wishlist.pName} width={100} height={100} className="rounded-md" />
          </div>

          <div className="flex-grow">
            <h3 className="font-medium mb-2">{wishlist.pName}</h3>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < wishlist.pRatingsReviews ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Status: {wishlist.pStatus}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bold">Rs.{wishlist.pPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">Rs.{wishlist.pPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="bg-green-500 hover:bg-green-600 text-white">ADD TO CART</Button>
            <Button onClick={()=>deleteBtn(wishlist._id)} variant="destructive" >DELETE</Button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

