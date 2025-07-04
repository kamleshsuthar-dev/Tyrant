import { Navigate, Outlet } from "react-router-dom";
import { useGoogleAuthContext } from "../../context/GoogleAuth";

const AdminProtected = () => {
  const { userDetails,isLoginUser } = useGoogleAuthContext();
  const adminEmail = "bantysaini28072005@gmail.com"; // Admin Email
  const adminEmailOne = "kamleshsuthar240725@gmail.com"; // Admin Email
  const adminEmailTwo = "limbachiyapinky95@gmail.com"; // Admin Email

  // Show a loading state until userDetails is available

  if(isLoginUser === false) return <h1 className="text-center h-[90%] capitalize text-2xl  top-[50%]">user is not login </h1>
  
  if (userDetails === undefined || userDetails === null) {
  
    return (
      <div className=" flex items-center justify-center  h-screen">
        <div className=" animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 capitalize">
        
        </div>
        <div className="">
        only admin can excess
        </div>
      </div>

     
    );
  }

  // Redirect if user is not admin
  if (userDetails.email !== adminEmail && userDetails.email !== adminEmailOne &&userDetails.email !== adminEmailTwo) {
    return <Navigate to="/"  />;
  }

  return <Outlet />;
};

export default AdminProtected;
