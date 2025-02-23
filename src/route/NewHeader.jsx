"use client";

import { useCallback, useEffect, useState,} from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link, NavLink } from "react-router-dom";
import { User, ShoppingCart, Home, Heart, List, X } from "lucide-react";
import { useGoogleAuthContext } from "@/context/GoogleAuth";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const { isLoginUser,setIsLoginUser } = useGoogleAuthContext();
  
  let navigate = useNavigate()
  const [isLogin , setIsLogin]=useState(false)  

  useEffect(() => {
    (async () => {
      try {
        // console.log("Document cookies before request:", document.cookie);

        let response =  await axios.get(`${import.meta.env.VITE_ISREGISTERED}/me`, { withCredentials:true })

        console.log("Response:", response.data.success);
              setIsLogin (response.data.success)
              setIsLoginUser(response.data.success)

      } catch (error) {
        console.error("Error object:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error response:", error.response.data.message);
          console.error("Error response:", error.response.data.success);
          setIsLoginUser(error.response.data.success)

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
      <header className="bg-black text-white">
        <div className="h-12 bg-white text-gray-400 flex justify-center items-center ">
          show me your POM POM ,get 90% OFF{" "}
          {/* <button onClick={btnclick}>click</button> */}
        </div>

        <nav
          aria-label="Global"
          className=" flex max-w-8xl items-center justify-between px-6 py-3 lg:px-8 bg-black text-white"
        >
          <div className="relative flex lg:flex-1 left-14">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="fuck off"
                src="/Nemesis.svg"
                className=" h-auto w-16"
              />
            </NavLink>
          </div>

          {/* mobile design  */}
          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="flex md:hidden">
                  <List className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] p-0 bg-gradient-to-b from-gray-900 to-black text-white border-r border-gray-800">
                <div className="flex justify-between items-center p-4 border-b border-gray-800">
                  <h2 className="text-xl font-bold">Menu</h2>
                  {/* <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </SheetTrigger> */}
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
                  <Button
                    variant="outline"
                    onClick={()=>navigate('/login')}
                    className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
                  >                
                    Sign In
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <NavLink to="/">
                <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold  outline-none">
                  list
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-5 flex-none "
                  />
                </PopoverButton>
              </NavLink>
              <PopoverPanel
                transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                    >
                      <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          aria-hidden="true"
                          className="size-6 text-gray-600 group-hover:text-indigo-600"
                        />
                      </div>
                      <div className="flex-auto">
                        <NavLink
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </NavLink>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <NavLink to="/productlist" className="text-sm/6 font-semibold">
              ProductList
            </NavLink>
            <NavLink to="/wishlist" className="text-sm/6 font-semibold ">
              wishlist
            </NavLink>
          </PopoverGroup>
          {/* search bar */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-8">
            <div className="relative">
              <input
                type="search"
                placeholder="SEARCH"
                className="pl-8 pr-2 py-1 w-64 bg-transparent border border-gray-600 rounded text-sm focus:outline-none focus:border-gray-400"
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
            <NavLink to={isLogin==true ? "./profile" : "./login"}>
              <button className="px-4 py-1 bg-white border text-black border-gray-300 rounded-md hover:bg-gray-100  flex items-center">
                <User className="h-4 w-4 mr-2" />
                  {
                      isLogin == true ? "PROFILE":"LOGIN" 
                  }
              </button>
            </NavLink>
            <NavLink to="/shoppingcart">
              <button className="px-4 py-1 bg-white border text-black border-gray-300 rounded-md hover:bg-gray-100  flex items-center">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-700" />
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </div>
              </button>
            </NavLink>
          </div>
        </nav>

        {/* mobile design  1*/}
        {/* <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-800 text-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
                  <div>
              <NavLink to="https://google.com" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src=""
                  className="h-8 w-auto"
                />
          
              </NavLink>
                </div>
          
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-white hover:bg-gray-50">
                      list
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="size-5 flex-none group-data-[open]:rotate-180"
                      />
                    </DisclosureButton>
                
                  </Disclosure>
                 
                  <NavLink
                    to="/productlist"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                  >
                    Productlist
                  </NavLink>
                  <NavLink
                    to="/shoppingcart"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                  >
                    Cart
                  </NavLink>
                  <NavLink
                    to=""
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-50"
                  >
                    Company
                  </NavLink>
                </div>

                <NavLink
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-50"
                >
                  <button>
                  Login
                  </button>
                </NavLink>
              </div>
            </div>
          </DialogPanel>
        </Dialog> */}
      </header>
    </>
  );
}


const NavItem = ({ icon, label, active = false }) => {

  let navigate = useNavigate()
const handleOnClick =(e)=> {
  
  const label = e.currentTarget.textContent.trim().toLowerCase();
      console.log(label);

   switch (label){
      case "home" : navigate('/') 
      break;
      case "products": navigate('/productlist') 
      break;
      case "wishlist" : navigate('/wishlist')
      break;
      case "cart" : navigate('shoppingcart')
   } 
}

  return (
    <Button
      variant="ghost"
      onClick={handleOnClick}
      className={`w-full justify-start ${
        active
          ? "bg-gray-800 text-white"
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      }`}
    >
      {icon}
      {label}
    </Button>
  );
};
