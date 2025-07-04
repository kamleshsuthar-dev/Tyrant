// import axios from 'axios'
// import React from 'react'

// function Order() {
//     async function getOrder() {
//       try {
//           let res =await axios.get(`${import.meta.env.VITE_GET_ORDER}`)
//             console.log(res);
//       } catch (error) {
//         console.log("get api order ",error);
        
//       }
//     }
//     getOrder()
//   return (
//     <div>
//         hiiiiii this is order page
//     </div>
//   )
// }

// export default Order

"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { CheckCircle, Clock, CreditCard, Truck } from "lucide-react"
import { useState } from "react"
// import Image from "next/image"

// Sample data for demonstration
// const ordersData = [
//   {
//     id: "ORD-001",
//     isPaid: true,
//     paymentMethod: "online",
//     totalAmount: 2499,
//     orderDate: "2024-01-15",
//     address: {
//       name: "John Doe",
//       street: "123 Main Street",
//       city: "New York",
//       state: "NY",
//       zipCode: "10001",
//       phone: "+1 (555) 123-4567",
//     },
//     items: [
//       {
//         id: 1,
//         name: "Premium Cotton T-Shirt",
//         image: "https://i.pinimg.com/236x/fc/fe/55/fcfe55c2c9e64282c5c9a7f1469475a3.jpg",
//         quantity: 2,
//         variant: {
//           color: "Navy Blue",
//           size: "L",
//         },
//         singlePrice: 599,
//         totalPrice: 1198,
//       },
//       {
//         id: 2,
//         name: "Denim Jeans",
//         image: "https://i.pinimg.com/236x/fc/fe/55/fcfe55c2c9e64282c5c9a7f1469475a3.jpg",
//         quantity: 1,
//         variant: {
//           color: "Dark Blue",
//           size: "32",
//         },
//         singlePrice: 1299,
//         totalPrice: 1299,
//       },
//     ],
//   },
//   {
//     id: "ORD-002",
//     isPaid: false,
//     paymentMethod: "COD",
//     totalAmount: 899,
//     orderDate: "2024-01-14",
//     address: {
//       name: "Jane Smith",
//       street: "456 Oak Avenue",
//       city: "Los Angeles",
//       state: "CA",
//       zipCode: "90210",
//       phone: "+1 (555) 987-6543",
//     },
//     items: [
//       {
//         id: 3,
//         name: "Wireless Headphones",
//         image: "https://i.pinimg.com/236x/fc/fe/55/fcfe55c2c9e64282c5c9a7f1469475a3.jpg",
//         quantity: 1,
//         variant: {
//           color: "Black",
//           size: "One Size",
//         },
//         singlePrice: 899,
//         totalPrice: 899,
//       },
//     ],
//   },
//   {
//     id: "ORD-003",
//     isPaid: true,
//     paymentMethod: "online",
//     totalAmount: 3497,
//     orderDate: "2024-01-13",
//     address: {
//       name: "Mike Johnson",
//       street: "789 Pine Road",
//       city: "Chicago",
//       state: "IL",
//       zipCode: "60601",
//       phone: "+1 (555) 456-7890",
//     },
//     items: [
//       {
//         id: 4,
//         name: "Running Shoes",
//         image: "https://i.pinimg.com/236x/fc/fe/55/fcfe55c2c9e64282c5c9a7f1469475a3.jpg",
//         quantity: 1,
//         variant: {
//           color: "White/Red",
//           size: "10",
//         },
//         singlePrice: 1999,
//         totalPrice: 1999,
//       },
//       {
//         id: 5,
//         name: "Sports Jacket",
//         image: "https://i.pinimg.com/236x/fc/fe/55/fcfe55c2c9e64282c5c9a7f1469475a3.jpg",
//         quantity: 1,
//         variant: {
//           color: "Black",
//           size: "M",
//         },
//         singlePrice: 1499,
//         totalPrice: 1499,
//       },
//     ],
//   },
// ]

export default function Orders() {
  const [ordersData,setOrdersData]=useState([])
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`
  }

 const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
    timeZone: "UTC" // optional: remove if you want local time
  });
};


    async function getOrder() {
      try {
          let res =await axios.get(`${import.meta.env.VITE_GET_ORDER}`)
            console.log(res);
            setOrdersData(res.data)
      } catch (error) {
        console.log("get api order ",error);
        
      }
    }
    getOrder()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">Track and manage your orders</p>
      </div>

      <div className="space-y-6">
        {ordersData.map((order) => (
          <Card key={order._id} className="w-full">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-semibold">Order {order._id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Placed on {formatDate(order.updatedAt)}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Badge variant={order.isPaid ? "default" : "secondary"} className="w-fit">
                    {order.isPaid ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" /> Paid
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" /> Pending
                      </>
                    )}
                  </Badge>
                  <Badge variant="outline" className="w-fit">
                    {order.paymentMethod === "COD" ? (
                      <>
                        <Truck className="w-3 h-3 mr-1" /> Cash on Delivery
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-3 h-3 mr-1" /> Online Payment
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <img
                          src={item.productId.pImages[0].URL || "/placeholder.svg"}
                          alt={item.productId.pImages[0].ImageName}
                          width={80}
                          height={80}
                          className="rounded-md object-cover "
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.productId.pName}</h4>

                        <div className="mt-2 space-y-1">
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>
                              Color: <span className="font-medium">{item.variant.color}</span>
                            </span>
                            <span>
                              Size: <span className="font-medium">{item.variant.size}</span>
                            </span>
                            <span>
                              Qty: <span className="font-medium">{item.quantity}</span>
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm">
                            <span className="text-gray-600">
                              Unit Price: <span className="font-medium">{formatCurrency(item.amount)}</span>
                            </span>
                            <span className="text-gray-900 font-semibold">
                              Total: {formatCurrency(item.amount* item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Shipping Address</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{order.orderAddress.addressLine}</p>
                    <p className="text-gray-700">{order.orderAddress.locality}</p>
                    <p className="text-gray-700">
                      {order.orderAddress.city}, {order.orderAddress.state} {order.orderAddress.pincode}
                    </p>
                    <p className="text-gray-700">{order.orderAddress.phone}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Summary */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h3 className="font-semibold text-lg">Payment Method</h3>
                  <p className="text-gray-600 capitalize">
                    {order.paymentMethod === "cash on delivery" ? "Cash on Delivery" : "Online Payment"}
                  </p>
                </div>

                <div className="text-right">
                  <h3 className="font-semibold text-lg">Total Amount</h3>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(order.totalAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {ordersData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Truck className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        </div>
      )}
    </div>
  )
}

