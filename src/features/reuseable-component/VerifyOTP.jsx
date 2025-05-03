"use client"

import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"

export default function VerifyOTP({submitFunction }) {
  const [otp, setOtp] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const router = useRouter()
  const { toast } = useToast()

  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (otp.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter all 6 digits of your verification code.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Here you would verify the OTP with your backend
      // For example:
      // const response = await verifyOTP(otp)

      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      submitFunction(otp)
      
      toast({
        title: "Verification successful",
        description: "Your account has been verified successfully.",
      })

      // Redirect to dashboard or home page
      // router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "The code you entered is incorrect or has expired.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    // Here you would call your API to resend the OTP
    // For example:
    // await resendOTP()
    console.log("hii");
    
    toast({
      title: "Code resent",
      description: "A new verification code has been sent to your email/phone.",
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify Your Account</CardTitle>
          <CardDescription className="text-center">Enter the 6-digit code we sent to your email/phone</CardDescription>
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
              <Timer initialSeconds={60} onExpire={() => {}} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={otp.length !== 6 || isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify Account"}
            </Button>
            <Button type="button" variant="ghost" className="text-sm" onClick={handleResend}>
              Didn't receive a code? Resend
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

// Timer component defined here
export function Timer({ initialSeconds, onExpire }) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    let interval  

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)
    } else if (seconds === 0) {
      setIsActive(false)
      onExpire()
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, seconds, onExpire])

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <div className="text-sm text-muted-foreground">
      {isActive ? <span>Resend code in {formatTime()}</span> : <span>You can now resend the code</span>}
    </div>
  )
}