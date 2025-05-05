"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { ChevronDown, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CreateOrder from "./CreateOrder.jsx";
import RayzerPay from "./RayzerPay.jsx";

export default function CheckoutPage() {
  const location = useLocation();
  const { cartCheckItemsId } = location.state;

  // State for addresses
  const [addresses, setAddresses] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  // State for contact info
  const [contactInfo, setContactInfo] = useState([]);
  const [isEditingContact, setIsEditingContact] = useState(false);

  // State for delivery options
  const [deliveryItems, setDeliveryItems] = useState([]);
  const [isEditingDelivery, setIsEditingDelivery] = useState(false);

  const [createOrderItems, setCreateOrderItems] = useState([]);

  // State for order summary
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: "FREE",
    discount: 0,
    tax: 0,
    total: 0,
  });

  // State for coupon
  const [couponCode, setCouponCode] = useState("");

  async function mockFetchDeliveryItems() {
    try {
      let res = await axios.get(`${import.meta.env.VITE_GET_CART_PRODUCT}`);
      // console.log("check ", res.data);
      let checkItem = res.data.filter((item) =>
        cartCheckItemsId.includes(item._id),
      );
      // console.log("includesss ", checkItem);
      return checkItem;
    } catch (error) {
      console.log("checkout api error", error);
    }
  }

  async function mockFetchOrderSummary(deliveryItems) {
    console.log(deliveryItems, "delivery items");

    // Calculate subtotal from delivery items
    const subtotal = deliveryItems.reduce((sum, item) => {
      const discountedPrice =
        (item.productId?.pPrice * (100 - item.productId?.pOffer)) / 100;
      return sum + discountedPrice * item.quantity;
    }, 0);

    // Apply discount (if any)
    const discount = 0.0; // Set your discount logic here

    // Calculate tax
    const tax = (subtotal * 18) / 100;

    // Calculate total
    const total = subtotal - discount + tax;

    // console.log("Order summary calculation:", { subtotal, discount, tax, total });

    return {
      subtotal: subtotal.toFixed(2),
      shipping: "FREE",
      discount: discount.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };
  }

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        // Pass deliveryItems to the function
        const response = await mockFetchOrderSummary(deliveryItems);
        setOrderSummary(response);
      } catch (error) {
        console.error("Error fetching order summary:", error);
      }
    };
    fetchOrderSummary();
  }, [deliveryItems]);

  // Fetch addresses from API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // In a real app, replace with actual API call
        // const response = await mockFetchAddresses()

        let res = await axios.get(`${import.meta.env.VITE_GET_ADDRESS}`);

        // console.log("all address " , res.data.address);

        let address = res.data.address;

        setAddresses(res.data.address);

        // Select first two addresses by default
        if (address.length >= 2) {
          setSelectedAddresses([address[0], address[1]]);
        } else if (address.length === 1) {
          setSelectedAddresses([address[0]]);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    // console.log(selectedAddresses,"fdfsdfsdfsd");

    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_GET_PROFILE}`);
        console.log("Profile response:", res);

        // Defensive check
        const user = res?.data?.user;
        if (user) {
          setContactInfo(user);
        } else {
          console.warn("User data is missing in the response.");
          setContactInfo(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setContactInfo(null);
      }
    };
    // const fetchContactInfo = async () => {
    //   try {
    //     // In a real app, replace with actual API call
    //     // const response = await mockFetchContactInfo()
    //     let res = await axios.get(`${import.meta.env.VITE_GET_PROFILE}`)
    //                console.log(res.data.user ,"");

    //     setContactInfo(res?.data?.user)
    //   } catch (error) {
    //     console.error("Error fetching contact info:", error)
    //   }
    // }

    const fetchDeliveryItems = async () => {
      try {
        const response = await mockFetchDeliveryItems();
        console.log("Fetched cart items:", response);

        const formattedItems = response.map((item) => {
          const price = Number(item.productId?.pPrice);
          const offer = Number(item.productId?.pOffer);

          return {
            cartItemId: item._id,
            amount:
              typeof price === "number" && typeof offer === "number"
                ? (price * (100 - offer)) / 100
                : 0,
          };
        });

        setCreateOrderItems(formattedItems);
        setDeliveryItems(response); // if needed elsewhere
      } catch (error) {
        console.error("Error fetching delivery items:", error);
      }
    };

    fetchAddresses();
    fetchContactInfo();
    fetchDeliveryItems();
  }, []);

  // Add a new address
  const handleAddAddress = () => {
    // In a real app, this would open a modal or navigate to an address form
    alert("Add new address functionality would open a form here");
  };

  // Select an address from dropdown
  const handleSelectAddress = (address, index) => {
    const newSelectedAddresses = [...selectedAddresses];
    newSelectedAddresses[index] = address;
    setSelectedAddresses(newSelectedAddresses);
    setShowAddressDropdown(false);
  };

  // Toggle contact info editing
  const handleToggleContactEdit = () => {
    setIsEditingContact(!isEditingContact);
  };

  // Save contact info
  const handleSaveContactInfo = () => {
    // In a real app, this would make an API call to update the contact info
    setIsEditingContact(false);
  };

  // Toggle delivery options editing
  const handleToggleDeliveryEdit = () => {
    setIsEditingDelivery(!isEditingDelivery);
  };

  // Apply coupon
  const handleApplyCoupon = () => {
    // In a real app, this would make an API call to validate and apply the coupon
    alert(`Applying coupon: ${couponCode}`);
  };

  // Proceed to checkout
  const handleCheckout = () => {
    // In a real app, this would proceed to payment

    alert("Proceeding to payment...");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="my-6 mx-12">
        <p className="text-sm text-gray-500">MY ACCOUNT &gt; CHECKOUT</p>
        <h1 className="text-2xl font-bold mt-2">
          ITS TIME FOR,
          <br />
          CHECKOUT
        </h1>
      </div>

      <div className="grid grid-cols-1 mx-24 lg:[grid-template-columns:1fr_min-content] gap-6">
        <div className="space-y-6">
          {/* Address Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedAddresses.map((address, index) => (
              <div
                key={index}
                className="border rounded-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                    {address.type || "Default Address"}
                  </div>
                  <div>
                    <p className="font-medium">{address.name}</p>
                    <p className="text-sm text-gray-600">{address.phone}</p>
                    <p className="text-sm text-gray-600">
                      {address.addressLine}
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {addresses
                      .filter((a) => !selectedAddresses.includes(a))
                      .map((address) => (
                        <DropdownMenuItem
                          key={address._id}
                          onClick={() => handleSelectAddress(address, index)}
                        >
                          {address.name} - {address.addressLine}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

            <Button
              onClick={handleAddAddress}
              className="bg-lime-400 hover:bg-lime-500 text-primary h-full flex items-center justify-center"
            >
              <Plus className="h-8 w-8" />
            </Button>
          </div>

          {/* Contact Information */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold uppercase">Contact Information</h2>
              <Button
                onClick={handleToggleContactEdit}
                className="bg-lime-400 hover:bg-lime-500 text-primary text-xs px-4 py-1 h-7 rounded-full"
              >
                {isEditingContact ? "Save" : "Change"}
              </Button>
            </div>

            {isEditingContact ? (
              <div className="space-y-2">
                <Input
                  value={contactInfo?.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  placeholder="Email"
                />
                <Input
                  value={contactInfo?.contact}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, contact: e.target.value })
                  }
                  placeholder="Phone"
                />
                <Button onClick={handleSaveContactInfo} className="mt-2">
                  Save
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                {contactInfo?.email} | +91 {contactInfo?.contact}
              </p>
            )}
          </div>

          {/* Delivery Options */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold uppercase">Delivery Options</h2>
              <Button
                onClick={handleToggleDeliveryEdit}
                className="bg-lime-400 hover:bg-lime-500 text-primary text-xs px-4 py-1 h-7 rounded-full"
              >
                Change
              </Button>
            </div>

            <div className="space-y-6">
              {deliveryItems.map((item) => (
                <div key={item._id} className="flex space-x-4">
                  <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                    <img
                      src={
                        item.productId.pImages[0].URL ||
                        "/placeholder.svg?height=96&width=96"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.productId.pName}</h3>

                    {/* <p className="text-xs text-gray-500">Color {item.variant.color}</p>
                    <p className="text-xs text-gray-500">Standard Delivery by {item.standardDelivery}</p> */}
                    <div className="text-sm text-muted-foreground flex gap-3">
                      <div>
                        Color:{" "}
                        <div
                          className={`h-3 w-3  inline-block rounded-sm`}
                          style={{ backgroundColor: item.variant.color }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.variant.size || "red"}
                      </p>
                    </div>
                    <span className="w-12 text-center  text-sm">
                      Quantity : {item.quantity}
                    </span>

                    {/* <p className="text-xs mt-1">₹{item.productId.pPrice}</p> */}
                    <div className="flex justify-between items-center gap-1.5">
                      <div className="line-through text-gray-400 text-xs">
                        Rs. {item.productId?.pPrice.toFixed(2)}
                      </div>
                      <div className="text-md">
                        Rs.
                        {(
                          (item.productId?.pPrice *
                            (100 - item.productId?.pOffer)) /
                          100
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="max-w-xs">
          <Card className="bg-primary text-secondary p-4 ">
            <h2 className="font-bold mb-4 text-center">CARD TOTALS</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{orderSummary.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>₹{orderSummary.discount}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{orderSummary.tax}</span>
              </div>

              <Separator className="my-2 bg-gray-700" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{orderSummary.total}</span>
              </div>
            </div>
            <CreateOrder
              profile={contactInfo}
              Tamount={orderSummary.total}
              cartItems={createOrderItems}
              addressId={addresses[0]}
              paymentMethod="cash on delivery"
              isPaid="false"
            />
            <RayzerPay profile={contactInfo} amount={orderSummary.total} />

            <div className="mt-6 space-y-2">
              <h3 className="text-center font-bold">COUPON CODE</h3>
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter Email Address"
                className="bg-secondary text-primary"
              />
              <Button
                onClick={handleApplyCoupon}
                className="w-full bg-lime-400 hover:bg-lime-500 text-primary"
              >
                APPLY COUPON
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Mock API functions (replace with actual API calls in a real app)
// async function mockFetchAddresses() {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 500))

//   return [
//     {
//       id: "1",
//       name: "Manus Limbachiya",
//       phone: "+91 8758403944",
//       addressLine: "5, Rajpur, UMA PG, Mahesana, Gujarat - 382715",
//       city: "Mahesana",
//       state: "Gujarat",
//       pincode: "382715",
//       type: "PG",
//       isDefault: true,
//     },
//     {
//       id: "2",
//       name: "Manus Limbachiya",
//       phone: "+91 8758403944",
//       addressLine: "5, Rajpur, UMA PG, Mahesana, Gujarat - 382715",
//       city: "Mahesana",
//       state: "Gujarat",
//       pincode: "382715",
//       type: "Home",
//     },
//     {
//       id: "3",
//       name: "Manus Limbachiya",
//       phone: "+91 8758403944",
//       addressLine: "10, Main Street, Ahmedabad, Gujarat - 380001",
//       city: "Ahmedabad",
//       state: "Gujarat",
//       pincode: "380001",
//       type: "Office",
//     },
//     {
//       id: "4",
//       name: "Manus Limbachiya",
//       phone: "+91 8758403944",
//       addressLine: "15, Park Avenue, Surat, Gujarat - 395007",
//       city: "Surat",
//       state: "Gujarat",
//       pincode: "395007",
//       type: "Other",
//     },
//   ]
// }

// async function mockFetchContactInfo(){
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 300))

//   return {
//     email: "infochrysan4v75@gmail.com",
//     phone: "+91 8758403944",
//   }
// }

// async function mockFetchDeliveryItems() {
//   // Simulate API delay
//   // await new Promise((resolve) => setTimeout(resolve, 400))

//   // return [
//   //   {
//   //     id: "1",
//   //     name: "Adaa Jaipur Comfort Floral Printed Casual Shirt",
//   //     image: "/placeholder.svg?height=96&width=96",
//   //     standardDelivery: "today",
//   //     price: 199,
//   //   },
//   //   {
//   //     id: "2",
//   //     name: "Adaa Jaipur Comfort Floral Printed Casual Shirt",
//   //     image: "/placeholder.svg?height=96&width=96",
//   //     standardDelivery: "today",
//   //     price: 199,
//   //   },
//   // ]

//   let res = await axios.get(`${import.meta.env.VITE_GET_CART_PRODUCT}`);
//         console.log("check ", res.data);
//         let checkItem = res.data.filter((item)=> cartCheckItemsId.includes(item._id))
//         console.log("includesss ", checkItem);

//         return checkItem
// }
