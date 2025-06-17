import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
const Login = lazy(() => import("@/components/Auth/Login/Login"));
const NewRegister = lazy(() => import("@/components/Auth/Register/NewRegister"));


export const AuthRoutes = (
  <>
    <Route path="login" element={<Suspense><Login/></Suspense>} />
    <Route path="register" element={<Suspense><NewRegister/></Suspense>} />
  </>
);

export default AuthRoutes;
