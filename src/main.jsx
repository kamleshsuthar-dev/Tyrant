import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProductContext from "./context/ProductContext.jsx";

import "./index.css";

import {
  Route,
  Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout.jsx";
import Home from "./route/Home.jsx";
import AboutUS from "../src/route/AboutUs.jsx";

import Kurtas from "./route/krutas.jsx";
import Gown from "./route/Gown.jsx";
import Alinekurtas from "./component/krutas/Alinekurtas.jsx";
import EmbrodeiryKurta from "./component/krutas/EmbroideryKurta.jsx";
import StraightKurta from "./component/krutas/StraightKurta.jsx";
import ProductList from "./route/ProductList.jsx";
import Login from "./component/Auth/Login/Login.jsx";
import NewRegister from "./component/Auth/Register/NewRegister.jsx";
import ForgotPasswordForm from "./component/Auth/ForgotPassword/ForgotPasswordForm.jsx";
import ProductDetails from "./route/ProductDetails.jsx";
import Layout1 from "../Layout1.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/kurtas" element={<Kurtas />}>
          <Route path="alinekurta" element={<Alinekurtas />} />
          <Route path="embrod" element={<EmbrodeiryKurta />} />
          <Route path="straight" element={<StraightKurta />} />
        </Route>
        <Route path="/gown" element={<Gown />}></Route>

        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/productList" element={<ProductList />} />
      
       
      </Route>
          <Route path="forgotpasswordform" element={<ForgotPasswordForm />} />
          <Route path="register" element={<NewRegister />} />
          <Route path="login" element={<Login />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
