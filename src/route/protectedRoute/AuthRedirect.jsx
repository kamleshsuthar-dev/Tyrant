// AuthRedirect.jsx
import { useEffect } from 'react';
import { useNavigate,Navigate, Outlet } from 'react-router-dom';
import { useGoogleAuthContext } from '@/context/GoogleAuth';

function AuthRedirect() {
  const navigate = useNavigate();
  const { isLoginUser } = useGoogleAuthContext();
        console.log("authhh ",isLoginUser);
        
//   useEffect(() => {
//     // Only redirect if user is already logged in
//     if (isLoginUser) {
//       navigate('/profile');
//     }
//   }, [isLoginUser, navigate]);

if (isLoginUser) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet/>
  
  // Always render children first, then handle redirect if needed
//   return children;
}

export default AuthRedirect;