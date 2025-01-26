import React from 'react'
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
  import Layout from "../Layout.jsx";
  import Home from "./route/Home.jsx";
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
  import ShoppingCart from "./route/ShoppingCart.jsx";
  import Profile from './route/Profile.jsx'
//   import {AppProvider} from './context/ProductContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from './component/Auth/GoogleAuth.jsx';

export const GoogleBtn =({text})=>{
    return (
      <GoogleOAuthProvider clientId = '179885607915-i8gc1r7cavdjcscen10inhj9e3137ejc.apps.googleusercontent.com'>
            <GoogleAuth text={text} />
      </GoogleOAuthProvider>

    )
}

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
            <Route path="shoppingcart" element={<ShoppingCart />} />
            <Route path="Profile" element={<Profile />} />
        
         
        </Route>
            <Route path="forgotpasswordform" element={<ForgotPasswordForm />} />
            <Route path="register" element={<NewRegister />} />
            <Route path="login" element={<Login />} />
      </>
    )
  );



function App() {
  return (
    <>
     <RouterProvider router={router} /> 
    </>
  )
}

export default App
