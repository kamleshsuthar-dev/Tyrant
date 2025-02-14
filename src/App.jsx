import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout.jsx";
import Home from "./route/Home.jsx";
import ProductList from "./route/ProductList.jsx";
import Login from "./component/Auth/Login/Login.jsx";
import NewRegister from "./component/Auth/Register/NewRegister.jsx";
import ForgotPasswordForm from "./component/Auth/ForgotPassword/ForgotPasswordForm.jsx";
import ShoppingCart from "./route/ShoppingCart.jsx";
import ProductDetails from './route/ProductDetails.jsx'
import Profile from "./route/Profile.jsx";
//   import {AppProvider} from './context/ProductContext.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAuth from "./component/Auth/GoogleAuth.jsx";
import Password from "./component/Auth/Password.jsx";
import Temp from "./route/ProductDetails.jsx";
import ShoppingCartTopUp from "./route/ShoppingCartTopUp.jsx";
import HomeSquareSection from "./component/HomeSquareSection.jsx";

export const GoogleBtn = ({ text }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API}>
      <GoogleAuth text={text} />
    </GoogleOAuthProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
    
      
     
        <Route path="/productList" element={<ProductList />} />
     
        <Route path="Profile" element={<Profile />} />
      </Route>
      <Route path="forgotpasswordform" element={<ForgotPasswordForm />} />
      <Route path="register" element={<NewRegister />} />
      <Route path="login" element={<Login />} />
      <Route path="password" element={<Password />} />
      <Route path="cart" element={<ShoppingCartTopUp/>} />
      <Route path="shoppingcart" element={<ShoppingCart />} />
      <Route path="productDetails" element={<ProductDetails />} />
      <Route path="ss" element={<HomeSquareSection/>} />
    
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
