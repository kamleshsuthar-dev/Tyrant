import { Navigate, Outlet } from "react-router-dom";
import { useGoogleAuthContext } from "../../context/GoogleAuth";

const AdminProtected = () => {
  const { userDetails } = useGoogleAuthContext();
  const adminEmail = "bantysaini28072005@gmail.com"; // Admin Email
  const adminEmailOne = "kamleshsuthar240725@gmail.com"; // Admin Email

  // Show a loading state until userDetails is available
  if (userDetails === undefined || userDetails === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900">
          Loading...
        </div>
      </div>
    );
  }

  // Redirect if user is not admin
  if (userDetails.email !== adminEmail && userDetails.email !== adminEmailOne ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtected;
