"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


import axios from "axios";
import { Heart, Home, List, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartProduct } from "@/store/action/shoppingCartAction";


 
export default function Header() {
  const {isLogin} = useSelector(state=>state?.auth)
  const  cartLength = useSelector(state=>state?.shoppingCart.cartItems).length
  const dispatch = useDispatch()
  console.log(cartLength);

  useEffect(()=>{
    dispatch(fetchCartProduct())
  },[])
  
  const isAdmin = useIsAdmin()
  

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // console.log("Document cookies before request:", document.cookie);

  //       let response = await axios.get(
  //         `${import.meta.env.VITE_ISREGISTERED}/me`,
  //         { withCredentials: true },
  //       );

  //       console.log("Response:", response.data);
  //       setIsLogin(response.data.success);
  //       setIsLoginUser(response.data.success);
  //       setUserDetails(response.data.user);
  //     } catch (error) {
  //       console.error("Error object:", error);
  //       if (error.response) {
  //         console.error("Error response:", error.response.data);
  //         console.error("Error response:", error.response.data.message);
  //         console.error("Error response:", error.response.data.success);
  //         setIsLoginUser(error.response.data.success);
  //       } 
  //     }
  //   })();
  // }, []);

  return (
    <>
      <header className=" text-secondary">
        <div className="h-8 text-[14px] mb-1 hidden  bg-primary text-primary-foreground  md:flex justify-center items-center capitalize">
          Tell me something that i don't Know ,get 90% OFF{" "}
          {/* <button onClick={btnclick}>click</button> */}
        </div>
        <nav
          aria-label="Global"
          className="flex max-w-8xl items-center justify-between  px-6  lg:px-8 bg-secondary text-secondary-foreground border-2 border-red-500 border-dashed"
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
              <img alt="fuck off" src="/Tyrant.svg" className="h-full w-full  " />
            </NavLink>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden lg:flex ml-9 gap-10 items-center text-lg font-medium font-['Quicksand']">
            <NavLink to="/">Trends</NavLink>
            <NavLink to="/">Collection</NavLink>
            <NavLink to="/">Color</NavLink>
            <NavLink to="/">Showcase</NavLink>
            <NavLink to="/" className="wrap-none text-nowrap">About Us</NavLink>

            { isAdmin ?  <NavLink to="/admin/category/all">Admin Dashboard</NavLink> : null }
           
          </div>

          {/* Search bar and user controls */}
          <div className="flex md:flex  md:justify-end gap-x-2 lg:gap-5">
            
            <div className="relative flex items-center px-2 md:border border-none outline-none md:outline-2 md:outlinesecondary  md:bordersecondary rounded-xl text-sm outline-offset-1 outline-secondary-foreground  border-secondary-foreground ">
              <img src="./Search Icon.svg" alt="" className="" />
              <input
                type="search"
                placeholder="Search For Jacks And Condoms"
                className="px-2  lg:w-96 md:w-40 w-5 bg-transparent placeholder:text-primary outline-none"
              />
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
             <button className="h-12 px-2 py-1 bg-accent text-primary border-primary border-4 rounded-2xl flex items-center justify-center gap-2">
                <img src="./ShoppingCartIcon.svg" alt="" className="h-full pt-2 object-contain" />
                <div className="h-full flex items-center text-neutral-800 text-2xl font-normal font-['AUTOMATA']">
                  {cartLength}
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
