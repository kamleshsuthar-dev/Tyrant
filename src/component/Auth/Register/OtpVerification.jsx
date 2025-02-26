import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@mui/material"
import axios from "axios"
  export function OtpVerification() {

    const [value , setValue] = useState()
    const [OTP,setOTP] = useState()
   
    useEffect(()=>{
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp)
        setOTP(otp)
        const sendEmail = async()=>{
            let res = await axios.post(`${import.meta.env.VITE_SEND_EMAIL_REGISTRATION}`,{
                email : "bantisaini6699@gmail.com",
                from : "Tyrant <tyrant.co.in@gmail.com>",
                subject : "Email Verification Code is" ,
                content : `<div>
                            <h1>Hello Mansi Prajapati</h1>
                            <p>Your OTP is ${otp}</p>   
                          </div>`
            })
           
            console.log("otp api ",res);
            
        }
        sendEmail()

    },[])

    const submitBtn = ()=>{
        if(value == OTP){
            console.log("register success");
              // axios.post(`${import.meta.env.VITE_ISREGISTERED}/register`, credentials )
                //   .then((response) => {
                //     console.log(response);
                //     navigate("/");
                //   })
                //   .catch((error) => {
                //     console.log("error is occur in register api ", error);
                //   });
        }else{
            console.log("OTP not Match");
            
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
      <Button onClick={submitBtn} className="!bg-white" >Submit</Button>
      {/* <Button onClick={submitBtn} className="!bg-white" >Submit</Button> */}
      </div>
    )
  }
  