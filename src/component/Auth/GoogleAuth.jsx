import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const url = "https://expresstest-31m8.onrender.com/api/auth/google";

// window.location.href= 'https://expresstest-31m8.onrender.com/api/auth/google'

// axios.get ('https://expresstest-31m8.onrender.com/api/auth/google')
// .then((response)=>{
//   console.log(response);

// })
// .catch((error)=>{
//   console.log(error);
//   console.log(error.message);
//   if (error.response) {
//     console.error('Response error:', error.response.data);
//   } else if (error.request) {
//     console.error('No response received:', error.request);
//   } else {
//     console.error('Error setting up request:', error.message);
//   }

// })}

import React from "react";

function GoogleAuth({text}) {
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await axios.get(`${url}?code=${authResult["code"]}`);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleSubmit = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <>
      <button
        className="col-span-1 row-span-1 rounded-xl bg-white flex items-center justify-center gap-2 py-1 text-center sm:text-xl text-lg  text-[#3F3F3F] border-2 border-solid border-black hover:scale-[0.95] "
        onClick={googleSubmit}
      >
        <svg
          // width="22"
          // height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px] "
        >
          <g clipPath="url(#clip0_3107_16599)">
            <path
              d="M8.16413 0.723606C5.96598 1.48616 4.07031 2.93352 2.75555 4.85308C1.44079 6.77264 0.776236 9.06323 0.859511 11.3884C0.942786 13.7136 1.7695 15.9507 3.21821 17.7713C4.66693 19.5919 6.66128 20.8999 8.90834 21.5033C10.7301 21.9734 12.6387 21.994 14.4702 21.5634C16.1294 21.1908 17.6633 20.3936 18.9218 19.25C20.2316 18.0234 21.1823 16.463 21.6718 14.7366C22.2038 12.8591 22.2984 10.8847 21.9485 8.96501H11.7185V13.2086H17.643C17.5246 13.8854 17.2709 14.5314 16.897 15.1079C16.5231 15.6844 16.0368 16.1795 15.4671 16.5636C14.7436 17.0422 13.9281 17.3642 13.0729 17.5089C12.2151 17.6684 11.3353 17.6684 10.4776 17.5089C9.6082 17.3292 8.78579 16.9704 8.06272 16.4553C6.9011 15.6331 6.02888 14.4649 5.57053 13.1175C5.10443 11.7449 5.10443 10.2568 5.57053 8.88423C5.8968 7.9221 6.43615 7.04609 7.14834 6.32157C7.96336 5.47723 8.9952 4.87369 10.1306 4.57717C11.2661 4.28065 12.4613 4.30261 13.5851 4.64064C14.4629 4.91012 15.2657 5.38097 15.9294 6.01564C16.5975 5.35105 17.2643 4.68475 17.9301 4.01673C18.2738 3.65751 18.6485 3.31548 18.9871 2.94767C17.974 2.00489 16.7848 1.2713 15.4877 0.788918C13.1256 -0.0687554 10.5411 -0.0918046 8.16413 0.723606Z"
              fill="white"
            />
            <path
              d="M8.16414 0.723587C10.5409 -0.0923781 13.1255 -0.0699356 15.4877 0.78718C16.7851 1.27284 17.9737 2.00996 18.9854 2.95624C18.6416 3.32406 18.279 3.66781 17.9284 4.02531C17.2615 4.69103 16.5952 5.35447 15.9295 6.01562C15.2658 5.38095 14.463 4.9101 13.5851 4.64062C12.4617 4.30141 11.2665 4.27818 10.1308 4.57349C8.99502 4.86879 7.96255 5.47122 7.14664 6.31468C6.43445 7.0392 5.89509 7.91521 5.56883 8.87734L2.00586 6.11874C3.28119 3.58971 5.48933 1.65519 8.16414 0.723587Z"
              fill="#E33629"
            />
            <path
              d="M1.06078 8.85159C1.25228 7.90248 1.57022 6.98335 2.00609 6.11877L5.56906 8.88424C5.10296 10.2568 5.10296 11.7449 5.56906 13.1175C4.38197 14.0342 3.19432 14.9554 2.00609 15.8813C0.914942 13.7093 0.582161 11.2346 1.06078 8.85159Z"
              fill="#F8BD00"
            />
            <path
              d="M11.7185 8.96326H21.9485C22.2985 10.883 22.2038 12.8574 21.6718 14.7348C21.1824 16.4613 20.2316 18.0217 18.9218 19.2483C17.772 18.3511 16.617 17.4608 15.4671 16.5636C16.0372 16.179 16.5238 15.6834 16.8977 15.1063C17.2716 14.5292 17.5251 13.8826 17.6431 13.2051H11.7185C11.7168 11.7923 11.7185 10.3778 11.7185 8.96326Z"
              fill="#587DBD"
            />
            <path
              d="M2.00391 15.8812C3.19214 14.9646 4.37979 14.0433 5.56687 13.1175C6.02614 14.4653 6.8996 15.6336 8.0625 16.4553C8.78783 16.9679 9.61201 17.3238 10.4825 17.5003C11.3403 17.6598 12.2201 17.6598 13.0778 17.5003C13.9331 17.3555 14.7486 17.0335 15.472 16.555C16.6219 17.4522 17.7769 18.3425 18.9267 19.2397C17.6684 20.3839 16.1345 21.1817 14.4752 21.5548C12.6437 21.9854 10.735 21.9648 8.91328 21.4947C7.47246 21.11 6.12663 20.4318 4.96016 19.5026C3.72551 18.5224 2.71711 17.2871 2.00391 15.8812Z"
              fill="#319F43"
            />
          </g>
          <defs>
            <clipPath id="clip0_3107_16599">
              <rect
                width="22"
                height="22"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
        {/* Sign Up with Google */}
        {text}
      </button>
    </>
  );
}

export default GoogleAuth;
