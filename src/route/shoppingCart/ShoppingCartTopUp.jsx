"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { forwardRef, useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteBtn from "../../components/home/DeleteBtn.jsx";

const SkeletonCartItem = () => {
  return (
    <div className="flex animate-pulse items-center border-b p-4">
      <div className="h-15 w-15 mr-4 bg-gray-200"></div>
      <div className="flex-1">
        <div className="mb-2 h-3 w-3/4 rounded bg-gray-200"></div>
        <div className="mb-2 h-2 w-1/4 rounded bg-gray-200"></div>
        <div className="h-2 w-1/2 rounded bg-gray-200"></div>
      </div>
      <div className="mx-4">
        <div className="h-2 w-16 rounded bg-gray-200"></div>
      </div>
      <div>
        <div className="h-2 w-20 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

const ShoppingCartTopUp = forwardRef(({  }, ref) => {
  // console.log(product, "shoppingcartttttt");

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
      // console.log("shop popupp  ", res);
      // let reversedData = res.data.reverse();
      let reverseData = res.data.reverse()
      console.log("showCartPopup", reverseData);
      setCartItems(reverseData);
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
    <div className="z-50">
      <Button onClick={addToCart} ref={ref} className="hidden">
        Add to Cart
      </Button>

      {isOpen && (
        <>
          <div
            className="main-box fixed inset-0 z-50 bg-primary/20 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-0 right-4 z-50 w-full max-w-[380px] animate-slide-up">
            <div className="max-w-[380px] overflow-hidden rounded-t-3xl bg-background shadow-lg">
              <div
                className="max-w-[380px] p-6"
                onMouseEnter={enter}
                onMouseLeave={leave}
              >
                <div className="relative mb-4 flex items-center justify-center">
                  <h2 className="text-center text-2xl font-bold">Cart</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                  >
                    X
                  </button>
                </div>

                <div className="space-y-4">
                  <div
                    className={`cartMessage text-extrabold rounded-md bg-accent px-4 py-0.5 text-center text-sm text-primary ${cartMessage === true ? " " : "hidden"}`}
                  >
                    Item Has Been Added Successfully
                  </div>

                  <div className="scrollbar-hide h-[150px] space-y-4 overflow-y-auto">
                    {shoppingPopupLoader ? (
                      <>
                        <SkeletonCartItem />
                        <SkeletonCartItem />
                        <SkeletonCartItem />
                      </>
                    ) : (
                      cartItems.map((cartItem) => (
                        <div key={cartItem._id} className="flex gap-4">
                          <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                            <img
                              src={
                                Array.isArray(cartItem.productId?.pImages) &&
                                cartItem.productId.pImages.length > 0
                                  ? cartItem.productId.pImages[0].URL
                                  : "/placeholder.svg"
                              }
                              alt={cartItem?.productId?.pName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 items-center">
                            <h3 className="text-sm font-medium">
                              {cartItem?.productId?.pName}
                            </h3>
                            <div className="mt-1 text-sm text-muted-foreground">
                              Rs.{(cartItem?.productId?.pPrice * (100 - cartItem?.productId?.pOffer)) / 100}
                            </div>
                          </div>
                          <div
                            className="flex h-12 w-9 items-center justify-center rounded-md bg-[#FF1010]"
                            onClick={() => deleteCartBtn(cartItem._id)}
                          >
                            <DeleteBtn />
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-between border-t pt-4">
                    <div className="font-medium">SUBTOTAL</div>
                    {/* <div className="font-medium">${subtotal.toFixed(2)}</div> */}
                  </div>

                  <div className="space-y-2">
                    <NavLink to="/checkout">
                      <Button className="h-[1.75rem] w-full rounded-full">
                        CHECK OUT
                      </Button>
                    </NavLink>
                    <NavLink to="/shoppingcart">
                      <Button
                        variant="secondary"
                        className="text-bold mt-2 h-[1.75rem] w-full rounded-full"
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
