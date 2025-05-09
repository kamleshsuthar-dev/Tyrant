import VerifyOTP from "@/features/reuseable-component/VerifyOTP";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function OtpVerification() {
  const [error , setError] = useState('')
  const location = useLocation();
  const credentials = location?.state.credentials;
  console.log(credentials);
  const navigate = useNavigate();
  const submitBtn = async (value) => {  
    try {
      const res = await axios.post(`${import.meta.env.VITE_ISREGISTERED}/register`, {email: credentials.email, otp: value});
      if(res.data.success) navigate("/")
      else{
         alert("Invalid or expired OTP");
    }
      console.error("OTP verification failed", res.data);
    } catch (error) {
      console.error("Catch Error in OTP verification", error);
     setError(error)
    }
    
  };

  return (
    <>
      <VerifyOTP submitFunction={submitBtn} worngPassMessage={error} />
    </>
  );
}
