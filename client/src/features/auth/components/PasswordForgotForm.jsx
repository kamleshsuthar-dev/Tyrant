import { useForm } from "react-hook-form";
import CustomInput from "@/components/components/component/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/validations/authSchema";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { email } from "zod";


export default function PasswordForgotForm() {
    const [isRegistered ,setIsRegistered] = useState()
    const [error ,setError] = useState("")
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid,isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange", // This enables real-time validation
  });

  const watchedValues = watch();

  const Watchemail = watch("email")

   const checkIsRegistered = useCallback(async (email) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_ISREGISTERED}/isregistered?email=${email}`,{withCredentials:true});
      const isRegistered = response.data.isAlreadyRegistered;

      return isRegistered;
    } catch (error) {
      console.error("Error checking registration:", error);
      return false;
    }
  }, []);

  const sentOtp = (data) => {
    console.log(data);
    
     if (isRegistered === false) {
      navigate("/register");
    } else {
      console.log("otp");
      navigate("/otpforresetpass", { state: {email:data.email} });
    }
  };
  
  const getFieldStatus = (fieldName) => {
    const hasError = errors[fieldName];
    const isTouched = touchedFields[fieldName];
    const hasValue = watchedValues[fieldName]?.length > 0;
    
    if (hasError) return "error";
    if (isTouched && hasValue && !hasError) return "success";
    // if (isTouched || hasValue ) return "error";
    if (isTouched && !hasValue ) return "error";
    return "idle"; // Default state
  };

   const getErrorMessage = (fieldName) => {
    const hasError = errors[fieldName];
    const isTouched = touchedFields[fieldName];
    const hasValue = watchedValues[fieldName]?.length > 0;
    
    if (hasError) return errors[fieldName]; 
    if (isTouched && !hasValue) {
      return { message: "email is required" }; 
    }

    if(fieldName == "email"){
        if(!isRegistered && isTouched) return { message : "user is not register yet!"}
    }else{
        return 
    }
    return null;
  };

   useEffect(() => {
  const validEmail = getFieldStatus("email");
  
  if (validEmail === "success") { // Check for "success" status specifically
    const checkEmail = async () => {
      try {
        const result = await checkIsRegistered(Watchemail);
        console.log("Is registered:", result);
        setIsRegistered(result)
      } catch (error) {
        console.error("Error checking email:", error);
      }
    };
    
    checkEmail();
  }
}, [Watchemail, checkIsRegistered,getFieldStatus("email")]);

  return (

    <form onSubmit={handleSubmit(sentOtp)} className="flex flex-col gap-4 w-full  ">
        {error && <p className="text-xs text-red-500 text-center">{error}</p>}
      <CustomInput 
        label="Email"
        type="email" 
        {...register("email")} 
        required={true}
        status={getFieldStatus("email")}
        error={getErrorMessage("email")}
        placeholder="janedoe@email.corn"
      />

    {/* <div className="h-ful"></div> */}
      
      <Button 
        type="submit"
        className="rounded-xl text-center py-[8px] px-0 active:scale-[0.99] font-medium "
        disabled={isSubmitting}
      >
        {isSubmitting ? <p>Loading... &gt;&gt;</p> :<p>Send OTP &gt;&gt;</p> }
      </Button>
    </form>
  );
}