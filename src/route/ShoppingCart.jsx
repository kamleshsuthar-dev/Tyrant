"use client";

import React, { useState } from "react";
// import Image from "./images/bgImgJaipur.png";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Arha Junior Comfort Floral Printed Cotton Shirt",
      color: "Carbonized Maroon",
      status: "In Stock",
      price: 139900,
      quantity: 1,
      image: "./images/bgImgJaipur.png",
    },
    {
      id: "2",
      name: "Arha Junior Comfort Floral Printed Cotton Shirt",
      color: "Carbonized Maroon",
      status: "In Stock",
      price: 139900,
      quantity: 1,
      image: "./images/bgImgJaipur.png",
    },
    {
      id: "3",
      name: "Arha Junior Comfort Floral Printed Cotton Shirt",
      color: "Carbonized Maroon",
      status: "In Stock",
      price: 139900,
      quantity: 1,
      image: "./images/bgImgJaipur.png",
    },
  ]);

  const updateQuantity = (id, quantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      {/* Discount Banner */}
      {/* <div className="bg-emerald-500 text-white text-center py-2 text-sm">
        20% DISCOUNT ON ALL THE KURTA SETS
      </div> */}

      {/* Navigation */}
      {/* <nav className="bg-black text-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="font-serif italic text-lg">Arha</span>
            <a href="#" className="hidden md:inline-block hover:text-gray-300">
              KURTA SETS
            </a>
            <a href="#" className="hidden md:inline-block hover:text-gray-300">
              GOWNS
            </a>
            <a href="#" className="hidden md:inline-block hover:text-gray-300">
              BOTTOMS
            </a>
            <a href="#" className="hidden md:inline-block hover:text-gray-300">
              TOPS
            </a>
            <a href="#" className="hidden md:inline-block hover:text-gray-300">
              ABOUT US
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                placeholder="SEARCH"
                className="pl-8 pr-2 py-1 bg-transparent border border-gray-600 rounded text-sm focus:outline-none focus:border-gray-400"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="hover:text-gray-300">LOGIN</button>
            <button className="hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav> */}

      {/* Shopping Cart */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium mb-8 bg-gray-800 text-white py-3 px-4">
          SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 mb-4">
              <div className="col-span-2">PRODUCT</div>
              <div className="text-center">QUANTITY</div>
              <div className="text-right">TOTAL</div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 gap-4 py-4 border-t items-center"
              >
                <div className="col-span-2 flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="text-sm">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">Color: {item.color}</p>
                    <p className="text-green-500">{item.status}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number.parseInt(e.target.value))
                    }
                    min="1"
                    className="w-16 text-center border rounded py-1"
                  />
                </div>
                <div className="text-right">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">CARD TOTAL</h2>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-4">
                CHECKOUT
              </button>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="w-full border rounded py-2 px-3"
                />
                <button className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded">
                  APPLY COUPON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
