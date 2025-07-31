import { useForm } from "react-hook-form";
import CustomInput from "@/components/components/component/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/validations/authSchema";
import { Button } from "@/components/ui/button";
import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  checkIsRegistered, loginUser } from "@/store/action/authAction";

export default function LoginForm() {
 
   
    const navigate= useNavigate()

   const dispatch = useDispatch()
 

  const {isRegistered ,login} = useSelector(state=>state?.auth) || {} 
    const error = login?.error
    const response = login?.response
  
  const { register, handleSubmit, formState: { errors, touchedFields, isValid,isSubmitting },  watch,} = useForm(
            {
            defaultValues: {
              email: "",
              password: "",
            },
    resolver: zodResolver(LoginSchema),
    mode: "onChange", // This enables real-time validation
  });

  const watchedValues = watch();

  const Watchemail = watch("email")


  const onSubmit = async(data) => {
   
    if(isRegistered){
     await dispatch(loginUser(data))
    }
  };

  useEffect(()=>{
    if(response.success){
      navigate("/")
      window.location.reload()
    }
  },[response ])

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
      if(fieldName== "email") return {message: "email is required"}
      if(fieldName== "password") return {message: "password is required"}
    }

    if(fieldName == "email"){
        if(!isRegistered && isTouched) return { message : "user is not register yet!"}
    }
    return null;
  };

   useEffect(() => {
      const validEmail = getFieldStatus("email");
      
      if (validEmail === "success") { 
        console.log(Watchemail);
            dispatch(checkIsRegistered(Watchemail))
        };
    }, [Watchemail, checkIsRegistered,getFieldStatus("email")]);
   

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full  ">
        {error.error && <p className="text-xs text-red-500 text-center">{error.error}</p>}
      <CustomInput 
        label="Email"
        type="email" 
        {...register("email")} 
        required={true}
        status={getFieldStatus("email")}
        error={getErrorMessage("email")}
        placeholder="janedoe@email.corn"
      />

      <CustomInput 
        forgotPassword= {true}
        label="Password"
        type="password" 
        {...register("password")}
        required={true}
        status={getFieldStatus("password")}
        error={getErrorMessage("password")}
        enableToggle={true}
        placeholder="i#ate@iggers"
      />
      
      <Button 
        type="submit"
        className="rounded-xl text-center py-[8px] px-0 active:scale-[0.99] font-medium "
        disabled={isSubmitting}
      >
        {isSubmitting ? <p>Loading... &gt;&gt;</p> :<p>Sign In &gt;&gt;</p> }
      </Button>
    </form>
  );
}

// import { useForm } from "react-hook-form";
// import CustomInput from "@/components/components/component/Input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { LoginSchema } from "@/validations/authSchema";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function LoginForm() {
//     const [isRegistered ,setIsRegistered] = useState()
//     const [error ,setError] = useState("")
//     const navigate= useNavigate()
   
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, touchedFields, isValid,isSubmitting },
//     watch,
//   } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     resolver: zodResolver(LoginSchema),
//     mode: "onChange", // This enables real-time validation
//   });

//   const watchedValues = watch();

//   const Watchemail = watch("email")

//    const checkIsRegistered = useCallback(async (email) => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_ISREGISTERED}/isregistered?email=${email}`,{withCredentials:true});
//       const isRegistered = response.data.isAlreadyRegistered;
//         console.log("isregistered" , response);
        
//       return isRegistered;
//     } catch (error) {
//       console.error("Error checking registration:", error);
//       return false;
//     }
//   }, []);



//   const onSubmit = async(data) => {
   
//     if(isRegistered){
//         try {
//           const response = await axios.post(`${import.meta.env.VITE_ISREGISTERED}/login`, data,{ withCredentials: true });
//           console.log(response);
//           if(response.data.success){
//             navigate("/")
//           }
        
//         } catch (err) {
//         //   console.log(err);
//           if(err.response.data.error == "Password Incorrect"){
//               setError("Invalid Email And Password ")
//           }else{
//             setError(err.response.data.error)
//           }
//         }finally{
//             setTimeout(()=>{
//                 setError("")
//             },3000)
//         }
//     }
//   };
  
//   const getFieldStatus = (fieldName) => {
//     const hasError = errors[fieldName];
//     const isTouched = touchedFields[fieldName];
//     const hasValue = watchedValues[fieldName]?.length > 0;
    
//     if (hasError) return "error";
//     if (isTouched && hasValue && !hasError) return "success";
//     // if (isTouched || hasValue ) return "error";
//     if (isTouched && !hasValue ) return "error";
//     return "idle"; // Default state
//   };

//    const getErrorMessage = (fieldName) => {
//     const hasError = errors[fieldName];
//     const isTouched = touchedFields[fieldName];
//     const hasValue = watchedValues[fieldName]?.length > 0;
    
//     if (hasError) return errors[fieldName]; 
//     if (isTouched && !hasValue) {
//       if(fieldName== "email") return {message: "email is required"}
//       if(fieldName== "password") return {message: "password is required"}
//     }

//     if(fieldName == "email"){
//         if(!isRegistered && isTouched) return { message : "user is not register yet!"}
//     }else{
//         return 
//     }
//     return null;
//   };

//    useEffect(() => {
//   const validEmail = getFieldStatus("email");
  
//   if (validEmail === "success") { // Check for "success" status specifically
//     const checkEmail = async () => {
//       try {
//         const result = await checkIsRegistered(Watchemail);
//         console.log("Is registered:", result);
//         setIsRegistered(result)
//       } catch (error) {
//         console.error("Error checking email:", error);
//       }
//     };
    
//     checkEmail();
//   }
// }, [Watchemail, checkIsRegistered,getFieldStatus("email")]);
   

//   return (

//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full  ">
//         {error && <p className="text-xs text-red-500 text-center">{error}</p>}
//       <CustomInput 
//         label="Email"
//         type="email" 
//         {...register("email")} 
//         required={true}
//         status={getFieldStatus("email")}
//         error={getErrorMessage("email")}
//         placeholder="janedoe@email.corn"
//       />

//       <CustomInput 
//         forgotPassword= {true}
//         label="Password"
//         type="password" 
//         {...register("password")}
//         required={true}
//         status={getFieldStatus("password")}
//         error={getErrorMessage("password")}
//         enableToggle={true}
//         placeholder="i#ate@iggers"
//       />
      
//       <Button 
//         type="submit"
//         className="rounded-xl text-center py-[8px] px-0 active:scale-[0.99] font-medium "
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? <p>Loading... &gt;&gt;</p> :<p>Sign In &gt;&gt;</p> }
//       </Button>
//     </form>
//   );
// }