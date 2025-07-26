import { Route } from "react-router-dom";

import {Login ,Register} from "@/features/auth";

export const AuthRoutes = (
  <>
  
    <Route path="login" element={<Login/>} />
    <Route path="register" element={<Register/>} />
  </>
);

export default AuthRoutes;

