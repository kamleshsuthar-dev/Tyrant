import React from 'react'
import Background from '../../components/Background'
import LoginForm from '../../components/LoginForm'
import { GoogleBtn } from '@/App'
import { NavLink } from 'react-router-dom'

function Login() {
  return (
    <Background>
        {/* <div className="text-3xl col-span-1 row-span-1 font-bold">
            Sign In To Tyrant    
        </div> */}
      <div className=" justify-start text-Pure-White text-3xl  font-['Quicksand'] capitalize  md:hidden">Welcome Back!! <br/>You haven’t been missed </div>
      
         <div className="self-stretch px-7 inline-flex flex-col justify-start items-start mb-3">
                <div className="self-stretch justify-start text-Pure-White md:text-3xl text-2xl font-normal font-['AUTOMATA']">Sign In to <span className="md:text-4xl text-3xl bg-gradient-to-r from-black via-green-800 to-lime-400 bg-clip-text text-transparent">Tyrant</span></div>
            </div>  

        <LoginForm/>

     <div className="grid gap-1">

             <div className="text-center leading-none text-[#3F3F3F]">
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

    </Background>
  )
}

export default Login


//    delelte nhi karna hai abhi is me phone design hai 

// import { Button } from "@/components/ui/button";
// import axios from "axios";
// // import { useCallback, useEffect, useRef, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { GoogleBtn } from "@/App.jsx";
// // import { PasswordCloseEye, PasswordOpenEye } from "@/assets/Icons";
// import "./login.css";
// import LoginForm from "../../components/LoginForm";

// // const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const Login = () => {
//   const navigate = useNavigate();

//   // const [credentials, setCredentials] = useState({ email: "", password: "" });

//   // const [showPassword, setShowPassword] = useState(false);

//   // const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
//   // const [message, setMessage] = useState({
//   //   email: "",
//   //   password: "",
//   //   general: ""
//   // });
  
//   // const emailMounted = useRef(false);

//   // const handleOnChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setCredentials(prev => ({ ...prev, [name]: value }));
    
//   //   // Clear error message when user starts typing
//   //   if (message[name]) {
//   //     setMessage(prev => ({ ...prev, [name]: "" }));
//   //   }
//   // };

 

//   // useEffect(() => {
//   //   if (!emailMounted.current) {
//   //     emailMounted.current = true;
//   //     return;
//   //   }
    
//   //   if (credentials.email.length <= 1) return;
    
//   //   const validateEmail = async () => {
//   //     if (!EMAIL_REGEX.test(credentials.email)) {
//   //       setMessage(prev => ({ ...prev, email: "Please enter a valid email" }));
//   //     } else {
//   //       setMessage(prev => ({ ...prev, email: "" }));
//   //       await checkIsRegistered(credentials.email);
//   //     }
//   //   };
    
//   //   const timeoutId = setTimeout(validateEmail, 500);
//   //   return () => clearTimeout(timeoutId);
//   // }, [credentials.email, checkIsRegistered]);

//   // const validateForm = () => {
//   //   const newMessage = { ...message };
//   //   let isValid = true;
    
//   //   if (!credentials.email) {
//   //     newMessage.email = "Email is required";
//   //     isValid = false;
//   //   } else if (!EMAIL_REGEX.test(credentials.email)) {
//   //     newMessage.email = "Please enter a valid email";
//   //     isValid = false;
//   //   }
    
//   //   if (!credentials.password) {
//   //     newMessage.password = "Password is required";
//   //     isValid = false;
//   //   } else if (credentials.password.length < 8) {
//   //     newMessage.password = "Password must be at least 8 characters";
//   //     isValid = false;
//   //   }
    
//   //   setMessage(newMessage);
//   //   return isValid;
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
    
//   //   if (!validateForm()) return;
    
//   //   try {
//   //     const isUserRegistered = await checkIsRegistered(credentials.email);
      
//   //     if (!isUserRegistered) {
//   //       setMessage(prev => ({ ...prev, general: "User is not registered yet" }));
//   //       setTimeout(() => {
//   //         setMessage(prev => ({ ...prev, general: "" }));
//   //       }, 3000);
//   //       return;
//   //     }
      
//   //     try {
//   //       const response = await axios.post(
//   //         `${import.meta.env.VITE_ISREGISTERED}/login`,
//   //         credentials,
//   //         { withCredentials: true }
//   //       );
        
//   //       if (response.data.success) {
//   //         setMessage(prev => ({ ...prev, general: "Logged in successfully" }));
//   //           setTimeout(() => {
//   //              navigate("/");
//   //          }, 1000);
//   //       } else {
//   //         setMessage(prev => ({ ...prev, general:  "Login failed" }));
//   //       }
//   //     } catch (err) {
//   //       console.log(err);
//   //       const errorMessage = err?.response?.data?.message || "Password Incorrect!";
//   //       setMessage(prev => ({ ...prev, general: errorMessage }));
//   //       setTimeout(()=>{
//   //         setMessage(prev => ({ ...prev, general: "" }));
//   //       },2000)
//   //     }
//   //   } catch (error) {
//   //     console.error("Error during login:", error);
//   //     setMessage(prev => ({ ...prev, general: "An error occurred. Please try again." }));
//   //   }
//   // };

//   // const handleBlur = (field) => {
//   //   if (!credentials[field]) {
//   //     setMessage(prev => ({ ...prev, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` }));
//   //   }
//   // };

//   return (
//     <>
//       {/* PC Design */}
//       <div className="bg-secondary h-screen sm:block hidden w-full border-2 border-solid borderprimary lg:p-7 p-5">
//         <div className="relative h-full w-full grid place-items-center rounded-2xl">
//           <img
//             src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1746461505/TyrantImage-SignIn_ih3mgn.png"
//             alt="Login background"
//             className="h-full w-full absolute top-0 bottom-0 rounded-2xl  object-cover"
//           />
//           <div className="card min-w-[350px] min-h-[60%] bg-secondary rounded-xl text-primary grid gap-2 items-center p-[52px] font-comfortaa text-lg z-10">
//             {/* {message.general && <div className="text-red-500 text-sm mt-2 text-center mb-6">{message.general}</div>} */}

//             <div className="text-3xl col-span-1 row-span-1 font-bold">
//               Sign In To Tyrant
//             </div>

//             <LoginForm/>

//             {/* <div className="col-span-1 row-span-1">
//               <label htmlFor="email" className="block font-medium text-gray-900">
//                 Email*
//               </label>
//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="email"
//                   value={credentials.email}
//                   onChange={handleOnChange}
//                   onBlur={() => handleBlur("email")}
//                   required
//                   placeholder="Enter Email"
//                   className="border-2 border-solid borderprimary block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
//                 />
//                 {message.email && <div className="text-red-600 text-xs my-1">{message.email}</div>}
//               </div>
//             </div> */}

//             {/* <div className="col-span-1 row-span-1">
//               <div className="flex justify-between">
//                 <label htmlFor="password" className="block font-medium text-gray-900">
//                   Password*
//                 </label>
//                 <Link
//                   to="/forgotpasswordform"
//                   className="text-sm text-[#0F7DE3] mt-1"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>
//               <div className="flex border-2 border-solid borderprimary w-full rounded-md bg-secondary">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={credentials.password}
//                   onChange={handleOnChange}
//                   onBlur={() => handleBlur("password")}
//                   required
//                   placeholder="Enter Password"
//                   className="block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
//                 />
//                 <button 
//                   type="button"
//                   className="bg-secondary mr-2" 
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
//                 </button>
//               </div>
//               {message.password && <div className="text-red-600 text-xs my-1">{message.password}</div>}
//             </div> */}
            
//               {/* <Button
//                 className="col-span-1 row-span-1 rounded-xl block text-center text-2xl py-1 active:scale-95"
//                 onClick={handleSubmit}
//               >
//                 Sign In &gt;&gt;
//               </Button> */}

//             <div className="grid gap-1">

//               <div className="text-center leading-none text-[#3F3F3F]">
//                 or
//               </div>
//               <GoogleBtn text="Sign In with Google" />
//             </div>
            
//             <div className="mt-2 text-sm text-center">
//               Don't have an account?{" "}
//               <NavLink
//                 to="/register"
//                 className="text-[#0F7DE3] hover:underline"
//               >
//                 Sign up &rarr;
//               </NavLink>
//             </div>
            
//           </div>

//         </div>
//       </div>

//       {/* Mobile Design */}
//       {/* <div className="sm:hidden flex flex-col justify-between items-center h-screen">
//         <div className="h-[70%] flex justify-center items-center">
//           <div className="card w-[350px] min-w-[286px] bg-secondary rounded-xl text-primary grid gap-2 items-center p-8 font-comfortaa text-md border-solid borderprimary">
//             {message.general && <div className="text-red-500 text-sm mt-2 text-center mb-6">{message.general}</div>}
            
//             <div>
//               <div className="text-3xl col-span-1 row-span-1 font-bold">
//                 Sign In To
//               </div>
//               <div className="text-3xl col-span-1 row-span-1 font-bold">
//                 Tyrant
//               </div>
//             </div>
            
//             <div className="col-span-1 row-span-1">
//               <label htmlFor="email" className="block font-medium text-gray-900">
//                 Email*
//               </label>
//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="email"
//                   value={credentials.email}
//                   onChange={handleOnChange}
//                   onBlur={() => handleBlur("email")}
//                   required
//                   placeholder="Enter Email"
//                   className="border-2 border-solid borderprimary block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
//                 />
//                 {message.email && <div className="text-red-600 text-xs my-1">{message.email}</div>}
//               </div>
//             </div>

//             <div className="col-span-1 row-span-1">
//               <div className="flex justify-between">
//                 <label htmlFor="password" className="block font-medium text-gray-900">
//                   Password*
//                 </label>
//                 <Link
//                   to="/forgotpasswordform"
//                   className="text-xs text-[#0F7DE3] mt-1"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>
//               <div className="flex border-2 border-solid borderprimary w-full rounded-md bg-secondary">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={credentials.password}
//                   onChange={handleOnChange}
//                   onBlur={() => handleBlur("password")}
//                   required
//                   placeholder="Enter Password"
//                   className="block w-full rounded-md bg-secondary px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
//                 />
//                 <button 
//                   type="button"
//                   className="bg-secondary mr-2" 
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <PasswordOpenEye /> : <PasswordCloseEye />}
//                 </button>
//               </div>
//               {message.password && <div className="text-red-600 text-xs my-1">{message.password}</div>}
//             </div>
            
//             <div className="grid gap-1">
//               <Button
//                 className="col-span-1 row-span-1 rounded-xl bg-[#3F3F3F] block text-center text-secondary text-xl py-1 active:scale-95 hover:bg-[#232222]"
//                 onClick={handleSubmit}
//               >
//                 Sign In &gt;&gt;
//               </Button>

//               <div className="text-center leading-none text-[#3F3F3F]">
//                 or
//               </div>
//               <GoogleBtn text="Sign In with Google" />

//               <div className="mt-2 text-sm text-center">
//                 Don't have an account?{" "}
//                 <NavLink
//                   to="/register"
//                   className="text-[#0F7DE3] hover:underline"
//                 >
//                   Sign up &rarr;
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//         </div>
//         <img
//           src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1746461505/TyrantImage-SignIn_ih3mgn.png"
//           alt="Background image"
//           className="h-[30%] w-full object-cover"
//         />
//       </div> */}
//     </>
//   );
// };

// export default Login;

