// import axios from "axios";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import {VerifyOTP} from "@/components/components"

// export function OtpVerification() {
//   const [error, setError] = useState("");

//   const location = useLocation();
//   const {data} = location?.state.data;

//   console.log(data);

//   const navigate = useNavigate();

//   const submitBtn = async (value) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_ISREGISTERED}/register`,
//         { email: data.email, otp: value },
//       );
//       if (res.data.success) navigate("/");
//       else {
//         alert("Invalid or expired OTP");
//       }
//       console.error("OTP verification failed", res.data);
//     } catch (error) {
//       console.error("Catch Error in OTP verification", error);
//       setError(error?.response?.data?.message || error.message || "Something went wrong");
      
//     }
//   };

//   return (
//     <>
//       <VerifyOTP
//         submitFunction={submitBtn}
//         worngPassMessage={error}
//         credentials={data}
//         type="authVerification"
//       />
//     </>
//   );
// }


import  VerifyOTP  from '../../components/VerifyOTP';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Background from '../../components/Background';
import axios from 'axios';
function OtpVerification() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
    const location = useLocation();
  const data= location?.state.data;
console.log(data);

 const submitBtn = async (value) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_ISREGISTERED}/register`,
        { email: data.email, otp: value },
      );
      if (res.data.success) navigate("/");
      else {
        alert("Invalid or expired OTP");
      }
      console.error("OTP verification failed", res.data);
    } catch (error) {
      console.error("Catch Error in OTP verification", error);
      setError({message: error?.response?.data?.error || error.message || "Something went wrong" , key: Date.now()});

    }
  };

  

  return (
    <Background>
      {/* {error && <p>{error}</p>} */}
      <VerifyOTP
             submitFunction={submitBtn}
             worngPassMessage={error}
             credentials={data}
             type="authVerification"
          />

    </Background>
    )
}

export default OtpVerification