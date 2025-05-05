"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGoogleAuthContext } from "@/context/GoogleAuth";
import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Heart, Home, List, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  // { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  // { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function NewHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    setIsLoginUser,
    setUserDetails,
    cartQuantity = 0,
  } = useGoogleAuthContext();
  //  console.log(cartQuantity,"fgfdgdfg");

  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // console.log("Document cookies before request:", document.cookie);

        let response = await axios.get(
          `${import.meta.env.VITE_ISREGISTERED}/me`,
          { withCredentials: true },
        );

        // console.log("Response:", response.data);
        setIsLogin(response.data.success);
        setIsLoginUser(response.data.success);
        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error object:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error response:", error.response.data.message);
          console.error("Error response:", error.response.data.success);
          setIsLoginUser(error.response.data.success);
        } // console.error("Status:", error.response.status);
        // console.error("Headers:", error.response.headers);
        // } else if (error.request) {
        //   console.error("No response received:", error.request);
        // } else {
        //   console.error("Error message:", error.message);
        // }
      }
    })();
  }, []);

  return (
    <>
      <header className="bg-primary text-secondary">
        <div className="h-10 hidden  bg-secondary text-gray-400 md:flex justify-center items-center capitalize">
          Tell me something that i don't Know ,get 90% OFF{" "}
          {/* <button onClick={btnclick}>click</button> */}
        </div>

        <nav
          aria-label="Global"
          className="flex max-w-8xl items-center justify-between  px-6 py-3 lg:px-8 bg-primary text-secondary"
        >
          {/* Mobile menu button - now positioned on the left */}
          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <List className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] p-0 bg-gradient-to-b from-gray-900 toprimary text-secondary border-r border-gray-800">
                <div className="flex justify-between items-center p-4 border-b border-gray-800">
                  <h2 className="text-xl font-bold">Menu</h2>
                </div>

                <div className="py-6 px-4 space-y-2">
                  <NavItem
                    icon={<Home className="mr-3 h-5 w-5" />}
                    label="Home"
                    active
                  />
                  <NavItem
                    icon={<List className="mr-3 h-5 w-5" />}
                    label="Products"
                  />
                  <NavItem
                    icon={<Heart className="mr-3 h-5 w-5" />}
                    label="Wishlist"
                  />
                  <NavItem
                    icon={<ShoppingCart className="mr-3 h-5 w-5" />}
                    label="Cart"
                  />
                </div>

                <div className="mt-auto p-4 border-t border-gray-800">
                  <NavLink to={isLogin == true ? "./profile" : "./login"}>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-gray-400 hover:text-secondary hover:bg-gray-800"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {isLogin == true ? "PROFILE" : "LOGIN"}
                    </Button>
                  </NavLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo - centered for mobile, left for desktop */}
          <div className=" flex justify-self-start md:justify-center lg:justify-start">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="fuck off" src="/Nemesis.svg" className="h-auto w-16" />
            </NavLink>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden lg:flex ml-9 gap-5 items-center">
            <NavLink to="/">List</NavLink>
            <NavLink to="/">Jackets</NavLink>
            <NavLink to="/">Services</NavLink>
            <NavLink to="/">About</NavLink>
            <NavLink to="/">Contact</NavLink>
          </div>

          {/* Search bar and user controls */}
          <div className="flex md:flex  md:justify-end gap-2 lg:gap-5">
            <div className="relative flex items-center">
              <input
                type="search"
                placeholder="SEARCH"
                className="pl-8 pr-2 py-1 lg:w-96 md:w-40 w-5 bg-transparent placeholder:text-secondary md:border border-none outline-none md:outline-2 md:outlinesecondary  md:bordersecondary rounded text-sm focus:outline-offset-1 focus:outline-gray-500  focus:border-gray-400 "
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-secondary"
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

            <NavLink to={isLogin ? "./profile" : "./login"}>
              <button className="p-2 lg:px-4 lg:py-1 bg-secondary border text-primary border-gray-300 rounded-full lg:rounded-md hover:bg-gray-100 flex items-center h-full">
                <User className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">
                  {isLogin ? "PROFILE" : "LOGIN"}
                </span>
              </button>
            </NavLink>

            <NavLink to="/shoppingcart">
              <button className="px-4 py-1 bg-secondary border text-primary border-gray-300 rounded-md hover:bg-gray-100 flex items-center">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-700" />
                  <span className="absolute -top-2 -right-2 bg-green-500 text-secondary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartQuantity}
                  </span>
                </div>
              </button>
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  );
}

const NavItem = ({ icon, label, active = false }) => {
  let navigate = useNavigate();
  const handleOnClick = (e) => {
    const label = e.currentTarget.textContent.trim().toLowerCase();
    console.log(label);

    switch (label) {
      case "home":
        navigate("/");
        break;
      case "products":
        navigate("/productlist/67ab9caa61b7763a0938c690");
        break;
      case "wishlist":
        navigate("/wishlist");
        break;
      case "cart":
        navigate("shoppingcart");
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleOnClick}
      className={`w-full justify-start ${
        active
          ? "bg-gray-800 text-secondary"
          : "text-gray-400 hover:text-secondary hover:bg-gray-800"
      }`}
    >
      {icon}
      {label}
    </Button>
  );
};
