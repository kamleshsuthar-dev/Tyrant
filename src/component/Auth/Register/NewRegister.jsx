import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleBtn } from "../../../App";
import "../Login/login.css";
import { PasswordCloseEye, PasswordOpenEye } from "./PasswordEye";
import { Button } from "@/components/ui/button";

function NewRegister({ text }) {
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
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const emailMounted = useRef(false);
  const passMounted = useRef(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (emailMounted.current) {
      const isResgis = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_ISREGISTERED}/isregistered?email=${credentials.email}`,
          );
          const data = response.data;
          // console.log("Response data:", data);
          setIsRegistered(data.isAlreadyRegistered);
          return data.isAlreadyRegistered; // Return the value to use later
        } catch (error) {
          if (error.response && error.response.status === 409) {
            // Handle conflict
            console.log("Conflict:", error.response.data);
          } else {
            // Handle other errors
            console.log("Error:", error);
          }
        }
      };

      if (credentials.email) {
        const isRegistered = isResgis();
        // Ensure you handle the result of the async function
        isRegistered.then((isRegistered) => {
          if (isRegistered) {
            console.log("User is already registered.");
            document.querySelector(".emailText").classList.remove("hidden");
            document.querySelector(".emailText").textContent =
              "User is already registered please Login";
          } else {
            if (emailRegex.test(credentials.email) === false) {
              document.querySelector(".emailText").classList.remove("hidden");
              document.querySelector(".emailText").textContent =
                "Please enter valid email";
            } else {
              document.querySelector(".emailText").classList.add("hidden");
            }
          }
        });
      }
    } else {
      emailMounted.current = true;
    }
  }, [credentials.email]);

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (credentials.name.length >= 1) {
      document.querySelector(".nameText").classList.add("hidden");
    }
  }, [credentials.name]);

  const nameBlur = () => {
    if (credentials.name.length < 1) {
      document.querySelector(".nameText").classList.remove("hidden");
      document.querySelector(".nameText").textContent = "Name is required ";
    }
  };

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

  useEffect(() => {
    if (passMounted.current) {
      if (credentials.password.length < 8) {
        document.querySelector(".passwordText").textContent =
          "Enter password with more than 8 characters";
      } else {
        document.querySelector(".passwordText").classList.add("hidden");
        console.log("password is greater than 8 characters");
      }
    } else {
      passMounted.current = true;
    }
  }, [credentials.password]);

  // console.log(isFocused)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!credentials.name || !credentials.email || !credentials.password) {
        if (credentials.name.length < 1) {
          document.querySelector(".nameText").classList.remove("hidden");
        }
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

        console.log("All fields are required", {
          autoClose: 500,
          theme: "colored",
        });
        // toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
      }
      if (credentials.name.length < 1) {
        document.querySelector(".nameText").classList.remove("hidden");
        document.querySelector(".nameText").textContent = "Name is required";
      }
      if (emailRegex.test(credentials.email) === false) {
        document.querySelector(".emailText").textContent =
          "Enter a Valid Email ";
        document.querySelector(".emailText").classList.remove("hidden");
      }

      if (credentials.password.length < 1) {
        document.querySelector(".passwordText").textContent =
          "Password is required";
        document.querySelector(".passwordText").classList.remove("hidden");
      } else if (credentials.password.length < 8) {
        document.querySelector(".passwordText").textContent =
          "Password Should Be More Then 8 letter";
        document.querySelector(".passwordText").classList.remove("hidden");
      }
      if (credentials.email && credentials.name && credentials.password) {
        if (isRegistered === false) {
          // otp here
          navigate("/otp", { state: { credentials } });
        } else {
          console.log("user is already exist");
          navigate("/login");
        }
      }
    } catch (error) {
      console.log("try catch err ", error);
    }
  };

  const togglePass = () => {
    setShowPassword((prev) => !prev);
    console.log("show password", showPassword);
  };

  return (
    <>
      {/* for pc */}
      <div className="h-screen max-w-[1200px] w-screen sm:flex hidden  p-10 m-auto ">
        <div className="lg:h-full h-[90vh] w-[50%] mr-5 ">
          <img
            src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1745905391/SignUp_qwit1e.png"
            alt=""
            className="lg:h-full h-[90vh] w-full object-cover rounded-xl "
          />
        </div>
        <div className="h-full w-[50%] ml-5  rounded-xl border-2 border-red">
          <div className=" h-full w-full grid  place-items-center    rounded-2xl  ">
            <div className="card min-w-[350px] min-h-[60%]  bg-secondary rounded-xl text-primary grid gap-2 items-center p-[52px] font-comfortaa text-lg ">
              <div className="text-3xl col-span-1 row-span-1 font-bold ">
                Sign Up To Tyrant{" "}
              </div>

              <div className=" col-span-1 row-span-1">
                <label
                  htmlFor="text"
                  className="block  font-medium text-gray-900"
                >
                  Name*
                </label>
                <div className="">
                  <input
                    type="name"
                    name="name"
                    onBlur={nameBlur}
                    ref={nameRef}
                    required
                    value={credentials.name}
                    onChange={handleOnChange}
                    placeholder="Enter Name"
                    className="border-2 border-solid borderprimary  block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400 sm:text-sm/6 "
                  />
                </div>
                <div className="nameText text-red-600 text-xs my-1 hidden">
                  {" "}
                </div>
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
                    ref={emailRef}
                    value={credentials.email}
                    onBlur={emailBlur}
                    onChange={handleOnChange}
                    autoComplete="email"
                    required
                    placeholder="Enter Email"
                    className="border-2 border-solid borderprimary  block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400 sm:text-sm/6"
                  />
                </div>

                <div className="emailText text-red-600 text-xs my-1 hidden"></div>
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
                <div className="flex border-2 border-solid borderprimary w-full rounded-md bg-secondary">
                  <input
                    type="password"
                    name="password"
                    {...(showPassword
                      ? { type: "text" }
                      : { type: "password" })}
                    ref={passwordRef}
                    required
                    value={credentials.password}
                    onChange={handleOnChange}
                    onBlur={passwordBlur}
                    placeholder="Enter Password"
                    className=" border-none outline-none w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900   placeholder:text-gray-400   sm:text-sm/6"
                  />
                  <button className="bg-secondary mr-2" onClick={togglePass}>
                    {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                  </button>
                </div>
                <div className="passwordText text-red-600 text-xs my-1 hidden"></div>
              </div>
              <div className="grid gap-1">
                <Button
                  className="col-span-1 row-span-1 rounded-xl  block text-center py-1 active:scale-[0.95] "
                  onClick={handleSubmit}
                >
                  Sign Up &gt;&gt;
                </Button>

                <div className=" text-center leading-none  text-[#3F3F3F] ">
                  or
                </div>
                <GoogleBtn text="Sign Up wih Google" />
              </div>
              <div className="mt-2 text-sm text-center">
                Don't have an account?{" "}
                <NavLink to="/login" className="text-[#0F7DE3] hover:underline">
                  <button>Sign In &rarr;</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* for mobile */}

      <div className=" h-screen sm:hidden flex flex-col justify-between">
        <div className="relative h-[30%] w-full  bg-center  flex items-center justify-center">
          <img
            src="./images/bgImgJaipur.png"
            alt=""
            className="h-full w-full absolute top-0 bottom-0  rounded-2xl z-[0]"
          />
          <div className="text-4xl  font-bold text-secondary z-[1]">
            Sign Up To Tyrant
          </div>
        </div>
        <div className="h-[70%] w-full flex justify-center ">
          <div className="card w-[450px] min-h-[60%]  bg-secondary rounded-xl text-primary grid gap-2 items-center p-[52px] font-comfortaa text-lg ">
            <div className=" col-span-1 row-span-1">
              <label
                htmlFor="text"
                className="block  font-medium text-gray-900"
              >
                Name*
              </label>
              <div className="">
                <input
                  type="name"
                  name="name"
                  ref={nameRef}
                  onBlur={nameBlur}
                  required
                  value={credentials.name}
                  onChange={handleOnChange}
                  placeholder="Enter Name"
                  className="border-2 border-solid borderprimary  block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                />
              </div>
              <div className="nameText text-red-600 text-xs my-1 hidden">
                Name is required
              </div>
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
                  ref={emailRef}
                  value={credentials.email}
                  onChange={handleOnChange}
                  onBlur={emailBlur}
                  autoComplete="email"
                  required
                  placeholder="Enter Email"
                  className="border-2 border-solid borderprimary  block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                />
              </div>
              <div className="emailText text-red-600 text-xs my-1 hidden"></div>
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
              <div className="flex border-2 border-solid borderprimary w-full rounded-md bg-secondary">
                <input
                  type="password"
                  name="password"
                  {...(showPassword ? { type: "text" } : { type: "password" })}
                  ref={passwordRef}
                  onBlur={passwordBlur}
                  required
                  value={credentials.password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className=" border-none outline-none w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900   placeholder:text-gray-400   sm:text-sm/6"
                />
                <button className="bg-secondary mr-2" onClick={togglePass}>
                  {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                </button>
              </div>
              <div className="passwordText text-red-600 text-xs my-1 hidden"></div>
            </div>
            <div className="grid gap-1">
              <button
                className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-secondary text-xl py-1active:scale-[0.95] hover:bg-[#232222] "
                onClick={handleSubmit}
              >
                Sign Up &gt;&gt;
              </button>

              <div className=" text-center leading-none  text-[#3F3F3F] ">
                or
              </div>
              <GoogleBtn text="Sign Up wih Google" />
            </div>
            <div className="mt-2 text-sm text-center">
              Don't have an account?{" "}
              <NavLink to="/login" className="text-[#0F7DE3] hover:underline">
                <button>Sign In &rarr;</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewRegister;
