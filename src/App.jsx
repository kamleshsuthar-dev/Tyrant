// import React from "react";
// import {
//   BrowserRouter,
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
// import Layout from "../Layout.jsx";
// import Home from "./route/Home.jsx";

// // import Login from "./component/Auth/Login/Login.jsx";
// // import NewRegister from "./component/Auth/Register/NewRegister.jsx";
// // import ForgotPasswordForm from "./component/Auth/ForgotPassword/ForgotPasswordForm.jsx";
// // import ShoppingCart from "./route/ShoppingCart.jsx";
// // import ProductDetails from './route/ProductDetails.jsx'
// import Profile from "./route/Profile.jsx";
// //   import {AppProvider} from './context/ProductContext.jsx'
// import { GoogleOAuthProvider } from "@react-oauth/google";
// // import GoogleAuth from "./component/Auth/GoogleAuth.jsx";
// // import Password from "./component/Auth/Password.jsx";
// import Temp from "./route/ProductDetails.jsx";
// // import ShoppingCartTopUp from "./route/ShoppingCartTopUp.jsx";
// import HomeSquareSection from "./component/home/HomeSquareSection.jsx";
// import { lazy } from "react";

// const ProductList = lazy(()=>import("./route/ProductList.jsx"))
// const Login = lazy(()=>import("./component/Auth/Login/Login.jsx"))
// const ShoppingCartTopUp = lazy(()=>import("./route/ShoppingCartTopUp.jsx"))
// const Password = lazy(()=>import("./component/Auth/Password.jsx"))
// const GoogleAuth = lazy(()=>import("./component/Auth/GoogleAuth.jsx"))
// const ProductDetails = lazy(()=>import("./route/ProductDetails.jsx"))
// const ShoppingCart = lazy(()=>import("./route/ShoppingCart.jsx"))
// const ForgotPasswordForm = lazy(()=>import("./component/Auth/ForgotPassword/ForgotPasswordForm.jsx"))
// const NewRegister = lazy(()=>import("./component/Auth/Register/NewRegister.jsx"))

// export const GoogleBtn = ({ text }) => {
//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API}>
//       <GoogleAuth text={text} />
//     </GoogleOAuthProvider>
//   );
// };

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<Layout />}>
//         <Route path="" element={<Home />} />

//         <Route path="/productlist" element={<ProductList />} />

//         <Route path="profile" element={<Profile />} />
//       </Route>
//       <Route path="/forgotpasswordform" element={<ForgotPasswordForm />} />
//       <Route path="/register" element={<NewRegister />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/password" element={<Password />} />
//       <Route path="productdetails/shoppingcarttopup" element={<ShoppingCartTopUp/>} />
//       <Route path="/shoppingcart" element={<ShoppingCart />} />
//       <Route path="/productdetails" element={<ProductDetails />} />
//       <Route path="ss" element={<HomeSquareSection/>} />

//     </>
//   )
// );

// function App() {
//   return (
//     <>

//       <RouterProvider router={router} />

//     </>
//   );
// }

// export default App;

import React, { Suspense } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout.jsx";
import Home from "./route/Home.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lazy } from "react";
import TempTopUP from "./route/TempTopUP.jsx";
// Lazy loaded components
const ProductList = lazy(() => import("./route/ProductList.jsx"));
const Login = lazy(() => import("./component/Auth/Login/Login.jsx"));
const ShoppingCartTopUp = lazy(() => import("./route/ShoppingCartTopUp.jsx"));
const Password = lazy(() => import("./component/Auth/Password.jsx"));
const GoogleAuth = lazy(() => import("./component/Auth/GoogleAuth.jsx"));
const ProductDetails = lazy(() => import("./route/ProductDetails.jsx"));
const ShoppingCart = lazy(() => import("./route/ShoppingCart.jsx"));
const ForgotPasswordForm = lazy(() =>
  import("./component/Auth/ForgotPassword/ForgotPasswordForm.jsx")
);
const NewRegister = lazy(() =>
  import("./component/Auth/Register/NewRegister.jsx")
);
const Profile = lazy(() => import("./route/Profile.jsx"));
const HomeSquareSection = lazy(() =>
  import("./component/home/HomeSquareSection.jsx")
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900">
      loadingg...
    </div>
  </div>
);

export const GoogleBtn = ({ text }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API}>
      <Suspense fallback={<LoadingFallback />}>
        <GoogleAuth text={text} />
      </Suspense>
    </GoogleOAuthProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route
          path="productlist"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Profile />
            </Suspense>
          }
        />
      </Route>

      {/* Auth routes */}
      <Route
        path="forgotpasswordform"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <ForgotPasswordForm />
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <NewRegister />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="password"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Password />
          </Suspense>
        }
      />

      {/* Shopping routes */}
      <Route
        path="/shoppingcarttopup"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <ShoppingCartTopUp />
          </Suspense>
        }
      />
      <Route
        path="shoppingcart"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <ShoppingCart />
          </Suspense>
        }
      />
      <Route
        path="productdetails"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <ProductDetails />
          </Suspense>
        }
      />
      <Route
        path="ss"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <HomeSquareSection />
          </Suspense>
        }
      />
      <Route path="cart" element={<TempTopUP/>}/>
    
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
