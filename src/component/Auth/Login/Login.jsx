import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GoogleBtn } from "../../../App";
import { PasswordCloseEye, PasswordOpenEye } from "../Register/PasswordEye.jsx";
import "./login.css";
import { Button } from "@/components/ui/button";

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
  const location = useLocation();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const checkIsRegistered = async (email) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ISREGISTERED}/isregistered?email=${email}`,
      );
      const data = response.data;
      console.log(response);

      console.log(data.isAlreadyRegistered, "loginnn page");
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
      }
      if (!emailRegex.test(credentials.email)) {
        document.querySelector(".emailText").textContent =
          "Please enter a valid email";
        document.querySelector(".emailText").classList.remove("hidden");
        console.log("Please enter a valid email", {
          autoClose: 500,
          theme: "colored",
        });
      }
      if (!credentials.password > 8) {
        document.querySelector(".passwordText").textContent =
          "Password is required ";
        document.querySelector(".passwordText").classList.remove("hidden");
      }
      if (credentials.email && credentials.password) {
        const isUserRegistered = await checkIsRegistered(credentials.email);
        console.log("isUserRegistered", isUserRegistered);

        if (isUserRegistered) {
          // true
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_ISREGISTERED}/login`,
              credentials,
              { withCredentials: true },
            );
            console.log(response, "loginnnn");

            setResponseData(response.data);
            console.log("data transfer success", response.data.message);
            if (response.data.message === "Logged in successfully") {
              // const from = location.state?.from?.pathname || "/";
              // navigate(from, { replace: true });
              // console.log("Location State:", location.state);
              // console.log("Redirecting to:", from);
              // window.history.back();
              await navigate("/");
            } else if (response.data.message === "Password Invalid") {
              // document.querySelector(".invalidEP").classList.remove("hidden");
              document.querySelector(".message").classList.remove("hidden");
              document.querySelector(".message").textContent =
                "Invalid email or password";
            }

            setError(null);
          } catch (err) {
            console.log(err);

            setError(err.message);
            setResponseData(null);
            alert("Invalid email or password");
          }
        } else {
          //false
          document.querySelector(".message").classList.remove("hidden");
          document.querySelector(".message").textContent =
            "User Is Not Registered Yet";
          setTimeout(() => {
            document.querySelector(".message").classList.add("hidden");
          }, 3000);
        }
      } else {
        // document.querySelector(".invalidEP").classList.remove("hidden");
        document.querySelector(".message").textContent =
          " Invaild email and password ?";
        document.querySelector(".message").classList.remove("remove");
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
      <div className="bg-secondary h-screen sm:block hidden w-full border-2 border-solid borderprimary lg:p-7 p-5 ">
        <div className="relative h-full w-full grid  place-items-center   rounded-2xl  ">
          <img
            src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1746086512/SignIn_vmdpjc.png"
            alt=""
            className="h-full w-full absolute top-0 bottom-0  rounded-2xl z-[0] object-cover"
          />
          <div className="card min-w-[350px] min-h-[60%]  bg-secondary rounded-xl text-primary grid gap-2 items-center p-[52px] font-comfortaa text-lg z-[1]">
            {/* <div className="invalidEP text-red-500 text-sm mt-[2px] text-center mb-6 hidden  ">
              Invaild email and password ? 
            </div> */}
            <div className="message text-red-500 text-sm mt-[2px] text-center mb-6 hidden  "></div>

            <div className="text-3xl col-span-1 row-span-1 font-bold ">
              Sign In To Tyrant{" "}
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
                  className="border-2 border-solid borderprimary  block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
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
              <div className="flex border-2 border-solid borderprimary w-full rounded-md bg-secondary">
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
                  className=" block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
                <button className="bg-secondary mr-2" onClick={togglePass}>
                  {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                </button>
              </div>
              <div className="passwordText text-red-600 text-xs my-1 hidden"></div>
            </div>
            <div className="grid gap-1">
              <Button
                className="col-span-1 row-span-1 rounded-xl block text-center text-2xl py-1 active:scale-[0.95]"
                onClick={handleSubmit}
              >
                Sign In &gt;&gt;
              </Button>

              <div className=" text-center leading-none  text-[#3F3F3F] ">
                or
              </div>
              <GoogleBtn text="Sign In with Google" />
            </div>
            <div className="mt-2 text-sm text-center">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="text-[#0F7DE3] hover:underline"
              >
                Sign up &rarr;
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* // mobile design  */}
      <div className="sm:hidden flex flex-col justify-between items-center h-screen ">
        <div className="h-[70%] flex justify-center items-center">
          <div className="card w-[350px]  min-w-[286px]  bg-secondary rounded-xl text-primary grid gap-2 items-center p-8 font-comfortaa text-md border-solid borderprimary ">
            {/* <div className="invalidEP text-red-500 text-sm mt-[2px] text-center mb-6 hidden ">
              Invaild email and password ?
            </div> */}
            <div className="message text-red-500 text-sm mt-[2px] text-center mb-6 hidden  "></div>
            <div>
              <div className="text-3xl col-span-1 row-span-1 font-bold ">
                Sign In To{" "}
              </div>
              <div className="text-3xl col-span-1 row-span-1 font-bold ">
                Tyrant
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
                  className="border-2 border-solid borderprimary  block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
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
                  className="text-xs text-[#0F7DE3] mt-1"
                >
                  Forgot Password ?
                </Link>
              </div>
              <div className="flex border-2 border-solid borderprimary w-full rounded-md bg-secondary">
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
                  className=" block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
                <button className="bg-secondary mr-2" onClick={togglePass}>
                  {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                </button>
              </div>
              <div className="passwordText text-red-600 text-xs my-1 hidden"></div>
            </div>
            <div className="grid gap-1">
              
              <Button
                className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-secondary text-xl py-1 active:scale-[0.95] hover:bg-[#232222]"
                onClick={handleSubmit}
              >
                Sign In &gt;&gt;
              </Button>

              <div className=" text-center leading-none  text-[#3F3F3F] ">
                or
              </div>

              <GoogleBtn text="Sign In with Google" />

              <div className="mt-2 text-sm text-center">
                Don't have an account?{" "}
                <NavLink
                  to="/register"
                  className="text-[#0F7DE3] hover:underline"
                >
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
