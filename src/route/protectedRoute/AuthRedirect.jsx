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

// if (isLoginUser === undefined || isLoginUser === null) {
  
//   return (
//     <div className=" flex items-center justify-center  h-screen">
//       <div className=" animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 capitalize">
      
//       </div>
//       <div className="">
//            Page Loading...
//       </div>
//     </div>

   
//   );
// }

if (isLoginUser) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet/>
  
  // Always render children first, then handle redirect if needed
//   return children;
}

export default AuthRedirect;