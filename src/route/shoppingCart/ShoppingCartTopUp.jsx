"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { forwardRef, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteBtn from "../../component/home/DeleteBtn.jsx";

const SkeletonCartItem = () => {
  return (
    <div className="flex items-center p-4 border-b animate-pulse">
      <div className="bg-gray-200 h-15 w-15 mr-4"></div>
      <div className="flex-1">
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="mx-4">
        <div className="h-2 bg-gray-200 rounded w-16"></div>
      </div>
      <div>
        <div className="h-2 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

const ShoppingCartTopUp = forwardRef(({ product }, ref) => {
  // console.log(product,"shoppingcart");

  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [shoppingPopupLoader, setShoppingPopupLoadeer] = useState(true);

  const [cursorEnter, setCursorEnter] = useState(false);
  const enter = () => {
    setCursorEnter(true);
  };
  const leave = () => {
    setCursorEnter(false);
    setTimeout(() => {
      setCursorEnter((prevCursorEnter) => {
        if (!prevCursorEnter) {
          setIsOpen(false);
        }
        return prevCursorEnter; // Ensure state consistency
      });
    }, 2000);
  };

  const [cartMessage, setCartMessage] = useState(false);
  const addToCart = async () => {
    setIsOpen(true);
    let cartText = document.getElementsByClassName("cartMessage");

    try {
      let res = await axios.get(`${import.meta.env.VITE_GET_CART_PRODUCT}`);
      console.log("shop popupp  ", res);
      // let reversedData = res.data.reverse();
      setCartItems(res.data.reverse());
      setShoppingPopupLoadeer(false);
      setCartMessage(true);
      cartText.textContent = "Item Has Been Added Successfully";
    } catch (error) {
      console.log("pop up shopping cart get prd error", error);
      setShoppingPopupLoadeer(false);
      setCartMessage(true);
      cartText.textContent = "Something went wrong try Again";
    }

    setTimeout(() => {
      setCartMessage(false);
    }, 1000);

    setTimeout(() => {
      setCursorEnter((prevCursorEnter) => {
        if (!prevCursorEnter) {
          setIsOpen(false);
        }
        return prevCursorEnter; // Ensure state consistency
      });
    }, 2000);
  };

  const deleteCartBtn = async (productCartID) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_DELETE_CART_PRODUCT}/${productCartID}`,
      );
      console.log(res);
      setCartItems((prevProducts) =>
        prevProducts.filter((product) => product._id !== productCartID),
      );
      setCartMessage(true);
      document.querySelector(".cartMessage").textContent =
        "Item Has Been Deleted Successfully";
      setTimeout(() => {
        setCartMessage(false);
      }, 1000);
    } catch (error) {
      console.log("delete cart btn error :", error);
    }
  };

  return (
    <div>
      <Button onClick={addToCart} ref={ref} className="hidden">
        Add to Cart
      </Button>

      {isOpen && (
        <>
          <div
            className="main-box fixed inset-0 bg-primary/20 z-50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-0 right-4 z-50 w-full max-w-[380px] animate-slide-up ">
            <div className="bg-background rounded-t-3xl shadow-lg overflow-hidden max-w-[380px]">
              <div
                className="p-6 max-w-[380px]"
                onMouseEnter={enter}
                onMouseLeave={leave}
              >
                <div className="flex  justify-center relative items-center mb-4">
                  <h2 className="text-2xl text-center  font-bold">Cart</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground absolute top-2 right-2 hover:text-foreground"
                  >
                    X
                  </button>
                </div>

                <div className="space-y-4">
                  <div
                    className={`cartMessage bg-accent text-primary px-4 py-0.5 rounded-md text-sm text-extrabold text-center ${cartMessage === true ? " " : "hidden"}`}
                  >
                    Item Has Been Added Successfully
                  </div>

                  <div className="space-y-4 h-[150px] overflow-y-auto scrollbar-hide">
                    {shoppingPopupLoader ? (
                      <>
                        <SkeletonCartItem />
                        <SkeletonCartItem />
                        <SkeletonCartItem />
                      </>
                    ) : (
                      cartItems.map((cartItem) => (
                        <div key={cartItem._id} className="flex gap-4">
                          <div className="h-16 w-16 bg-muted rounded-md overflow-hidden">
                            <img
                              src={
                                cartItem.productId.pImages[0].URL ||
                                "/placeholder.svg"
                              }
                              alt={cartItem.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 items-center">
                            <h3 className="font-medium text-sm">
                              {cartItem.productId.pName}
                            </h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              Rs.{cartItem.productId.pPrice.toFixed(2)}
                            </div>
                          </div>
                          <div
                            className="h-12 w-9 bg-[#FF1010] rounded-md flex justify-center items-center"
                            onClick={() => deleteCartBtn(cartItem._id)}
                          >
                            <DeleteBtn />
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <div className="font-medium">SUBTOTAL</div>
                    {/* <div className="font-medium">${subtotal.toFixed(2)}</div> */}
                  </div>

                  <div className="space-y-2 ">
                    <NavLink to="/checkout">
                      <Button className="w-full rounded-full h-[1.75rem]">
                        CHECK OUT
                      </Button>
                    </NavLink>
                    <NavLink to="/shoppingcart">
                      <Button
                        variant="secondary"
                        className="w-full rounded-full h-[1.75rem] mt-2 text-bold "
                      >
                        View Cart
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default ShoppingCartTopUp;
