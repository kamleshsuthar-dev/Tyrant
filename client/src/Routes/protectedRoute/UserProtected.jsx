
import { useSelector } from 'react-redux';
import { Navigate , Outlet,useLocation } from 'react-router-dom'
function UserProtected() {
  
  const location = useLocation();
const {isLogin} = useSelector(state=>state?.auth?.data)

console.log("userProtected...",isLogin);

                if (isLogin === undefined || isLogin === null) {
  
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
                
    if (!isLogin) {
      console.log("Redirecting to login from:", location.pathname);
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return <Outlet />;
      
}

export default UserProtected
