// AuthRedirect.jsx

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthRedirect() {

const {isLogin} = useSelector(state=>state?.auth?.data)
        


if (isLogin) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet/>
  
  // Always render children first, then handle redirect if needed
//   return children;
}

export default AuthRedirect;