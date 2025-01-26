import './login.css'
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdLockOutline } from 'react-icons/md'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom'
// import CopyRight from '../../Components/CopyRight/CopyRight'
import { GoogleBtn } from '../../../App'



const Login = ({text}) => {


  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [responseData, setResponseData] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState(null)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }







  const handleSubmit = async (e) => {
    e.preventDefault()
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (!credentials.email && !credentials.password) {
        console.log("enter valid email");
      }
      else if (!emailRegex.test(credentials.email)) {
        console.log("Please enter a valid email", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.password.length < 8) {
        console.log("Please enter strong pass", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.email && credentials.password) {
        // const requestData = {
        //       userGmail: credentials.email ,
        //       userPassword : credentials.password
        // }

        try {
          const response = await axios.post("https://expresstest-31m8.onrender.com/api/auth/login", credentials);
          setResponseData(response.data);
          console.log("data transfer success", response);

          setError(null); // Clear any previous errors
        } catch (err) {
          setError(err.message);
          setResponseData(null); // Clear any previous responses
        }
      }


      //  url =  `https://expresstest-31m8.onrender.com/api/auth/register` 
      //  url =  `https://expresstest-31m8.onrender.com/api/auth/logout` 
      //  url =  `https://expresstest-31m8.onrender.com/api/auth/login` 




    }
    catch (error) {
      // error.response.data.error.length === 1 ?
      //   toast.error(error.response.data.error[0].msg, { autoClose: 500, theme: 'colored' })
      //   : toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })

      console.log('this is err', error);
    }

  }


  return (
   
    <>
    {/* pc design */}
      <div className='bg-white h-screen sm:block hidden w-full border-2 border-solid border-black lg:p-7 p-5 ' >
        <div className='relative h-full w-full grid  place-items-center   rounded-2xl  '>
         <img src="./images/bgImgJaipur.png" alt="" className='h-full w-full absolute top-0 bottom-0  rounded-2xl z-[0]' />
          <div className='card min-w-[350px] min-h-[60%]  bg-white rounded-xl text-black grid gap-2 items-center p-[52px] font-comfortaa text-lg z-[1]'>
            <div className='text-red-500 text-sm mt-[2px] text-center mb-6  '>Invaild email and password ? {name}</div>

            <div className='text-3xl col-span-1 row-span-1 font-bold ' >Sign In To Adaa Jaipur  </div>

            <div className=' col-span-1 row-span-1'>
              <label for="email" class="block  font-medium text-gray-900">Email*</label>
              <div class="">
                <input type="email" name="email"   autocomplete="email" required placeholder='Enter Email' className="border-2 border-solid border-black  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6" />
              </div>
            </div>

            <div className=' col-span-1 row-span-1'>
              <div className='flex justify-between'>
                <label for="password" class="block  font-medium text-gray-900">Password*</label>
                <Link to='/forgotpasswordform' className='text-sm text-[#0F7DE3] mt-1'>Forgot Password ?</Link>
              </div>
              <div class="">
                <input type="password" name="password"     required placeholder='Enter Password' className="border-2 border-solid border-black block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6" />
              </div>

            </div>
            <div className='grid gap-1'>
              <div className='col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-white text-2xl py-1 '>Sign In &gt;&gt;</div>

              <div className=' text-center leading-none  text-[#3F3F3F] '>or</div>
              <GoogleBtn text='Sign In with Google'/>
            </div>
            <div className='mt-2 text-sm text-center'>
                  Don't have an account? <NavLink to='/register' className='text-[#0F7DE3]'>Sign up &rarr;</NavLink>
            </div>
          </div>
        
        </div>

      </div>


      {/* // mobile design  */}
      <div className='sm:hidden flex flex-col justify-between items-center h-screen ' >
        <div className='h-[70%] flex justify-center items-center'>


          <div className='card w-[350px]  min-w-[286px]  bg-white rounded-xl text-black grid gap-2 items-center p-8 font-comfortaa text-md border-solid border-black '>
            <div className='text-red-500 text-sm mt-[2px] text-center mb-6  '>Invaild email and password ?</div>

            <div>
              <div className='text-3xl col-span-1 row-span-1 font-bold ' >Sign In To </div>
              <div className='text-3xl col-span-1 row-span-1 font-bold ' >Adaa Jaipur</div>
            </div>
            <div className=' col-span-1 row-span-1'>
              <label for="email" class="block  font-medium text-gray-900 ">Email*</label>
              <div class="">
                <input type="email" name="email" id="Pemail" autocomplete="email" required placeholder='Enter Email' className="border-2 border-solid border-black  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6" />
              </div>
            </div>

            <div className=' col-span-1 row-span-1'>
              <div className='flex justify-between'>
                <label for="password" class="block  font-medium text-gray-900">Password*</label>
                <a href="#" className='text-xs text-[#0F7DE3] mt-1'>Forgot Password ?</a>
              </div>
              <div class="">
                <input type="password" name="password" id="Ppassword" required placeholder='Enter Password' className="border-2 border-solid border-black block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-solid outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6" />
              </div>

            </div>
            <div className='grid gap-1'>
              <div className='col-span-1 row-span-1 rounded-xl bg-[#3F3F3F]   block text-center text-white text-xl py-1 '>Sign In &gt;&gt;</div>

              <div className=' text-center leading-none  text-[#3F3F3F] '>or</div>
              {/* <div className='col-span-1 row-span-1 rounded-xl bg-white flex items-center justify-center gap-2 py-1 text-center text-lg   text-[#3F3F3F] border-2 border-solid border-black '>
                <svg width="18" height="18" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3107_16599)">
                    <path d="M8.16413 0.723606C5.96598 1.48616 4.07031 2.93352 2.75555 4.85308C1.44079 6.77264 0.776236 9.06323 0.859511 11.3884C0.942786 13.7136 1.7695 15.9507 3.21821 17.7713C4.66693 19.5919 6.66128 20.8999 8.90834 21.5033C10.7301 21.9734 12.6387 21.994 14.4702 21.5634C16.1294 21.1908 17.6633 20.3936 18.9218 19.25C20.2316 18.0234 21.1823 16.463 21.6718 14.7366C22.2038 12.8591 22.2984 10.8847 21.9485 8.96501H11.7185V13.2086H17.643C17.5246 13.8854 17.2709 14.5314 16.897 15.1079C16.5231 15.6844 16.0368 16.1795 15.4671 16.5636C14.7436 17.0422 13.9281 17.3642 13.0729 17.5089C12.2151 17.6684 11.3353 17.6684 10.4776 17.5089C9.6082 17.3292 8.78579 16.9704 8.06272 16.4553C6.9011 15.6331 6.02888 14.4649 5.57053 13.1175C5.10443 11.7449 5.10443 10.2568 5.57053 8.88423C5.8968 7.9221 6.43615 7.04609 7.14834 6.32157C7.96336 5.47723 8.9952 4.87369 10.1306 4.57717C11.2661 4.28065 12.4613 4.30261 13.5851 4.64064C14.4629 4.91012 15.2657 5.38097 15.9294 6.01564C16.5975 5.35105 17.2643 4.68475 17.9301 4.01673C18.2738 3.65751 18.6485 3.31548 18.9871 2.94767C17.974 2.00489 16.7848 1.2713 15.4877 0.788918C13.1256 -0.0687554 10.5411 -0.0918046 8.16413 0.723606Z" fill="white" />
                    <path d="M8.16414 0.723587C10.5409 -0.0923781 13.1255 -0.0699356 15.4877 0.78718C16.7851 1.27284 17.9737 2.00996 18.9854 2.95624C18.6416 3.32406 18.279 3.66781 17.9284 4.02531C17.2615 4.69103 16.5952 5.35447 15.9295 6.01562C15.2658 5.38095 14.463 4.9101 13.5851 4.64062C12.4617 4.30141 11.2665 4.27818 10.1308 4.57349C8.99502 4.86879 7.96255 5.47122 7.14664 6.31468C6.43445 7.0392 5.89509 7.91521 5.56883 8.87734L2.00586 6.11874C3.28119 3.58971 5.48933 1.65519 8.16414 0.723587Z" fill="#E33629" />
                    <path d="M1.06078 8.85159C1.25228 7.90248 1.57022 6.98335 2.00609 6.11877L5.56906 8.88424C5.10296 10.2568 5.10296 11.7449 5.56906 13.1175C4.38197 14.0342 3.19432 14.9554 2.00609 15.8813C0.914942 13.7093 0.582161 11.2346 1.06078 8.85159Z" fill="#F8BD00" />
                    <path d="M11.7185 8.96326H21.9485C22.2985 10.883 22.2038 12.8574 21.6718 14.7348C21.1824 16.4613 20.2316 18.0217 18.9218 19.2483C17.772 18.3511 16.617 17.4608 15.4671 16.5636C16.0372 16.179 16.5238 15.6834 16.8977 15.1063C17.2716 14.5292 17.5251 13.8826 17.6431 13.2051H11.7185C11.7168 11.7923 11.7185 10.3778 11.7185 8.96326Z" fill="#587DBD" />
                    <path d="M2.00391 15.8812C3.19214 14.9646 4.37979 14.0433 5.56687 13.1175C6.02614 14.4653 6.8996 15.6336 8.0625 16.4553C8.78783 16.9679 9.61201 17.3238 10.4825 17.5003C11.3403 17.6598 12.2201 17.6598 13.0778 17.5003C13.9331 17.3555 14.7486 17.0335 15.472 16.555C16.6219 17.4522 17.7769 18.3425 18.9267 19.2397C17.6684 20.3839 16.1345 21.1817 14.4752 21.5548C12.6437 21.9854 10.735 21.9648 8.91328 21.4947C7.47246 21.11 6.12663 20.4318 4.96016 19.5026C3.72551 18.5224 2.71711 17.2871 2.00391 15.8812Z" fill="#319F43" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3107_16599">
                      <rect width="22" height="22" fill="white" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </svg>
                Sign In with Google
              </div> */}
              <GoogleBtn text='Sign In with Google'/>

              <div className='mt-2 text-sm text-center'>
                  Don't have an account? <NavLink to='/register' className='text-[#0F7DE3]'>Sign up &rarr;</NavLink>
            </div>
            </div>
          </div>
        </div>
        <img src="./images/bgImgJaipur.png" alt="" className='h-[30%] w-full object-cover' />
      </div>


    </>
  )
}

export default Login