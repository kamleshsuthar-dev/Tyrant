"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import { throttle } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { clearResetPassword } from "@/store/reducer/authSlice"


export default function VerifyOTP({submitFunction  ,credentials ,type}) {
  const dispatch = useDispatch()
   const {response ,error} = useSelector(state=>state?.auth?.resetPassword)
  // console.log("worngPassMessage",worngPassMessage);
  console.log("ccsc",credentials);
  
  // const [error,setError]= useState("")
  const [otp, setOtp] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const router = useRouter()
  const { toast } = useToast()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (otp.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter all 6 digits of your verification code.",
        variant: "destructive",
      })
      return
    }

    try {
   
     await submitFunction(otp)
   
    } catch (error) {
        console.log(error);
        
    } finally {
      setIsSubmitting(false)
    }
  }

 useEffect(()=>{
    setTimeout(() => {
      dispatch(clearResetPassword())
    }, 3000);
 },[error ,response])

  

  

  const handleResendOTP = throttle( async () => {
      try {
        if(type === "authVerification") {
          console.log("authVerification");
          
          let res = await axios.post(`${import.meta.env.VITE_ISREGISTERED}/register`, credentials);
          console.log(res);
        }else if (type === "resetPassword"){
          console.log("resetPassword");
         let res = await axios.post(`${import.meta.env.VITE_RESET_PASSWORD}`, credentials); 
         console.log(res);
        }
        
      } catch (error) {
        console.log(error);
        
      }
  
  },10000)

  
  
 

  return (
    <div className="flex  items-center justify-center bg-gray-50 ">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
       {/* {worngPassMessage?.response?.data?.success === false && showInvalid&& <div className="text-destructive text-center OTP">Invalid OTP</div> } */}
       {error && <div className="text-destructive text-sm text-center OTP capitalize">{error}</div> }
       {response?.success && <div className="text-secondary-foreground text-sm text-center OTP capitalize">{response?.message}</div> }
      
          <CardTitle className="text-2xl font-bold text-center">Verify Your Account</CardTitle>
          <CardDescription className="text-center">Enter the 6-digit code we sent to your email</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="flex justify-center py-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex items-center justify-center">
              <Timer initialSeconds={30} onExpire={()=>{}}  handleResendOTP={handleResendOTP}/>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={isSubmitting || otp.length !== 6 }>
              {isSubmitting== true ? "Verifying..." : "Verify Account"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

// Timer component defined here


export function Timer({ initialSeconds, onExpire ,handleResendOTP }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const storedExpiry = localStorage.getItem("timerExpiry");
    const now = Date.now();
        // console.log(now);
        
    if (storedExpiry) {
      const remaining = Math.floor((parseInt(storedExpiry) - now) / 1000);
      if (remaining > 0) {
        setSeconds(remaining);
        setIsActive(true);
      } else {
        setSeconds(0);
        setIsActive(false);
        onExpire();
      }
    } else {
      const expiryTime = now + initialSeconds * 1000;
      localStorage.setItem("timerExpiry", expiryTime.toString());
      setSeconds(initialSeconds);
      setIsActive(true);
    }
  }, [initialSeconds, onExpire]);
  

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          if (newSeconds <= 0) {
            setIsActive(false);
            onExpire();
            clearInterval(interval);
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, onExpire]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="text-sm text-muted-foreground">
      {isActive ? (
        <Button variant="secondary">Re-send OTP &gt; &gt; {formatTime()}</Button>
      ) : (
        <Button variant="primary" onClick={handleResendOTP}>Re-send OTP &gt; &gt;</Button>
      )}
    </div>
  );
}
