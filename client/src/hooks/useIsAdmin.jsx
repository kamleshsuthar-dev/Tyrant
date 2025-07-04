// Create a new hook (e.g., useIsAdmin.js)
import { useGoogleAuthContext } from "@/context/GoogleAuth";

export const useIsAdmin = () => {
  const { userDetails, isLoginUser } = useGoogleAuthContext();
  const adminEmails = [
    "bantysaini28072005@gmail.com",
    "kamleshsuthar240725@gmail.com", 
    "limbachiyapinky95@gmail.com"
  ];

  if (!isLoginUser || !userDetails) return false;
  
  return adminEmails.includes(userDetails.email);
};