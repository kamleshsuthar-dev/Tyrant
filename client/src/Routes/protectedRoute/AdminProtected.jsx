import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const AdminProtected = () => {
const {isLogin ,userData} = useSelector(state=>state?.auth?.data)
  const isAdmin = useIsAdmin()
  // Show a loading state until userDetails is available

  if(isLogin === false) return <h1 className="text-center h-[90%] capitalize text-2xl  top-[50%]">user is not login </h1>
  
  if (userData === undefined || userData === null) {
  
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
  if (!isAdmin ) {
    return <Navigate to="/"  />;
  }

  return <Outlet />;
};

export default AdminProtected;
