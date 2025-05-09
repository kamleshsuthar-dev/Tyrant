import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleBtn } from "../../../App";
import "../Login/login.css";
import CustomInput from "@/components/ui/CustomInput";
import isEmail from "validator/lib/isEmail";

function NewRegister({ text }) {
  const [formData, setFormData] = useState({
    name: {
      value: '',
      status: 'idle', // or 'error', 'success', 'warning'
      message: '',
    },
    email: {
      value: '',
      status: 'idle', 
      message: '',
    },
    password: {
      value: '',
      status: 'idle',
      message: '',
    },
  });

  const navigate = useNavigate();
  
  const validateField = async (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return {
            status: 'error',
            message: 'Name is required',
          };
        } else {
          return { status: 'success', message: '' };
        }
  
      case 'email':
        if (!value.trim()) {
          return {
            status: "error",
            message: "Email is required.",
          };
        } 
        if (!isEmail(value)) {
          return {
            status: "error",
            message: "Enter a valid email.",
          };
        }
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_ISREGISTERED}/isregistered?email=${value}`,
          );
          if (res.data.isAlreadyRegistered) {
            return {
              status: "error",
              message: "Email is already registered.",
            };
          } else {
            return {
              status: "success",
              message: "Email looks good!",
            };
          }
        } catch (err) {
          return {
            status: "warning",
            message: "Could not verify email. Try again later.",
          };
        }
  
      case 'password':
        if (!value.trim()) {
          return {
            status: 'error',
            message: 'Password is required',
          };
        }
        if (value.length < 8) {
          return {
            status: 'error',
            message: 'Password must be at least 8 characters',
          };
        } else {
          return { status: 'success', message: '' };
        }
  
      default:
        return { status: '', message: '' };
    }
  };

  const handleChange = async (e) => {
    try {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          value, // update value immediately
        },
      }));

      validateField(name, value).then((validation) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        ...validation,
      },
    }));
  });
    } catch (error) {
      console.error("Error in handleChange:", error);
      return{}
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    Object.entries(formData).forEach(([field, fieldState]) => {
      handleChange({target:{
        name: field,
        value: fieldState.value,
      }});
      if (fieldState.error) {
        isValid = false;
      }
    });
    if (isValid) {
      const { name, email, password } = formData;
      const credentials = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
      try {
        const res = await axios.post(`${import.meta.env.VITE_ISREGISTERED}/register`, credentials);
        console.log(res.data);
        if (res.data.success) {
          navigate("/otp", { state: { credentials } });
        } else {
          console.error("Registration failed:", res.data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };


  return (
    <>
      {/* for pc */}
      <div className="h-screen w-screen sm:flex hidden font-comfortaa">
        <div className="lg:h-full h-[90vh] w-[50%]">
          <img
            src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1746461505/TyrantImage-SignUp_gvqwhv.png"
            alt=""
            className="lg:h-full h-[90vh] w-full object-cover"
          />
        </div>
        <div className="relative h-full w-[50%] px-28 border-2 border-red grid place-items-center ">
          <div className="card min-w-[350px] w-full min-h-[60%] bg-secondary rounded-xl text-primary grid gap-4 items-center text-lg ">
            <h1 className="text-3xl font-bold ">Sign Up To Tyrant</h1>
            <CustomInput 
              name="name" 
              label="Full Name" 
              type="text" 
              value={formData.name.value} 
              onChange={(e)=>{handleChange(e)}} 
              onBlur={(e)=>{handleChange(e)}} 
              status={formData.name.status} 
              message={formData.name.message}  
              required={true} 
              placeholder="Jane Doe" 
              autoComplete="email"
            />
            <CustomInput 
              name="email" 
              label="Email" 
              type="email" 
              value={formData.email.value} 
              onChange={(e)=>{handleChange(e)}} 
              onBlur={(e)=>{handleChange(e)}} 
              status={formData.email.status} 
              message={formData.email.message}  
              required={true} 
              placeholder="janedoe@email.corn" 
              autoComplete="name"
            />
            <CustomInput 
              name="password" 
              label="Password" 
              type="password" 
              value={formData.password.value} 
              onChange={(e)=>{handleChange(e)}} 
              onBlur={(e)=>{handleChange(e)}} 
              status={formData.password.status} 
              message={formData.password.message} 
              enableToggle={true} 
              required={true} 
              placeholder="i#ate@iggers" 
              autoComplete="password"
            />
            <Button onClick={handleSubmit} className="rounded-xl text-center py-[10px] px-0 active:scale-[0.99] font-medium">
              <p>Continue &gt;&gt;</p>
            </Button>
            <div className="text-center leading-none text-primary text-base">OR</div>
            <GoogleBtn text="Continue with Google" />
            <div className="text-sm">
              By creating an account, you agree to the{" "}
              <span className="text-blue-500">Terms of Service</span>. For more
              information about Tyrant's privacy practices, see the{" "}
              <span className="text-blue-500">Tyrant Privacy Statement</span>.
              We'll occasionally send you account-related emails.
            </div>
          </div>
          <div className="absolute mt-2 text-lg text-center top-4 right-10">
            Already have an account?{" "}
            <NavLink to="/login" className="text-[#0F7DE3] hover:underline">
              <button>Sign In &rarr;</button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* for mobile */}

      {/* <div className=" h-screen sm:hidden flex flex-col justify-between">
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
                  className="block w-full rounded-md sm:text-sm/6"
                />
              </div>
              <div className="nameText text-destructive text-xs my-1 hidden">
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
                  className={twMerge(`block w-full rounded-md sm:text-sm/6`)}
                />
              </div>
              <div className="emailInputMessage text-destructive text-xs my-1 hidden"></div>
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
              <div className="passwordText text-destructive text-xs my-1 hidden"></div>
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
      </div> */}
    </>
  );
}

export default NewRegister;
