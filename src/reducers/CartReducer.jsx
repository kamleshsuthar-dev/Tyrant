import React from 'react'

function CartReducer(state,action) {

    if(action.type ==="ADD_TO_CART"){
        let{quantity,selectedColor,selectedSize,product} = action.payload ;
        console.log("1234",product, quantity);
        
        let cartProdct ;

        cartProdct = {
               id : product.id+selectedColor,
               name: product.pName,
                price: product.pPrice,
                image : product.pImg,
                quantity,
                selectedColor,
                selectedSize,

        }

        return {
            ...state,
            cart: [...state.cart , cartProdct],
        }
    }

  return state 
}

export default CartReducer
