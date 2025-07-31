
import { useSelector } from 'react-redux';
import { Navigate , Outlet,useLocation } from 'react-router-dom'
function UserProtected() {
  
  const location = useLocation();
const {isLogin} = useSelector(state=>state?.auth)

console.log("userProtected...",isLogin);

                if (isLogin === undefined || isLogin === null || isLogin=== false) {
  
                  return (
                    <div className=" flex items-center justify-center  h-screen">
                     
                      <div className="">
                         
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
