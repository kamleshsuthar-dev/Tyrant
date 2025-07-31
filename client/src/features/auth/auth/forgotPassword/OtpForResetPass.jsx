// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import {VerifyOTP} from "@/components/components"

// export function OtpForResetPass() {
//   console.log("hiii");
  
//   const location = useLocation();

//   const email = location?.state.email;
//   // console.log(email, "resettttt");


//   const navigate = useNavigate();
//   // const [value, setValue] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     (async () => {
//       try {
//         let res = await axios.post(`${import.meta.env.VITE_RESET_PASSWORD}`, {
//           email,
//         });
//         console.log("sending email", res.data.success);
//       } catch (error) {
//         console.log("reset password api error (email)", error);
//         setError(error);
//       }
//     })();
//   }, [email]);

//   const submitBtn = async (value) => {
//     try {
//       let res = await axios.post(`${import.meta.env.VITE_RESET_PASSWORD}`, {
//         email,
//         otp: value,
//       });
//       if (res.data.success) {
//         navigate("/updatepassword", { state: { email } });
//       }
//       console.log("sending email,otp", res);
//     } catch (error) {
//       console.log("reset password api error (email,otp)", error);
//       setError(error);
//     }
//   };

//   return (
//     <VerifyOTP
//       submitFunction={submitBtn}
//       worngPassMessage={error}
//       credentials={email}
//       type="resetPassword"
//     />
    
//   );
// }


import  VerifyOTP  from '../../components/VerifyOTP';

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Background from '../../components/Background';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '@/store/action/authAction';

function OtpForResetPass() {
  const dispatch = useDispatch()
    const {response } = useSelector(state=>state?.auth?.resetPassword)
  const location = useLocation()
  // console.log(location.state);
  const email = location?.state.email

   const navigate = useNavigate();

   useEffect(() => {
    dispatch(resetPassword({email:email}))
    // (async () => {
    //   try {
    //     let res = await axios.post(`${import.meta.env.VITE_RESET_PASSWORD}`, {
    //       email,
    //     });
    //     console.log("sending email", res.data.success);
    //   } catch (error) {
    //     console.log("reset password api error (email)", error);
    //     setError(error);
    //   }
    // })();
  }, [email]);

  const submitBtn = async (value) => {
   
      // let res = await axios.post(`${import.meta.env.VITE_RESET_PASSWORD}`, {
      //   email,
      //   otp: value,
      // });
      dispatch(resetPassword({email:email , otp:value}))
      // if (res.data.success) {
      //   navigate("/updatepassword", { state: { email } });
      // }
      // console.log("sending email,otp", res);
    
  };

  useEffect(()=>{
    if(response?.message == "OTP verified successfully"){
          navigate("/updatepassword", { state: { email } });
    }
  },[response,email])
  
  return (
    <Background >

   <VerifyOTP
      submitFunction={submitBtn}
      credentials={email}
      type="resetPassword"
      />
      
      </Background>
  )
}

export default OtpForResetPass