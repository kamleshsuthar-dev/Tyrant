import { useSelector } from "react-redux";

export const useIsAdmin = () => {
  const {isLogin ,userData} = useSelector(state=>state?.auth?.data)

  const adminEmails = [
    "bantysaini28072005@gmail.com",
    "kamleshsuthar240725@gmail.com", 
    "limbachiyapinky95@gmail.com"
  ];

  if (!isLogin || !userData) return false;
  
  return adminEmails.includes(userData.email);
};