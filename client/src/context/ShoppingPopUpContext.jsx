// const { createContext, useContext } = require("react");

import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { useSelector } from "react-redux";


const shoppingPopUpContext = createContext();

export default function ShoppingPopUpProvider({ children }) {
const {isLogin} = useSelector(state=>state?.auth)
  
  
    const popupRef = useRef(null);
  const [product, setProduct] = useState(null);
   
  const showCartPopup = async(productData) => {
    setProduct(productData);
    addtoCart()
    console.log("producttdata context",productData);
    // Trigger the ref click
    popupRef.current?.click?.();

    // let res = await axios.post()
  };

   const addtoCart = async () => {
      if (!isLogin) {
        alert("Please login to add items in cart");
        return;
      }
  
      try {
       console.log("execute add car api");
       
        axios.post(`${import.meta.env.VITE_ADD_CART_PRODUCT}`, {
            productId: product._id,
            quantity: product?.quantity || 1 ,
            color: product?.selectedColor || "#00D1FF",
            size: product?.selectedSize || "M",
          })
          .then((res) => {
            console.log(res.data.message);
          })
          .catch((error) => {
            console.log("Add to cart API error:", error);
          });
      } catch (error) {
        console.log("Add to cart error:", error);
      }
    }; 

  return (
    <>
      <shoppingPopUpContext.Provider value={{showCartPopup, popupRef}}>
        {children}
      </shoppingPopUpContext.Provider>
    </>
  );
}

export const useShoppingPopUp = () => {
  return useContext(shoppingPopUpContext);
};
