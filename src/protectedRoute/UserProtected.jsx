import React from 'react'
import { Navigate , Outlet,useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useGoogleAuthContext } from '@/context/GoogleAuth'
function UserProtected() {
  const navigate = useNavigate()
  
  const location = useLocation();
    const {userDetails,isLoginUser} = useGoogleAuthContext()

    if (!isLoginUser) {
      console.log("Redirecting to login from:", location.pathname);
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return <Outlet />;

    // return (
    //   isLoginUser === true ? <Outlet/> : <Navigate to='/login' replace={false}/>
    // )
      
}

export default UserProtected
