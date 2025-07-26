import { useState, useEffect, useCallback } from "react";
import axios from "@/Utils/axios.js";
import { useDispatch } from "react-redux";
import { fetchCartProduct } from "@/store/action/shoppingCartAction";

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState({});
  const dispatch = useDispatch()

 const fetchCartItems = async () => {
    try {
      let res = await axios.get(`/product/cart-product`);
      console.log("shop ", res.data);

      const initialCheckedState = res.data.reduce((acc, item) => {
        acc[item._id] = true;
        return acc;
      }, {});

      setCheckedItems(initialCheckedState);
      setCartItems(res.data.reverse());
      setIsLoading(false);
    } catch (error) {
      console.log("fetch cart error", error);
      setIsLoading(false);
    }
  };


// const fetchCart = async()=>{
//     try {
//      await dispatch(fetchCartProduct)
//     } catch (error) {
//       console.log("errror in fetch cart product",error);
//     }
// }








  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const updateQuantity = useCallback(async (cartItem, newQuantity) => {
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === cartItem._id ? { ...item, quantity: newQuantity } : item,
      ),
    );

    try {
      let res = await axios.put(`${import.meta.env.VITE_UPDATE_CART_PRODUCT_QUANTITY}/${cartItem._id}`,{ quantity: newQuantity },);
      console.log(res);
    } catch (error) {
      console.log("update quantity error", error);
      setCartItems((prevCartItems) =>prevCartItems.map((item) =>
                                                        item._id === cartItem._id
                                                          ? { ...item, quantity: cartItem.quantity }
                                                          : item,
                                                      ),
      );
    }
  }, []);

  const deleteCartItem = async (productCartID) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_DELETE_CART_PRODUCT}/${productCartID}`,
      );
      console.log(res);
      setCartItems((prevProducts) =>prevProducts.filter((product) => product._id !== productCartID));
    } catch (error) {
      console.log("delete cart btn error :", error);
    }
  };

  const getCheckedItemIds = () => {
    return cartItems
      .filter((item) => checkedItems[item._id] || false)
      .map((item) => item._id);
  };

 

  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cartItems,
    isLoading,
    checkedItems,
    handleCheckboxChange,
    updateQuantity,
    deleteCartItem,
    getCheckedItemIds,
  };
}