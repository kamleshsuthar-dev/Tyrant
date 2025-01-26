import "../Login/login.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleBtn } from "../../../App";
import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { MdLockOutline } from "react-icons/md";
import { Box, Container } from "@mui/system";
import { NavLink } from "react-router-dom";

function NewRegister({text}) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [item, setItem] = useState();
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();


  //  focus 
  const nameRef =useRef()
  const emailRef =useRef()
  const passwordRef =useRef()
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    // Check if the input is focused
    setIsFocused(inputRef.current === document.activeElement);
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  };

 

  const isResgis = useCallback(() => {
    axios
      .get(
        `https://expresstest-31m8.onrender.com/api/auth/isregistered?email=${credentials.email}`
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        console.log(data.isAlreadyRegistered);
        setIsRegistered(data.isAlreadyRegistered);
        return data.isAlreadyRegistered;
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          // Handle conflict
          console.log("Conflict:", error.response.data);
        } else {
          // Handle other errors
          console.log("Error:", error);
        }
      });
  }, []);

  if(emailRef.activeElement === true) {
    console.log(true);
    
  }else{
    false
  }
  // console.log(isFocused)

  // if(isFocused == false) {
  //        useEffect(() => {
  //   isResgis();
  // }, []);
  //   const isResgister  = useEffect(()=>{
  //         isResgis()
  //       },[handleOnChange])
  // }
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (!credentials.name && !credentials.email && !credentials.password) {
        console.log("All fields are required", {
          autoClose: 500,
          theme: "colored",
        });
        // toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
      } else if (credentials.name.length < 1) {
        console.log("Please enter valid name", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (emailRegex.test(credentials.email) === false) {
        console.log("Please enter valid email", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (credentials.password.length < 8) {
        console.log("Please enter password with more than 8 characters", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (
        credentials.email &&
        credentials.name &&
        credentials.password
      ) {
        if (isRegistered === false) {
          axios
            .post(
              "https://expresstest-31m8.onrender.com/api/auth/register",
              credentials
            )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log("error is occur in register api ", error);
            });
        } else {
          console.log("user is already exist");
        }
      }
    } catch (error) {
      console.log("try catch err ", error);
    }
  };

  return (
    <>
      {/* for pc */}
      <div className="h-screen max-w-[1200px] w-screen sm:flex hidden  p-10 m-auto ">
        <div className="lg:h-full h-[90vh] w-[50%] mr-5 ">
          <img
            src="./images/bgImgJaipur.png"
            alt=""
            className="lg:h-full h-[90vh] w-full object-cover rounded-xl "
          />
        </div>
        <div className="h-full w-[50%] ml-5  rounded-xl border-2 border-red">
         
            <div className=" h-full w-full grid  place-items-center    rounded-2xl  ">
              <div className="card min-w-[350px] min-h-[60%]  bg-white rounded-xl text-black grid gap-2 items-center p-[52px] font-comfortaa text-lg ">
              
                <div className="text-3xl col-span-1 row-span-1 font-bold ">
                  Sign Up To Adaa Jaipur{" "}
                </div>

                <div className=" col-span-1 row-span-1">
                  <label htmlFor="text" className="block  font-medium text-gray-900">
                    Name*
                  </label>
                  <div className="">
                    <input
                      type="name"
                      name="name"
                       
                      required
                      value={credentials.name}
                      onChange={handleOnChange}
                    
                      placeholder="Enter Name"
                      className='border-2 border-solid border-black  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400 sm:text-sm/6 '
                    />
                  </div>
                </div>

                <div className=" col-span-1 row-span-1">
                  <label htmlFor="email" className="block  font-medium text-gray-900">
                    Email*
                  </label>
                  <div className="">
                    <input
                      type="email"
                      name="email"
                     ref={emailRef}
                      value={credentials.email}
                      onChange={handleOnChange}
                      autoComplete="email"
                      required
                      placeholder="Enter Email"
                      className="border-2 border-solid border-black  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400 sm:text-sm/6"
                    />
                  </div>
                  <div className="text-red-600 text-xs my-1">Envalid email </div>

                </div>

                <div className=" col-span-1 row-span-1">
                  <div className="flex justify-between">
                    <label
                      htmlFor="password"
                      className="block  font-medium text-gray-900"
                    >
                      Password*
                    </label>
                  
                  </div>
                  <div className="">
                    <input
                      type="password"
                      name="password"
                      
                      required
                      value={credentials.password}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      className="border-2 border-solid border-black block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900   placeholder:text-gray-400   sm:text-sm/6"
                    />
                  </div>
                  <div className="text-red-600 text-xs my-1">password should be at least 8 characters</div>
                </div>
                <div className="grid gap-1">
                  <div  className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-white text-2xl py-1 hover:scale-[0.95] "   onClick={handleSubmit}>
                   Sign Up &gt;&gt;
                  </div>

                  <div className=" text-center leading-none  text-[#3F3F3F] ">
                    or
                  </div>
                  <GoogleBtn text= "Sign Up wih Google"/>
                </div>
                <div className="mt-2 text-sm text-center">
                  Don't have an account?{" "}
                  <NavLink to="/login" className="text-[#0F7DE3]">
                  Sign In &rarr;
                  </NavLink>
                </div>
              </div>
            </div>
         
        </div>
      </div>

      {/* for mobile */}

      <div className=" h-screen sm:hidden flex flex-col justify-between">
              <div className="relative h-[30%] w-full  bg-center  flex items-center justify-center">
              <img src="./images/bgImgJaipur.png" alt="" className='h-full w-full absolute top-0 bottom-0  rounded-2xl z-[0]' />
              <div className="text-4xl  font-bold text-white z-[1]">
                Sign Up To Adaa Jaipur
              </div>
              </div>
              <div className="h-[70%] w-full flex justify-center ">
              <div className="card w-[450px] min-h-[60%]  bg-white rounded-xl text-black grid gap-2 items-center p-[52px] font-comfortaa text-lg ">
              
  
              <div className=" col-span-1 row-span-1">
                <label htmlFor="text" className="block  font-medium text-gray-900">
                  Name*
                </label>
                <div className="">
                  <input
                    type="name"
                    name="name"
                     
                    required
                    value={credentials.name}
                    onChange={handleOnChange}
                    placeholder="Enter Name"
                    className="border-2 border-solid border-black  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className=" col-span-1 row-span-1">
                <label htmlFor="email" className="block  font-medium text-gray-900">
                  Email*
                </label>
                <div className="">
                  <input
                    type="email"
                    name="email"
                      
                    value={credentials.email}
                    onChange={handleOnChange}
                    autoComplete="email"
                    required
                    placeholder="Enter Email"
                    className="border-2 border-solid border-black  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                  />
                </div>
                <div className="text-red-600 text-xs my-1">Envalid email </div>

              </div>

              <div className=" col-span-1 row-span-1">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block  font-medium text-gray-900"
                  >
                    Password*
                  </label>
                 
                </div>
                <div className="">
                  <input
                    type="password"
                    name="password"
                    
                    required
                    value={credentials.password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="border-2 border-solid border-black block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                  />
                </div>
                <div className="text-red-600 text-xs my-1">password should be at least 8 characters</div>
              </div>
              <div className="grid gap-1">
                <div  className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-white text-xl py-1 hover:scale-[0.95] "   onClick={handleSubmit}>
                 Sign Up &gt;&gt;
                </div>

                <div className=" text-center leading-none  text-[#3F3F3F] ">
                  or
                </div>
                <GoogleBtn text= "Sign Up wih Google"/>
              </div>
              <div className="mt-2 text-sm text-center">
                Don't have an account?{" "}
                <NavLink to="/login" className="text-[#0F7DE3]">
                Sign In &rarr;
                </NavLink>
              </div>
            </div>
              </div>
      </div>
    </>
  );
}

export default NewRegister;
