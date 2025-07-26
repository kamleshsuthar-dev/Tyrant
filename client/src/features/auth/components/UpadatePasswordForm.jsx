import { useForm } from "react-hook-form";
import CustomInput from "@/components/components/component/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {  UpdatePasswordSchema } from "@/validations/authSchema";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function UpdatePasswordForm({email}) {
 const navigate= useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields,isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(UpdatePasswordSchema),
    mode: "onChange", 
  });
  const watchedValues = watch();

  const onSubmit = async(data) => {
        console.log(data);
           try {
        const response = await axios.post(`${import.meta.env.VITE_RESET_PASSWORD}`,
          {
            email:email ,
            newPassword: data.password,
          },
        );
        console.log("response .......", response);
        navigate("/login");
        alert("Password Change Successfully");
      } catch (error) {
        console.log("reset password error", error);
        setError(`error:  ${error?.message} `);
        setTimeout(() => {
          setError(" ");
        }, 1000);

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
      if (fieldName == "password") return {message: "password is required"}
    }

   
    return null;
  };

 
  return (

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full  ">
        {/* {error && <p className="text-xs text-red-500 text-center">{error}</p>} */}
     
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

      <CustomInput 
        label="Confirm Password"
        type="password" 
        {...register("confirmPassword")}
        required={true}
        status={getFieldStatus("confirmPassword")}
        error={getErrorMessage("confirmPassword")}
        enableToggle={true}
        placeholder="i#ate@iggers"
      />
      
      <Button 
        type="submit"
        className="rounded-xl text-center py-[8px] px-0 active:scale-[0.99] font-medium "
        disabled={isSubmitting}
      >
        {isSubmitting ? <p>Loading... &gt;&gt;</p> :<p>Submit &gt;&gt;</p> }
      </Button>
    </form>
  );
}