import { GoogleBtn } from "@/App";
import { NavLink } from "react-router-dom";
import "../login/login.css";

import RegisterForm from "../../components/RegisterForm";
import { MobileDesignAuthSVG } from "@/components/components/component/CommonSVG";

function Register({ text }) {
  return (
    <>
      {/* <div className="h-screen w-screen flex font-comfortaa">
        <div className="h-full hidden md:flex  w-[50%]">
          <img
            src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1752208362/Image_fz562j.png"
            alt=""
            className="h-full  w-full object-cover"
          />
        </div>
        
        <div className=" h-full w-[50%] px-28 border-2 border-red-600 border-dashed ">
          <div className="card min-w-[350px] w-full min-h-[60%] bg-secondary rounded-xl text-primary grid gap-4 items-center text-lg ">
            <h1 className="text-3xl font-bold ">Sign Up To Tyrant</h1>
            
            
            <RegisterForm/>

            <div className="text-center leading-none text-primary text-base">OR</div>
            <GoogleBtn text="Continue with Google" />
            <div className="text-sm">
              By creating an account, you agree to the{" "}
              <span className="text-blue-500">Terms of Service</span>. For more
              information about Tyrant's privacy practices, see the{" "}
              <span className="text-blue-500">Tyrant Privacy Statement</span>.
              We'll occasionally send you account-related emails.
            </div>
          </div>
          <div className="absolute mt-2 text-lg text-center top-4 right-10">
            Already have an account?{" "}
            <NavLink to="/login" className="text-[#0F7DE3] hover:underline">
              <button>Sign In &rarr;</button>
            </NavLink>
          </div>
        </div>

      </div> */}

      <div className="h-screen w-screen flex  font-comfortaa">
        <div className="h-full w-[50%] hidden md:flex">
          <img
            src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1752208362/Image_fz562j.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="h-full md:w-[50%] w-full flex flex-col justify-end md:justify-start p-10 lg:p-24 md:p-12 md:py-12 ">
          <div className="card w-full  bg-secondary rounded-xl text-primary grid gap-4 items-center text-lg ">
                <div className="absolute top-0 left-0 md:hidden bg-black">
                  {/* <MobileDesignAuthSVG/> */}
                  <img src="./public/images/Pattern Classy.png" alt="" className="object-cover" />
                </div>
               <div className="absolute mt-2 lg:text-lg md:text-md text-center top-4 right-10 flex gap-2">
                  <span className="hidden md:flex"> Already have an account?{" "}</span> 
                  <NavLink to="/login" className="text-[#0F7DE3] hover:underline">
                    <button>Sign In &rarr;</button>
                  </NavLink>
               </div>
            <div className="self-stretch px-7 inline-flex flex-col justify-start items-start">
                <div className="self-stretch justify-start text-Pure-White text-4xl font-normal font-['AUTOMATA']">Sign Up to <span className="text-5xl bg-gradient-to-r from-black via-green-800 to-lime-400 bg-clip-text text-transparent">Tyrant</span></div>
            </div>         

            <RegisterForm />

            <div className="text-center leading-none text-primary text-base md:text-sm lg:text-md">
              ---------OR---------
            </div>
            <GoogleBtn text="Continue with Google" />
            <div className="text-sm">
              By creating an account, you agree to the{" "}
              <span className="text-blue-500">Terms of Service</span>. For more
              information about Tyrant's privacy practices, see the{" "}
              <span className="text-blue-500">Tyrant Privacy Statement</span>.
              We'll occasionally send you account-related emails.
            </div>
          </div>

        

        </div>
      </div>
    </>
  );
}

export default Register;
