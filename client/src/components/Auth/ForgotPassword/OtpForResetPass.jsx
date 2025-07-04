import VerifyOTP from "@/features/reuseable-component/VerifyOTP";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function OtpForResetPass() {
  const location = useLocation();
  const email = location?.state.email;
  console.log(email, "resettttt");
  const navigate = useNavigate();
  // const [value, setValue] = useState();
  const [error, setError] = useState();

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
      console.log("reset password api error (email,otp)", error);
      setError(error);
    }
  };

  return (
    <VerifyOTP
      submitFunction={submitBtn}
      worngPassMessage={error}
      credentials={email}
      type="resetPassword"
    />
  );
}
