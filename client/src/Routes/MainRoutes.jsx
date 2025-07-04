import AdminProtected from "@/Routes/protectedRoute/AdminProtected";
import AuthRedirect from "@/Routes/protectedRoute/AuthRedirect";
import UserProtected from "@/Routes/protectedRoute/UserProtected";
import { Route, Routes } from "react-router-dom";
import Layout from "./../../Layout";
import AdminRoutes from "./AdminRoutes";
import AuthRoutes from "./AuthRoutes";
import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";



function MainRoutes() {
  return (
    <Routes>
      <Route element={<AuthRedirect />}>{AuthRoutes}</Route>
      <Route path="/" element={<Layout />}>
        {PublicRoutes}

        <Route element={<UserProtected />}>{UserRoutes}</Route>

        <Route element={<AdminProtected />}>{AdminRoutes}</Route>
      </Route>
    </Routes>
  );
}

export default MainRoutes;
