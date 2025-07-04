// AuthRedirect.jsx

import { Navigate, Outlet } from 'react-router-dom';
import { useGoogleAuthContext } from '@/context/GoogleAuth';

function AuthRedirect() {

  const { isLoginUser } = useGoogleAuthContext();
        console.log("auth Redirect ",isLoginUser);
        


if (isLoginUser) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet/>
  
  // Always render children first, then handle redirect if needed
//   return children;
}

export default AuthRedirect;