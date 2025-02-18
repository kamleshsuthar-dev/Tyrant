import "./login.css";
import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GoogleBtn } from "../../../App";
import { PasswordCloseEye, PasswordOpenEye } from "../Register/PasswordEye.jsx";


let emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = ({ text }) => {
 
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [responseData, setResponseData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState(null);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false); // Added missing state
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

 
  const checkIsRegistered = async (email) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ISREGISTERED}/isregistered?email=${email}`
      );
      const data = response.data;
            console.log(response);
            
      console.log(data.isAlreadyRegistered,"hhjhh");     
      setIsAlreadyRegistered(data.isAlreadyRegistered);
      return data.isAlreadyRegistered;
    } catch (error) {
      console.error("Error:", error);
      setIsAlreadyRegistered(false);
      return false;
    }
  };

  useEffect(() => {
    if (emailMounted.current) {
      if (credentials.email.length > 1) {
        checkIsRegistered(credentials.email);

        if (emailRegex.test(credentials.email) === false) {
          document.querySelector(".emailText").textContent =
            "Please enter a valid email";
          document.querySelector(".emailText").classList.remove("hidden");
        } else {
          document.querySelector(".emailText").classList.add("hidden");
        }
      }
    } else {
      emailMounted.current = true;
    }
  }, [credentials.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!credentials.email || !credentials.password) {
            console.log("enter valid email");
            if (credentials.email.length < 1) {
              document.querySelector(".emailText").textContent =
                "Email is required";
              document.querySelector(".emailText").classList.remove("hidden");
            }
            if (credentials.password.length < 1) {
              document.querySelector(".passwordText").textContent =
                "Password is required";
              document.querySelector(".passwordText").classList.remove("hidden");
            }
      } else if (!emailRegex.test(credentials.email)) {
        document.querySelector(".emailText").textContent =
          "Please enter a valid email";
        document.querySelector(".emailText").classList.remove("hidden");
        console.log("Please enter a valid email", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (credentials.email && credentials.password) {
        const isUserRegistered = await checkIsRegistered(credentials.email);
        console.log("isUserRegistered", isUserRegistered);

        if (isUserRegistered) {    // true
          try {
            const response = await axios.post(
            `${import.meta.env.VITE_ISREGISTERED}/login`,
              credentials
            );
            console.log(response,"loginnnn");
            
            setResponseData(response.data);
            console.log("data transfer success", response.data.message);
            if (response.data.message === "Logged in successfully") {
              await navigate("/");
            } else if (response.data.message === "Password Invalid") {
              document.querySelector(".invalidEP").classList.remove("hidden");
            }

            setError(null);
          } catch (err) {
            setError(err.message);
            setResponseData(null);
            alert("Invalid email or password");
          }
        } else {   //false
          document.querySelector(".message").classList.remove("hidden");
          document.querySelector(".message").textContent =
          "User Is Not Registered Yet";
        }

     
      } else {
        document.querySelector(".invalidEP").classList.remove("hidden");
      }

   
    } catch (error) {
      console.log("this is err on handle submit", error);
    }
  };

  const emailMounted = useRef(false);

  const emailBlur = () => {
    if (credentials.email.length < 1) {
      document.querySelector(".emailText").textContent = "Email is required";
      document.querySelector(".emailText").classList.remove("hidden");
    }
  };

  const passwordBlur = () => {
    if (credentials.password.length < 1) {
      document.querySelector(".passwordText").textContent =
        "Password is required";
      document.querySelector(".passwordText").classList.remove("hidden");
    }
  };

  const passMounted = useRef(false);
  const emilMounted = useRef(false);

  const togglePass = () => {
    setShowPassword((prev) => !prev);
    console.log("show password", showPassword);
  };

  return (
    <>
      {/* pc design */}
      <div className="bg-white h-screen sm:block hidden w-full border-2 border-solid border-black lg:p-7 p-5 ">
        <div className="relative h-full w-full grid  place-items-center   rounded-2xl  ">
          <img
            src="./images/bgImgJaipur.png"
            alt=""
            className="h-full w-full absolute top-0 bottom-0  rounded-2xl z-[0]"
          />
          <div className="card min-w-[350px] min-h-[60%]  bg-white rounded-xl text-black grid gap-2 items-center p-[52px] font-comfortaa text-lg z-[1]">
            <div className="invalidEP text-red-500 text-sm mt-[2px] text-center mb-6 hidden  ">
              Invaild email and password ? 
            </div>
            <div className="message text-red-500 text-sm mt-[2px] text-center mb-6 hidden  ">
             
            </div>

            <div className="text-3xl col-span-1 row-span-1 font-bold ">
              Sign In To Adaa Jaipur{" "}
            </div>

            <div className=" col-span-1 row-span-1">
              <label
                htmlFor="email"
                className="block  font-medium text-gray-900"
              >
                Email*
              </label>
              <div className="">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  onBlur={emailBlur}
                  value={credentials.email}
                  onChange={handleOnChange}
                  ref={emilMounted}
                  required
                  placeholder="Enter Email"
                  className="border-2 border-solid border-black  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                />
                <div className="emailText text-red-600 text-xs my-1 hidden"></div>
              </div>
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block  font-medium text-gray-900"
                >
                  Password*
                </label>
                <Link
                  to="/forgotpasswordform"
                  className="text-sm text-[#0F7DE3] mt-1"
                >
                  Forgot Password ?
                </Link>
              </div>
              <div className="flex border-2 border-solid border-black w-full rounded-md bg-white">
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  ref={passMounted}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter Password"
                  {...(showPassword ? { type: "text" } : { type: "password" })}
                  onBlur={passwordBlur}
                  //  ref={passwordRef}
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
                <button className="bg-white mr-2" onClick={togglePass}>
                  {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                </button>
              </div>
              <div className="passwordText text-red-600 text-xs my-1 hidden"></div>
            </div>
            <div className="grid gap-1">
              <button
                className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-white text-2xl py-1 hover:scale-[0.95]"
                onClick={handleSubmit}
              >
                Sign In &gt;&gt;
              </button>

              <div className=" text-center leading-none  text-[#3F3F3F] ">
                or
              </div>
              <GoogleBtn text="Sign In with Google" />
            </div>
            <div className="mt-2 text-sm text-center">
              Don't have an account?{" "}
              <NavLink to="/register" className="text-[#0F7DE3]">
                Sign up &rarr;
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* // mobile design  */}
      <div className="sm:hidden flex flex-col justify-between items-center h-screen ">
        <div className="h-[70%] flex justify-center items-center">
          <div className="card w-[350px]  min-w-[286px]  bg-white rounded-xl text-black grid gap-2 items-center p-8 font-comfortaa text-md border-solid border-black ">
            <div className="invalidEP text-red-500 text-sm mt-[2px] text-center mb-6 hidden ">
              Invaild email and password ?
            </div>

            <div>
              <div className="text-3xl col-span-1 row-span-1 font-bold ">
                Sign In To{" "}
              </div>
              <div className="text-3xl col-span-1 row-span-1 font-bold ">
                Adaa Jaipur
              </div>
            </div>
            <div className=" col-span-1 row-span-1">
              <label
                htmlFor="email"
                className="block  font-medium text-gray-900 "
              >
                Email*
              </label>
              <div className="">
                <input
                  type="email"
                  name="email"
                  onBlur={emailBlur}
                  value={credentials.email}
                  onChange={handleOnChange}
                  ref={emilMounted}
                  autoComplete="email"
                  required
                  placeholder="Enter Email"
                  className="border-2 border-solid border-black  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                />
                <div className="emailText text-red-600 text-xs my-1 hidden"></div>
              </div>
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block  font-medium text-gray-900"
                >
                  Password*
                </label>
                <Link  to="/forgotpasswordform" className="text-xs text-[#0F7DE3] mt-1">
                  Forgot Password ?
                </Link>
              </div>
              <div className="flex border-2 border-solid border-black w-full rounded-md bg-white">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter Password"
                  {...(showPassword ? { type: "text" } : { type: "password" })}
                  onBlur={passwordBlur}
                  ref={passMounted}
                  value={credentials.password}
                  onChange={handleOnChange}
                  // ref={passwordRef}
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
                <button className="bg-white mr-2" onClick={togglePass}>
                  {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                </button>
              </div>
              <div className="passwordText text-red-600 text-xs my-1 hidden"></div>
            </div>
            <div className="grid gap-1">
              <button className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-white text-xl py-1 focus:scale-[0.95]"
               onClick={handleSubmit}
              >
                Sign In &gt;&gt;
              </button>

              <div className=" text-center leading-none  text-[#3F3F3F] ">
                or
              </div>

              <GoogleBtn text="Sign In with Google" />

              <div className="mt-2 text-sm text-center">
                Don't have an account?{" "}
                <NavLink to="/register" className="text-[#0F7DE3]">
                  Sign up &rarr;
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <img
          src="./images/bgImgJaipur.png"
          alt=""
          className="h-[30%] w-full object-cover"
        />
      </div>
    </>
  );
};

export default Login;
