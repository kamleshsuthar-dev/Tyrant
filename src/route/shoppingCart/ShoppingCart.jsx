import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { useGoogleAuthContext } from "@/context/GoogleAuth.jsx";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "../../components/home/DeleteBtn.jsx";
export default function ShoppingCart() {
 
  const { isLoginUser, setCartQuantity } = useGoogleAuthContext();

  const navigate = useNavigate();

  // const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setISLoading] = useState(true);
  const [cupounCode, setCupounCode] = useState("");

  const SkeletonCartItem = () => {
    return (
      <div className="flex items-center p-4 border-b animate-pulse">
        <div className="bg-gray-200 h-20 w-20 mr-4"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="mx-4">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    );
  };

  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
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

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`${import.meta.env.VITE_GET_CART_PRODUCT}`);
        console.log("shop ", res.data);

        const initialCheckedState = res.data.reduce((acc, item) => {
          acc[item._id] = true; // Set all items to checked initially
          return acc;
        }, {});

        setCartQuantity(res.data.length);
        setCheckedItems(initialCheckedState);
        setCartItems(res.data.reverse());
        setISLoading(false);
      } catch (error) {
        console.log("fetch cart error", error);
        setISLoading(false);
      }
    })();
  }, []);

  const updateQuantity = useCallback(async (cartItem, newQuantity) => {
    // console.log("update quantity", newQuantity, cartItem._id);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === cartItem._id ? { ...item, quantity: newQuantity } : item,
      ),
    );

    try {
      let res = await axios.put(
        `${import.meta.env.VITE_UPDATE_CART_PRODUCT_QUANTITY}/${cartItem._id}`,
        { quantity: newQuantity },
      );
      console.log(res);
    } catch (error) {
      console.log("update quantity error", error);
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item._id === cartItem._id
            ? { ...item, quantity: cartItem.quantity }
            : item,
        ),
      );
    }
  }, []);

  const deleteCartBtn = async (productCartID) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_DELETE_CART_PRODUCT}/${productCartID}`,
      );
      console.log(res);
      setCartItems((prevProducts) =>
        prevProducts.filter((product) => product._id !== productCartID),
      );
    } catch (error) {
      console.log("delete cart btn error :", error);
    }
  };

  const getCheckedItemIds = () => {
    return cartItems
      .filter((item) => checkedItems[item._id] || false)
      .map((item) => item._id);
  };

  const handleCheckout = (e) => {
    const cartCheckItemsId = getCheckedItemIds();

    // console.log(cartCheckItemsId);

    navigate("/checkout", { state: { cartCheckItemsId } });
  };
  return (
    <div className="w-full max-w-[1300px] mx-auto p-4">
      <h1
        className="text-2xl font-bold text-center bg-gray-800 text-secondary p-4 mb-6 rounded-xl 
      bg-gradient-to-r fromprimary to-slate-500"
      >
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

            {isLoading === true ? (
              <>
                <SkeletonCartItem />
                <SkeletonCartItem />
                <SkeletonCartItem />
              </>
            ) : !isLoginUser && cartItems.length < 1 ? (
              <h1 className=" text-4xl text-center pt-40">
                No items in cart ,User Not Login Yet
              </h1>
            ) : cartItems.length < 1 ? (
              <>
                <h1 className=" text-4xl text-center pt-40">
                  No items in cart{" "}
                </h1>
              </>
            ) : (
              cartItems.map((cartItem) => (
                <div
                  key={cartItem._id}
                  className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 items-center mb-4 border-b pb-4 relative"
                >
                  <div className="flex gap-4">
                    <div className="relative top-8">
                      <Checkbox
                        checked={checkedItems[cartItem._id] || false}
                        onCheckedChange={() =>
                          handleCheckboxChange(cartItem._id)
                        }
                      />
                    </div>
                    <img
                      src={
                        cartItem.productId?.pImages[0].URL || "/placeholder.svg"
                      }
                      alt={cartItem.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold ">
                        {cartItem.productId?.pName}
                      </h3>

                      <div className="text-sm text-muted-foreground">
                        Color:{" "}
                        <div
                          className={`h-3 w-3  inline-block rounded-sm`}
                          style={{ backgroundColor: cartItem.variant.color }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Size: {cartItem.variant.size || "red"}
                      </p>
                      {/* <p className="text-sm text-muted-foreground">Status: {product.status}</p> */}
                    </div>
                  </div>
                  <div>
                    <div className="line-through text-gray-400 text-xs">
                      Rs. {cartItem.productId?.pPrice.toFixed(2)}
                    </div>
                    <div>
                      Rs.
                      {(
                        (cartItem.productId?.pPrice *
                          (100 - cartItem.productId?.pOffer)) /
                        100
                      ).toFixed(2)}
                    </div>
                  </div>
                  <div>
                    {/* produt quantity */}
                    {/* <input type="number" value={product.quantity} min={1} className="w-20" /> */}
                    <div>
                      <div className="flex items-center mt-2 text-primary w-fit bg-secondary rounded-lg">
                        <Button
                          variant="secondary"
                          size="icon"
                          className=" hover:bg-transparent hover:text-gray-400 border-none"
                          onClick={() =>
                            updateQuantity(cartItem, cartItem.quantity - 1)
                          }
                          disabled={cartItem.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center border-l-2 border-r-2 text-lg">
                          {cartItem.quantity}
                        </span>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
                          onClick={() =>
                            updateQuantity(cartItem, cartItem.quantity + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* total btn */}
                  <div>
                    Rs.{" "}
                    {(
                      ((cartItem.productId?.pPrice *
                        (100 - cartItem.productId?.pOffer)) /
                        100) *
                      cartItem.quantity
                    ).toFixed(2)}
                  </div>
                  <div
                    className="absolute right-0 top-5 h-12 w-9 bg-[#FF1010] rounded-md flex justify-center items-center"
                    onClick={() => deleteCartBtn(cartItem._id)}
                  >
                    <DeleteBtn />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {isLoading == true ? (
              <>
                <SkeletonCartItem />
                <SkeletonCartItem />
                <SkeletonCartItem />
              </>
            ) : !isLoginUser && cartItems.length < 1 ? (
              <h1 className=" text-2xl text-center pt-40">
                No items in cart ,User Not Login Yet
              </h1>
            ) : cartItems.length < 1 ? (
              <>
                <h1 className=" text-2xl text-center pt-40">
                  No items in cart{" "}
                </h1>
              </>
            ) : (
              cartItems.map((cartItem) => (
                <Card key={cartItem._id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={
                          cartItem.productId?.pImages[0].URL ||
                          "/placeholder.svg"
                        }
                        alt={cartItem.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold ">
                          {cartItem.productId?.pName}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          Color:{" "}
                          <div
                            className={`h-3 w-3  inline-block rounded-sm`}
                            style={{ backgroundColor: cartItem.variant.color }}
                          ></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Size: {cartItem.variant.size || "red"}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <div>
                            <div className="line-through text-gray-400 text-xs">
                              Rs. {cartItem.productId?.pPrice.toFixed(2)}
                            </div>
                            <div>
                              Rs.
                              {(
                                (cartItem.productId?.pPrice *
                                  (100 - cartItem.productId?.pOffer)) /
                                100
                              ).toFixed(2)}
                            </div>
                          </div>
                          {/* <input type="number" value={product.quantity} min={1} className="w-20" /> */}
                          <div className="relative">
                            <div className="flex items-center mt-2 text-primary w-fit bg-secondary rounded-lg">
                              <Button
                                variant="secondary"
                                size="icon"
                                className=" hover:bg-transparent hover:text-gray-400 border-none"
                                onClick={() =>
                                  updateQuantity(
                                    cartItem,
                                    cartItem.quantity - 1,
                                  )
                                }
                                disabled={cartItem.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-12 text-center border-l-2 border-r-2 text-lg">
                                {cartItem.quantity}
                              </span>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
                                onClick={() =>
                                  updateQuantity(
                                    cartItem,
                                    cartItem.quantity + 1,
                                  )
                                }
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <div
                              className="absolute top-[-4.5rem] right-8  h-12 w-9 bg-[#FF1010] rounded-md flex justify-center items-center"
                              onClick={() => deleteCartBtn(cartItem._id)}
                            >
                              <DeleteBtn />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="bg-primary text-secondary">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-4">CARD TOTALS</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs.{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-accent">{shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>Rs.{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Rs.{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>Rs.{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button
              variant="accent"
                className="w-full mt-4 "
                // onClick={() => {
                //   navigate("/checkout");}}
                onClick={(e) => handleCheckout()}
              >
                CHECKOUT &gt;&gt;
              </Button>

              <div className="mt-6">
                <h3 className="font-bold mb-2">COUPON CODE</h3>
                <input
                  type="text"
                  placeholder="Enter CODE"
                  className="mb-2 w-full rounded-sm text-sm px-2 py-1"
                  value={cupounCode}
                  onChange={(e) => setCupounCode(e.target.value)}
                />
                <Button
                  variant="accent"
                  className="w-full"
                  onClick={() => {
                    if (cupounCode === "FUCKYOU") {
                      alert("Coupon Applied");
                    }
                  }}
                >
                  APPLY COUPON
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
