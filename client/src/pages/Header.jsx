"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


import { Heart, Home, List, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
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
      <header className=" text-secondary ">

        <div className="h-8 text-[14px]  hidden  bg-primary text-primary-foreground  md:flex justify-center items-center capitalize">
         {isAdmin ? 
         <>
         <NavLink to="/admin/category/all" className="capitalize font-bold ml-5">Admin Dashboard :</NavLink> 
         <span className="capitalize  ml-5">show me your pom pom and get 90% OFF</span>
         </>
         : `Tell me something that i don't Know ,get 90% OFF`} 
        </div>

        <nav
          aria-label="Global"
          className="h-15 w-screen flex items-center justify-between px-6 py-3 lg:py-[10px] lg:px-8 bg-secondary text-secondary-foreground "
        >
          {/* Mobile menu button - now positioned on the left */}
         <div className="w-full relative flex md:justify-center lg:justify-start items-center">

       
          <div className="menu absolute  left-0 flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button variant="ghost" size="icon" className="lg:hidden">
                  <List className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </button>
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
                  <NavItem
                    icon={<ShoppingCart className="mr-3 h-5 w-5" />}
                    label="Admin"
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
        
            <NavLink to="/" className="md-m-1.5 md:p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="fuck off" src="/Tyrant.svg" className="h-full w-full scale-75 md:scale-100  " />
            </NavLink>
         
          <div className="hidden lg:flex  xl:gap-7 gap-4 items-center xl:text-xl text-lg  ">
            <NavLink to="/" className="flex items-center gap-x-1 justify-center" >Trends <img src="/svg/TrendIcon.svg" alt=""  /></NavLink>
            <NavLink to="/">Collection</NavLink>
            <NavLink to="/">Color</NavLink>
            <NavLink to="/">Showcase</NavLink>
            <NavLink to="/" className="wrap-none text-nowrap">About Us</NavLink>

            {/* { isAdmin ?  <NavLink to="/admin/category/all">Admin Dashboard</NavLink> :  } */}
           
          </div>
         </div>

        

          {/* Search bar and user controls */}
          <div className="flex w-fit items-center md:justify-end gap-x-2 xl:gap-x-5 lg:gap-x-4">
            <div className="flex items-center gap-2 px-2 border-none md:border md:border-secondary-foreground rounded-xl text-sm md:outline md:outline-2 md:outline-secondary-foreground outline-offset-1">
              <span className="shrink-0 mr-4">
                  <img src="/Search Icon.svg" alt="Search" className="object-contain" />
                </span>
                <input
                  type="search"
                  placeholder="Search For Dildos And Condoms"
                  className="px-3 py-2 xl:w-96 lg:w-72 md:w-40 bg-transparent placeholder:text-primary outline-none hidden md:block"
                />
              </div>  


            <NavLink to={isLogin ? "./profile" : "./login"}>
              <Button  className={`${isLogin ? "rounded-full" : "rounded-xl"} `}  size={`${isLogin ? "icon" : "default"}`}>

                  {isLogin ? <img src="/svg/profileIcon.svg" alt=""  />: "Login"}

              </Button>
            </NavLink>

            <NavLink to="/shoppingcart">
             <button className="h-9 p-4  bg-accent text-primary border-primary border-4 rounded-xl flex items-center justify-center gap-2">
                <img src="/svg/shoppingCartIcon.svg" alt="" className="" />
                <div className="h-full flex items-center text-neutral-800 text-2xl font-normal font-automata">
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
        // navigate("/productlist/67ab9caa61b7763a0938c690");
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
