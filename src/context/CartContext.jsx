import { createContext, useContext, useReducer, useState } from "react";
import CartReducer from '../reducers/CartReducer'

//  productDetails , shoppingcart
const CartContext = createContext()

    const initialSata ={
        cart: [],
        total_items: '',
        total_amount : '',
        shpping_fee : 5000,
    }

const CartProvider = ({children})=>{
   const [state,dispatch] = useReducer(CartReducer,initialSata)

  const   addToCart= (quantity,selectedColor,selectedSize,product)=>{
            dispatch({type : 'ADD_TO_CART' , payload : {quantity,selectedColor,selectedSize,product}})
  }


    return  <CartContext.Provider value={{...state , addToCart}}>
                {children}
             </CartContext.Provider>
}

const useCartContext =()=>{
    return useContext(CartContext)
}

export {CartProvider,useCartContext};