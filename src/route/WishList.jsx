"use client";
import { useLocation } from "react-router-dom";
import React, { useState,useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import axios from "axios";
import { useGoogleAuthContext } from "@/context/GoogleAuth";

export default function WishList() {
    const {googleData} =useGoogleAuthContext()
  // const location = useLocation();
  // const product = location.state?.product;
  // console.log(product);

  // const {cart} = useCartContext()
  // console.log("cart" , cart);
 
  

  const [cartItems, setCartItems] = useState([ ]);
  
  // useEffect(() => {
  //   if (cart && cart.length > 0) {
  //     const updatedItems = cart.map(product => ({
  //       id: product.id,
  //       name: product.name,
  //       color: product.selectedColor, 
  //       size: product.selectedSize,
  //       status: "In Stock",
  //       price: product.price,
  //       quantity: product.quantity,
  //       image: product.image
  //     }));
  //     setCartItems(updatedItems);
  //   }
  // }, [cart]); 

//   useEffect(()=>{
//  if (googleData.isLoginUser==true) {
//      ;(async()=>{
//       try {
//         let res = await axios.get(`${import.meta.env.VITE_PRODUCT_WISHLIST}`,{withCredentials:true})
//             console.log(res);
//             console.log(res.data);
//       } catch (error) {
//        console.log(error);
       
//       }
           
//      })()
//  }
//   },[])

useEffect(()=>{
  (async()=>{
   try {
     let res = await axios.get(`${import.meta.env.VITE_PRODUCT_WISHLIST}`,{withCredentials: true})
             console.log("whislist true",res);
            } catch (error) {
     console.log("whislist false",error);
    
   }
            
  })()
},[])

  const updateQuantity = (id, quantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">


      {/* Shopping Cart */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium mb-8 bg-gray-800 text-white py-3 px-4 flex justify-center">
           WishList 
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 mb-4">
              <div className="col-span-2">PRODUCT</div>
              <div className="text-center">QUANTITY</div>
              <div className="text-right">TOTAL</div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 gap-4 py-4 border-t items-center"
              >
                <div className="col-span-2 flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="text-sm">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">Color: {item.color}</p>
                    <p className="text-green-500">{item.status}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number.parseInt(e.target.value))
                    }
                    min="1"
                    className="w-16 text-center border rounded py-1"
                  />
                </div>
                <div className="text-right">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
      
          </div>

          {/* Order Summary */}
          {/* <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">CARD TOTAL</h2>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-4">
                CHECKOUT
              </button>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="w-full border rounded py-2 px-3"
                />
                <button className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded">
                  APPLY COUPON
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

