import { useForm } from "react-hook-form";
import CustomInput from "@/components/components/component/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/validations/authSchema";
import { Button } from "@/components/ui/button";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsRegistered, registerUser } from "@/store/action/authAction";
import { useEffect, useState } from "react";

export default function RegisterForm() {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const [data,setData]=useState()
 const {registers , isRegistered} = useSelector(state=>state?.auth)
 const error = registers?.error
 const response = registers?.response
 

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
    mode: "onChange", // This enables real-time validation
  });

  const watchedValues = watch();
   const Watchemail = watch("email")
 
  const onSubmit = async(data) => {
    setData(data)
    console.log(data);
   await dispatch(registerUser(data))
  };

  useEffect(()=>{
    if(response?.success) {
       navigate("/otp-verification", { state: {data } });
    }
  },[response])
  
  // const onSubmit = async(data) => {
  //   console.log(data);
  //     try {
  //       const res = await axios.post(`${import.meta.env.VITE_ISREGISTERED}/register`, data , { withCredentials: true });
  //       console.log(res.data);
  //       if (res.data.success) {
  //         navigate("/otp", { state: {data } });
  //       } else {
  //         console.error("Registration failed:", res.data.message);
  //       }
  //     } catch (error) {
  //       console.error("Error during registration:", error);
  //     }
  // };

  
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
      if(fieldName == "name") return { message: "Name is required" }; 
      if(fieldName == "email") return { message: "email is required" }; 
      if(fieldName == "password") return { message: "password is required" }; 
    }
     if(fieldName == "email"){
        if(isRegistered && isTouched) return { message : "User Is Already Registered !"}
    }

    return null;
  };

   useEffect(() => {
        const validEmail = getFieldStatus("email");
  
        if (validEmail === "success") { 
              dispatch(checkIsRegistered(Watchemail))
          };
      }, [Watchemail, checkIsRegistered,getFieldStatus("email")]);

  return (
    <>
   {error && <p className="text-xs text-red-500 text-center">{error.error}</p>}

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full  ">
      <CustomInput
        label="Full Name"
        type="text"
        {...register("name")}
        required={true}
        status={getFieldStatus("name")}
        error={getErrorMessage("name")}
        placeholder="Jane Doe"
      />
      
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
        className="rounded-xl text-center py-[10px] px-0 active:scale-[0.99] font-medium "
        disabled={isSubmitting}
      >
        {isSubmitting ? <p>Loading... &gt;&gt;</p> :<p>Continue &gt;&gt;</p> }
      </Button>
    </form>
     </>
  );
}


// import { useForm } from "react-hook-form";
// import CustomInput from "@/components/components/component/Input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { RegisterSchema } from "@/validations/authSchema";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function RegisterForm() {
//   const navigate = useNavigate()
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, touchedFields, isValid,isSubmitting },
//     watch,
//   } = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//     resolver: zodResolver(RegisterSchema),
//     mode: "onChange", // This enables real-time validation
//   });

//   const watchedValues = watch();

//   // const onSubmit = async (data) => {
    
      
//   //     console.log(data);
      
//   //     // let isValid = true;
//   //     // Object.entries(formData).forEach(([field, fieldState]) => {
//   //     //   handleChange({target:{
//   //     //     name: field,
//   //     //     value: fieldState.value,
//   //     //   }});
//   //     //   if (fieldState.error) {
//   //     //     isValid = false;
//   //     //   }
//   //     // });
//   //     // if (isValid) {
//   //     //   const { name, email, password } = formData;
//   //     //   const credentials = {
//   //     //     name: name.value,
//   //     //     email: email.value,
//   //     //     password: password.value,
//   //     //   };
//   //   //     try {
//   //   //       const res = await axios.post(`${import.meta.env.VITE_ISREGISTERED}/register`, credentials , { withCredentials: true });
//   //   //       console.log(res.data);
//   //   //       if (res.data.success) {
//   //   //         navigate("/otp", { state: { credentials } });
//   //   //       } else {
//   //   //         console.error("Registration failed:", res.data.message);
//   //   //       }
//   //   //     } catch (error) {
//   //   //       console.error("Error during registration:", error);
//   //   //     }
//   //   //   }
//   //   };

//   const onSubmit = async(data) => {
//     console.log(data);
//       try {
//         const res = await axios.post(`${import.meta.env.VITE_ISREGISTERED}/register`, data , { withCredentials: true });
//         console.log(res.data);
//         if (res.data.success) {
//           navigate("/otp", { state: {data } });
//         } else {
//           console.error("Registration failed:", res.data.message);
//         }
//       } catch (error) {
//         console.error("Error during registration:", error);
//       }
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
//       if(fieldName == "name") return { message: "Name is required" }; 
//       if(fieldName == "email") return { message: "email is required" }; 
//       if(fieldName == "password") return { message: "password is required" }; 
//     }
//     return null;
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full  ">
//       <CustomInput
//         label="Full Name"
//         type="text"
//         {...register("name")}
//         required={true}
//         status={getFieldStatus("name")}
//         error={getErrorMessage("name")}
//         placeholder="Jane Doe"
//       />
      
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
//         className="rounded-xl text-center py-[10px] px-0 active:scale-[0.99] font-medium "
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? <p>Loading... &gt;&gt;</p> :<p>Continue &gt;&gt;</p> }
//       </Button>
//     </form>
//   );
// }