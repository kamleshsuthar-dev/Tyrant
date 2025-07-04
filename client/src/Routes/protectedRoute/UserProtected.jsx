
import { Navigate , Outlet,useLocation } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import { useGoogleAuthContext } from '@/context/GoogleAuth'
function UserProtected() {
  // const navigate = useNavigate()
  
  const location = useLocation();
    const {isLoginUser} = useGoogleAuthContext()
                console.log("userProtected...",isLoginUser);

                if (isLoginUser === undefined || isLoginUser === null) {
  
                  return (
                    <div className=" flex items-center justify-center  h-screen">
                      <div className=" animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 capitalize">
                      
                      </div>
                      <div className="">
                          Page Loading ...
                      </div>
                    </div>
              
                   
                  );
                }            
                
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
