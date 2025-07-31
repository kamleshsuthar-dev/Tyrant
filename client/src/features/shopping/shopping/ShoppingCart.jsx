import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartList } from "../components/CartList";
import { MobileCartList } from "../components/MobileCartList";
import { OrderSummary } from "../components/OrderSummary";
import { useEffect, useState } from "react";
import { deleteToCart, fetchCartProduct, updateCartQuantity } from "@/store/action/shoppingCartAction";

export default function ShoppingCart() {
  const navigate = useNavigate();
   const [checkedItems, setCheckedItems] = useState({});
  const { isLogin } = useSelector(state => state?.auth);
  const dispatch = useDispatch()

  const {cartItems ,
     fetchStatus: {error: fetchError , loading: isLoading}  }= useSelector(state=> state?.shoppingCart)
  console.log(cartItems , fetchError);
  

useEffect(() => {
    dispatch(fetchCartProduct());
}, []);

const updateQuantity = (cartItem, newQuantity) => {
  console.log(cartItem._id, newQuantity);
  dispatch(updateCartQuantity({ cartId: cartItem._id, newQuantity }));
};


const deleteCartItem = async(productCartID)=>{
    console.log(productCartID);
   await dispatch(deleteToCart(productCartID))

}


 const handleCheckboxChange = (itemId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const getCheckedItemIds = () => {
    return cartItems
      .filter((item) => checkedItems[item._id] || false)
      .map((item) => item._id);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const isChecked = checkedItems[item._id] || false;
    if (isChecked) {
      const discountedPrice =
        (item.productId?.pPrice * (100 - item.productId?.pOffer)) / 100;
      return sum + discountedPrice * item.quantity;
    }
    return sum;
  }, 0);

  const shipping = "FREE";
  const discount = 0.0;
  const tax = (subtotal * 18) / 100;
  const total = subtotal - discount + tax;

  const handleCheckout = () => {
    const cartCheckItemsId = getCheckedItemIds();
    console.log("1234", cartCheckItemsId);
    navigate("/checkout", { state: { cartCheckItemsId } });
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto p-4">
    {fetchError && <p className="text-xs text-red-500 text-center font-semibold"> {fetchError}</p>}
      <h1 className="text-2xl font-bold text-center bg-gray-800 text-secondary p-4 mb-6 rounded-xl bg-gradient-to-r fromprimary to-slate-500">
        SHOPPING CART
      </h1>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-2 mb-4 font-semibold">
              <div className="ml-10">PRODUCT</div>
              <div>PRICE</div>
              <div>QUANTITY</div>
              <div>TOTAL</div>
            </div>
            
            <CartList
              cartItems={cartItems}
              checkedItems={checkedItems}
              isLoading={isLoading}
              isLogin={isLogin}
              onCheckboxChange={handleCheckboxChange}
              onUpdateQuantity={updateQuantity}
              onDelete={deleteCartItem}
             
            />
          </div>

          {/* Mobile View */}
          <div className="lg:hidden">
           
            <MobileCartList
              cartItems={cartItems}
              checkedItems={checkedItems}
              isLoading={isLoading}
              isLogin={isLogin}
              onCheckboxChange={handleCheckboxChange}
              onUpdateQuantity={updateQuantity}
              onDelete={deleteCartItem}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            tax={tax}
            total={total}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
