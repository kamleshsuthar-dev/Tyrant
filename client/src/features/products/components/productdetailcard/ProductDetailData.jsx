import { useShoppingPopUp } from "@/context/ShoppingPopUpContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";
import Color from "./Color";
import Data from "./Data";
import Quantity from "./Quantity";
import Size from "./Size";
import { toggleWishlistData } from "@/store/action/wishlistAction";
import { selectWishlistItems } from "@/store/reducer/wishlistSlice";
import { addToCart, fetchCartProduct } from "@/store/action/shoppingCartAction";

  const colors = ["#00D1FF", "#15F301", "#FDD33C", "#E700C2"];
  const sizes = ["XS", "S", "M", "L", "XL"];  

function ProductDetailData({ product }) {
  const { isLogin } = useSelector((state) => state?.auth);
  const dispatch =useDispatch()
  const navigate = useNavigate();
  
  const { showCartPopup } = useShoppingPopUp();
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [wishlist, setWishlist] = useState(product?.isInWishlist);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState("M");


  const addToWishList = async()=>{
       if (!isLogin) {
      alert("Please login first to add items to wishlist");
      return;
    }

    if (!product?._id) {
      console.error("Product ID is missing");
      return;
    }
    try {
      await dispatch(toggleWishlistData(product._id)).unwrap(); 
          setWishlist(prev => !prev)
    } catch (error) {
      console.log(error);
    }
  }
  const addtoCart = async (e) => {
    let data = {
      productId : product._id,
      quantity : quantity,
      color: selectedColor,
      size : selectedSize,
    }
    
    console.log("abcdefghij",data);
  
    
    dispatch(addToCart(data)).then(()=>{
      dispatch(fetchCartProduct())
    })
    showCartPopup(product);
  };

  const checkOut = () => {
    navigate("/checkout");
  };

  return (
    <div className="space-y-[18px]">
      <Data 
      product={product}
        addToWishList={addToWishList}
        wishlistLoading={wishlistLoading}
        wishlist={wishlist}
      />
      <Size
      
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        sizes={sizes}
      />
      <Color colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      <Quantity quantity={quantity} setQuantity={setQuantity} />
      <ActionButton addtoCart={addtoCart} checkOut={checkOut} />
    </div>
  );
}

export default ProductDetailData;