import { createSlice } from "@reduxjs/toolkit";
import { fetchCartProduct,addToCart ,deleteToCart, updateCartQuantity} from "../action/shoppingCartAction";


const initialState = {
  cartItems: [],
  fetchStatus: { loading: false, error: null, success: null },
  addStatus: { loading: false, error: null, success: null },
  deleteStatus: { loading: false, error: null, success: null },
  quantityUpdateStatus: { loading: false, error: null, success: null },
}

const shoppingCartSlice = createSlice({
    name :"shoppingCart" ,
    initialState ,
    reducers:{
        clearCartProduct : (state,action)=>{
          state.cartItems = [] 
        }
    },
    extraReducers:(builder)=>{
   builder

  .addCase(fetchCartProduct.pending, (state) => {
    state.fetchStatus.loading = true;
    state.fetchStatus.error = null;
  })
  .addCase(fetchCartProduct.fulfilled, (state, action) => {
    state.fetchStatus.loading = false;
    state.cartItems = action.payload;
  })
  .addCase(fetchCartProduct.rejected, (state, action) => {
    state.fetchStatus.loading = false;
    state.fetchStatus.error = action.payload;
  })

  .addCase(addToCart.pending, (state) => {
    state.addStatus.loading = true;
    state.addStatus.error = null;
  })
  .addCase(addToCart.fulfilled, (state, action) => {
    const  {prdId , message} = action.payload
     state.addStatus.loading = false;
     state.addStatus.success = message || "Item added to cart!";
    //  state.cartItems.push(prdId);
  })
  .addCase(addToCart.rejected, (state, action) => {
    state.addStatus.loading = false;
    state.addStatus.error = action.payload;
  })

  .addCase(deleteToCart.pending, (state) => {
    state.deleteStatus.loading = true;
    state.deleteStatus.error = null;
  })
  .addCase(deleteToCart.fulfilled, (state, action) => {
    const {itemId , response} = action.payload 
    state.deleteStatus.loading = false;
   state.cartItems = state.cartItems.filter(item => item._id !== itemId);
    state.deleteStatus.success = response
  })
  .addCase(deleteToCart.rejected, (state, action) => {
    state.deleteStatus.loading = false;
    state.deleteStatus.error = action.payload;
  })

  .addCase(updateCartQuantity.pending, (state) => {
    state.quantityUpdateStatus.loading = true;
    state.quantityUpdateStatus.error = null;
  })
  .addCase(updateCartQuantity.fulfilled, (state, action) => {
    const {cartId , response , quantity} = action.payload 
    state.quantityUpdateStatus.loading = false;
   state.cartItems = state.cartItems.map(item => item._id == cartId ? {...item , quantity : quantity  } : item);
    state.quantityUpdateStatus.success = response
  })
  .addCase(updateCartQuantity.rejected, (state, action) => {
    state.quantityUpdateStatus.loading = false;
    state.quantityUpdateStatus.error = action.payload;
  })

}

})

export  const {clearCartProduct} = shoppingCartSlice.actions

export default shoppingCartSlice.reducer