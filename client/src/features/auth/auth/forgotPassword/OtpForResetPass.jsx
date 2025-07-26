// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import {VerifyOTP} from "@/components/components"

// export function OtpForResetPass() {
//   console.log("hiii");
  
//   const location = useLocation();

//   const email = location?.state.email;
//   // console.log(email, "resettttt");


//   const navigate = useNavigate();
//   // const [value, setValue] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     (async () => {
//       try {
//         let res = await axios.post(`${import.meta.env.VITE_RESET_PASSWORD}`, {
//           email,
//         });
//         console.log("sending email", res.data.success);
//       } catch (error) {
//         console.log("reset password api error (email)", error);
//         setError(error);
//       }
//     })();
//   }, [email]);

//   const submitBtn = async (value) => {
//     try {
//       let res = await axios.post(`${import.meta.env.VITE_RESET_PASSWORD}`, {
//         email,
//         otp: value,
//       });
//       if (res.data.success) {
//         navigate("/updatepassword", { state: { email } });
//       }
//       console.log("sending email,otp", res);
//     } catch (error) {
//       console.log("reset password api error (email,otp)", error);
//       setError(error);
//     }
//   };

//   return (
//     <VerifyOTP
//       submitFunction={submitBtn}
//       worngPassMessage={error}
//       credentials={email}
//       type="resetPassword"
//     />
    
//   );
// }


import  VerifyOTP  from '../../components/VerifyOTP';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Background from '../../components/Background';

function OtpForResetPass() {
  const location = useLocation()
  console.log(location.state);
  const email = location?.state.email

   const navigate = useNavigate();
;
  const [error, setError] = useState();
  console.log(email);
  

   useEffect(() => {
    (async () => {
      try {
        let res = await axios.post(`${import.meta.env.VITE_RESET_PASSWORD}`, {
          email,
        });
        console.log("sending email", res.data.success);
      } catch (error) {
        console.log("reset password api error (email)", error);
        setError(error);
      }
    })();
  }, [email]);

  const submitBtn = async (value) => {
    try {
      let res = await axios.post(`${import.meta.env.VITE_RESET_PASSWORD}`, {
        email,
        otp: value,
      });
      if (res.data.success) {
        navigate("/updatepassword", { state: { email } });
      }
      console.log("sending email,otp", res);
    } catch (error) {
      console.log("reset password api error (email,otp)", error.response.data?.error ||error.response.data.message );
      setError({ message : error.response.data.error ||error.response.data.message  , key: Date.now()});
    }
  };
  
  return (
    <Background >

   <VerifyOTP
      submitFunction={submitBtn}
      worngPassMessage={error}
      credentials={email}
      type="resetPassword"
      />
      
      </Background>
  )
}

export default OtpForResetPass