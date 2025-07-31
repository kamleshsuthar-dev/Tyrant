// AuthRedirect.jsx

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthRedirect() {

const {isLogin} = useSelector(state=>state?.auth)
        
 if(isLogin === false) return <div className="h-[90vh] w-screen flex justify-center items-center"><h1 className="text-center  capitalize text-2xl ">user is not login </h1></div>

if (isLogin) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet/>
  
  // Always render children first, then handle redirect if needed
//   return children;
}

export default AuthRedirect;