import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@mui/material"
import axios from "axios"
import { useLocation,useNavigate } from "react-router-dom"


  export function OtpForResetPass() {
    const location = useLocation()
    const email = location?.state.email
    console.log(email ,"resettttt");
    const navigate = useNavigate()
    const [value , setValue] = useState()
    const [OTP,setOTP] = useState()
   
    useEffect(()=>{
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp)
        setOTP(otp)
        const sendEmail = async()=>{
            let res = await axios.post(`${import.meta.env.VITE_SEND_EMAIL_REGISTRATION}`,{
                email : `${email}`,
                from : "Tyrant <tyrant.co.in@gmail.com>",
                subject : "Email Verification Code " ,
                content : `<div>
                            <h1>Hello ${email.substr(0,10)} Welcome To Tyrant</h1>
                            <p>Your OTP is ${otp}</p>   
                          </div>`
            })
           
            console.log("otp api ",res);
            
        }
        sendEmail()

    },[email])

    const submitBtn = ()=>{
        if(value == OTP){
            console.log("register success");
            navigate('/updatepassword' ,{state:{email}})
            //   axios.post(`${import.meta.env.VITE_ISREGISTERED}/register`, credentials )
            //       .then((response) => {
            //         console.log(response);
            //         navigate("/");

            //       })
            //       .catch((error) => {
            //         console.log("error is occur in register api ", error);
            //       });
        }else{
            console.log("OTP not Match");
            alert('OTP galat hai Lowde')
        }
      
        // console.log(value);
    }
    
    return (
        <div className="bg-[#1c1b1b] text-white w-screen h-screen flex flex-col justify-center items-center gap-10">
      <InputOTP maxLength={6} value={value} onChange={(value)=> setValue(value)} >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} /> 
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button onClick={ submitBtn} className="!bg-white" >Submit</Button>
      {/* <Button onClick={submitBtn} className="!bg-white" >Submit</Button> */}
      </div>
    )
  }
  