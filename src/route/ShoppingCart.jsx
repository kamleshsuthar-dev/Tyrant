import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Minus, Plus } from "lucide-react";
import { useCartContext } from "@/context/CartContext";
import axios from "axios";
import { use } from "react";
import { useAsyncError } from "react-router-dom";
// const products = [
//   {
//     id: 1,
//     name: "Adaa Jaipur Comfort Floral Printed Casual Shirt",
//     price: 1299.0,
//     image:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B1197B3BE-D05D-4021-BAD1-9321ECFAE70D%7D-FUfAYE6dqH6hPJPs2k2AMbJwABHjuD.png",
//     color: "Carbonated Maroon",
//     status: "In Stock",
//     quantity: 1,
//   },
//   // Add more products as needed
// ];
export default function ShoppingCart() {
  // const {cart}= useCartContext()
  const shipping = "FREE";
  const discount = 5.99;
  const tax = 18;

  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  // const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  const subtotal = 1234;
  const total = subtotal - discount + tax;
  useEffect(() => {
    (async () => {
      let res = await axios.get(`${import.meta.env.VITE_GET_CART_PRODUCT}`);
      console.log("shop ", res.data);

      setProducts(res.data);
    })();
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.productId._id === productId 
          ? { ...product, quantity: Math.max(1, newQuantity) }
          : product
      )
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1
        className="text-2xl font-bold text-center bg-gray-800 text-white p-4 mb-6 rounded-xl 
      bg-gradient-to-r from-black to-slate-500"
      >
        SHOPPING CART
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 mb-4 font-semibold">
              <div>PRODUCT</div>
              <div>PRICE</div>
              <div>QUANTITY</div>
              <div>TOTAL</div>
            </div>
            {products.map((product) => (
              <div
                key={product.productId._id}
                className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 items-center mb-4 border-b pb-4"
              >
                <div className="flex gap-4">
                  <img
                    src={product.productId.pImages[0].URL || "/placeholder.svg"}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{product.productId.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Color: <div className={`h-3 w-3 bg-[${product.variant.color || "bg-pink-400"}] inline-block rounded-3xl`}></div>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Size: {product.variant.size || "red"}
                    </p>
                    {/* <p className="text-sm text-muted-foreground">Status: {product.status}</p> */}
                  </div>
                </div>
                <div>Rs. {product.productId.pPrice.toFixed(2)}</div>
                <div>
                  {/* produt quantity */}
                  {/* <input type="number" value={product.quantity} min={1} className="w-20" /> */}
                  <div>
                    <div className="flex items-center mt-2 text-[#202020] w-fit bg-[#FFFFFF] rounded-lg">
                      <Button
                        variant="outline"
                        size="icon"
                        className=" hover:bg-transparent hover:text-gray-400 border-none"
                        onClick={() =>updateQuantity(product.productId._id, product.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center border-l-2 border-r-2 text-lg">
                        {product.quantity }
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
                        onClick={() =>updateQuantity(product.productId._id, product.quantity + 1) }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {/* <div className="flex items-center mt-2 text-[#202020] w-fit bg-[#FFFFFF] rounded-lg">
                      <Button
                        variant="outline"
                        size="icon"
                        className=" hover:bg-transparent hover:text-gray-400 border-none"
                        onClick={() =>
                          setQuantity(Math.max(1, quantity - 1))
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center border-l-2 border-r-2 text-lg">
                        {product.quantity || quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
                        onClick={() =>
                          setQuantity(quantity + 1)
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div> */}
                  </div>
                </div>
                <div>
                  Rs. {(product.productId.pPrice * product.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {products.map((product) => (
              <Card key={product.productId._id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={
                        product.productId.pImages[0].URL || "/placeholder.svg"
                      }
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{product.productId.name}</h3>
                      <p className="text-sm text-muted-foreground">
                      Color: <div className={`h-3 w-3 bg-[${product.variant.color || "bg-pink-400"}] inline-block rounded-3xl`}></div>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Status: {product.status}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div>Rs. {product.productId.pPrice.toFixed(2)}</div>
                        {/* <input type="number" value={product.quantity} min={1} className="w-20" /> */}
                        <div>
                          <div className="flex items-center mt-2 text-[#202020] w-fit bg-[#FFFFFF] rounded-lg">
                            <Button
                              variant="outline"
                              size="icon"
                              className=" hover:bg-transparent hover:text-gray-400 border-none"
                              onClick={() =>  updateQuantity(product.productId._id, product.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center border-l-2 border-r-2 text-lg">
                              {product.quantity }
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
                              onClick={() => updateQuantity(product.productId._id, product.quantity - 1) }
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-4">CARD TOTALS</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">{shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 bg-green-500 hover:bg-green-600">
                CHECKOUT &gt;&gt;
              </Button>

              <div className="mt-6">
                <h3 className="font-bold mb-2">COUPON CODE</h3>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="mb-2"
                />
                <Button className="w-full bg-green-500 hover:bg-green-600">
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
