import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   PasswordCloseEye,
//   PasswordOpenEye,
// } from "../Auth/Register/PasswordEye";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { PasswordCloseEye, PasswordOpenEye } from "../Register/PasswordEye";

function UpdatePassword() {
  //  const {userDetails} = useGoogleAuthContext()
  const location = useLocation();
  const { email } = location?.state || {};
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: email || "",
    password: "",
    passwordConfirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [item, setItem] = useState();
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  //  focus
  //   const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passMounted = useRef(false);
  const passConfirmMounted = useRef();
  //   const nameMounted = useRef();

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

    // if (errors[name]) {
    //   setErrors((prev) => ({ ...prev, [name]: "" }));
    // }
  };

  const togglePass = () => {
    setShowPassword((prev) => !prev);
    console.log("show password", showPassword);
  };

  //   const nameBlur = () => {
  //     if (credentials.name.length < 1) {
  //       document.querySelector(".nameText").classList.remove("hidden");
  //     }
  //   };

  const passwordBlur = () => {
    if (credentials.password.length < 1) {
      document.querySelector(".passwordText").textContent =
        "Password is required";
      document.querySelector(".passwordText").classList.remove("hidden");
    }
  };

  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true; // Mark that the component has mounted
      return; // Exit the effect on the first render
    }

    const passwordTextElement = document.querySelector(".passwordText");
    if (passwordTextElement) {
      if (credentials.password.length < 8) {
        passwordTextElement.textContent =
          "Password must be at least 8 characters long";
        passwordTextElement.classList.remove("hidden");
      } else {
        passwordTextElement.classList.add("hidden");
      }
    }
  }, [credentials.password]);

  const handleSubmit = async (e, email) => {
    // console.log("credentials", credentials);

    e.preventDefault();
    if (!credentials.password || !credentials.passwordConfirm) {
      if (credentials.password.length < 1) {
        document.querySelector(".passwordText").textContent =
          "Password is required";
        document.querySelector(".passwordText").classList.remove("hidden");
      }
      if (credentials.passwordConfirm.length < 1) {
        document.querySelector(".passwordConfirmText").textContent =
          "Password Confirm is required";
        document
          .querySelector(".passwordConfirmText")
          .classList.remove("hidden");
      }
    }

    if (credentials.password.length < 8) {
      document.querySelector(".passwordConfirmText").textContent =
        "Password Should be 8 or More Character";
      document.querySelector(".passwordConfirmText").classList.remove("hidden");
    }
    if (credentials.password !== credentials.passwordConfirm) {
      document.querySelector(".passwordConfirmText").textContent =
        "Password and Password Confirm should be same";
      document.querySelector(".passwordConfirmText").classList.remove("hidden");
    } else if (
      (credentials.email, credentials.password, credentials.passwordConfirm)
    ) {
      // try {
      //     const res=await axios.patch(`${import.meta.env.VITE_RESET_PASSWORD}`,{
      //         email : credentials.email ,
      //         newPassword : credentials.password
      //     })

      //     console.log("res of update pass api " , res);
      // } catch (error) {

      // }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_RESET_PASSWORD}`,
          {
            email: credentials.email,
            newPassword: credentials.password,
          },
        );
        console.log("response .......", response);
        navigate("/login");
        alert("Password Change Successfully");
      } catch (error) {
        console.log("reset password error", error);
        setError(`error:  ${error?.message} `);
        setTimeout(() => {
          setError(" ");
        }, 1000);

        // alert("something went wrong try again !!")
        // navigate("/login");
      }
    }
  };

  return (
    <>
      {/* pc design */}
      <div className="bg-secondary h-screen sm:block hidden w-full border-2 border-solid borderprimary lg:p-7 p-5 ">
        <div className="relative h-full w-full grid  place-items-center   rounded-2xl  ">
          <img
            src="./images/bgImgJaipur.png"
            alt=""
            className="h-full w-full absolute top-0 bottom-0  rounded-2xl z-[0]"
          />
          <div className="card min-w-[350px] min-h-[60%]  bg-secondary rounded-xl text-primary grid gap-2 items-center p-[52px] font-comfortaa text-lg z-[1]">
            {error && (
              <div className="text-lg col-span-1 row-span-1 font-bold text-center text-red-700 break-words ">
                {" "}
                {error}
              </div>
            )}
            <div className="text-3xl col-span-1 row-span-1 font-bold ">
              Set Name And Password{" "}
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label
                  htmlFor="name"
                  className="block  font-medium text-gray-900"
                >
                  Email*
                </label>
              </div>
              <div className="flex border-2 border-solid borderprimary w-full rounded-md bg-secondary">
                <input
                  type="name"
                  name="name"
                  value={credentials.email}
                  disabled
                  onChange={handleOnChange}
                  required
                  //  ref={passwordRef}
                  className=" block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
              </div>
              <div className="nameText text-red-600 text-xs my-1 hidden"></div>
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block  font-medium text-gray-900"
                >
                  Create Password*
                </label>
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

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label
                  htmlFor="passwordConfirm"
                  className="block  font-medium text-gray-900"
                >
                  Password Confirm*
                </label>
              </div>
              <div className="flex border-2 border-solid borderprimary w-full rounded-md bg-secondary">
                <input
                  type="password"
                  name="passwordConfirm"
                  value={credentials.passwordConfirm}
                  ref={passConfirmMounted}
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
              <div className="passwordConfirmText text-red-600 text-xs my-1 hidden"></div>
            </div>
            <div className="grid gap-1">
              <button
                className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-secondary text-2xl py-1 active:scale-[0.95] hover:bg-[#232222]"
                onClick={handleSubmit}
              >
                Submit &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* // mobile design  */}
      <div className="sm:hidden flex flex-col justify-between items-center h-screen ">
        <div className="h-[70%] flex justify-center items-center">
          <div className="card w-[350px]  min-w-[286px]  bg-secondary rounded-xl text-primary grid gap-2 items-center p-8 font-comfortaa text-md border-solid borderprimary ">
            <div>
              <div className="text-3xl col-span-1 row-span-1 font-bold ">
                Set Name And Password{" "}
              </div>
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label
                  htmlFor="name"
                  className="block  font-medium text-gray-900"
                >
                  Email*
                </label>
              </div>
              <div className="flex border-2 border-solid borderprimary w-full rounded-md bg-secondary">
                <input
                  type="name"
                  name="name"
                  value={credentials.email}
                  disabled
                  onChange={handleOnChange}
                  required
                  //  ref={passwordRef}
                  className=" block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
              </div>
              <div className="nameText text-red-600 text-xs my-1 hidden"></div>
            </div>

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block  font-medium text-gray-900"
                >
                  Create Password*
                </label>
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

            <div className=" col-span-1 row-span-1">
              <div className="flex justify-between">
                <label
                  htmlFor="passwordConfirm"
                  className="block  font-medium text-gray-900"
                >
                  Password Confirm*
                </label>
              </div>
              <div className="flex border-2 border-solid borderprimary w-full rounded-md bg-secondary">
                <input
                  type="password"
                  name="passwordConfirm"
                  required
                  placeholder="Enter Password"
                  {...(showPassword ? { type: "text" } : { type: "password" })}
                  //   onBlur={passwordBlur}
                  ref={passConfirmMounted}
                  value={credentials.passwordConfirm}
                  onChange={handleOnChange}
                  // ref={passwordRef}
                  className=" block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400  sm:text-sm/6"
                />
                <button className="bg-secondary mr-2" onClick={togglePass}>
                  {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
                </button>
              </div>
              <div className="passwordConfirmText text-red-600 text-xs my-1 hidden"></div>
            </div>
            <div className="grid gap-1">
              <button
                className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-secondary text-xl py-1 active:scale-[0.95] hover:bg-[#232222]"
                onClick={handleSubmit}
              >
                Submit &gt;&gt;
              </button>
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
}

export default UpdatePassword;
