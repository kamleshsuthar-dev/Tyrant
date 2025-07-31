import AdminProtected from "@/Routes/protectedRoute/AdminProtected";
import AuthRedirect from "@/Routes/protectedRoute/AuthRedirect";
import UserProtected from "@/Routes/protectedRoute/UserProtected";
import { Route, Routes } from "react-router-dom";
import Layout from "./../../Layout";
import AdminRoutes from "./AdminRoutes";
import AuthRoutes from "./AuthRoutes";
import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";
import {PageNotFound} from "@/pages"
import { Suspense } from "react";


function MainRoutes() {
  return (
    <Suspense>
    <Routes>
      <Route element={<AuthRedirect />}>{AuthRoutes}</Route>
        {PublicRoutes}
      <Route path="/" element={<Layout />}>

        <Route element={<UserProtected />}>{UserRoutes}</Route>

        <Route element={<AdminProtected />}>{AdminRoutes}</Route>
      </Route>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </Suspense>
  );
}

export default MainRoutes;
