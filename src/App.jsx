import React, { Suspense, useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";
import Layout from "../Layout.jsx";
import Home from "./route/Home.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lazy, useMemo } from "react";
import AboutUs from "./route/AboutUs.jsx";
import ReviewSection from "./route/product-Detail/ReviewSection.jsx";
import ReviewFilter from "./route/product-Detail/ReviewFilter.jsx";
import ProductDesciption from "./route/product-Detail/ProductDescription.jsx";
import ProductListSkeleton from "./component/skeleton/ProductListSkeleton.jsx";
import DeleteBtn from "./component/home/DeleteBtn.jsx";
import ShoppingCartSkeleton from "./component/skeleton/ShoppingCartSkeleton.jsx";
import { OtpVerification } from "./component/Auth/Register/OtpVerification.jsx";
import { useGoogleAuthContext } from "./context/GoogleAuth.jsx";
import { ProductAdminPanel } from "./component/AdminPanel/product/ProductAdminPanel.jsx";
import ProductDeleteAdminPanel from "./component/AdminPanel/product/ProductDeleteAdminPanel.jsx";
import AuthRedirect from "./route/protectedRoute/AuthRedirect.jsx";
// Lazy loaded components
const ProductList = lazy(() => import("./route/ProductList.jsx"));
const Login = lazy(() => import("./component/Auth/Login/Login.jsx"));
const ShoppingCartTopUp = lazy(() =>
  import("./route/shoppingCart/ShoppingCartTopUp.jsx")
);
const Password = lazy(() => import("./component/Auth/Password.jsx"));
const GoogleAuth = lazy(() => import("./component/Auth/GoogleAuth.jsx"));
const ProductDetails = lazy(() =>
  import("./route/product-Detail/ProductDetails.jsx")
);
const ProductDetailsPopUp = lazy(() =>
  import("./route/product-Detail/ProductDetailsPopUp.jsx")
);
// const ShoppingCart = lazy(() =>
//   import("./route/shoppingCart/ShoppingCart.jsx")
// );
import ShoppingCart from "./route/shoppingCart/ShoppingCart.jsx";
const WishList = lazy(() => import("./route/wishlist/WishList.jsx"));
const CheckOut = lazy(() => import("./route/CheckOut.jsx"));
const ForgotPasswordForm = lazy(() =>
  import("./component/Auth/ForgotPassword/ForgotPasswordForm.jsx")
);
const NewRegister = lazy(() =>
  import("./component/Auth/Register/NewRegister.jsx")
);
const Profile = lazy(() => import("./route/profile/ProfileHome.jsx"));
const EditProfile = lazy(() => import("./route/profile/user-profile/Profile.jsx"));
const Address = lazy(() => import("./route/profile/address/Address.jsx"));
const AddAddress = lazy(() => import("./route/profile/address/AddAddress.jsx"));
const Order = lazy(() => import("./route/profile/order/Order.jsx"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900">
      loadingg...
    </div>
  </div>
);

import axios from "axios";

import ProductDetailSkeleton from "./component/skeleton/ProductDetailSkeleton.jsx";
import UserProtected from "./route/protectedRoute/UserProtected.jsx";
import AdminProtected from "./route/protectedRoute/AdminProtected.jsx";
import AddCategory from "./component/AdminPanel/category/AddCategory.jsx";
import DeleteCategory from "./component/AdminPanel/category/DeleteCategory.jsx";
import GetCategory from "./component/AdminPanel/category/GetCategory.jsx";
import GetProductByCategory from "./component/AdminPanel/product/GetProductByCategory.jsx";
import EditCategory from "./component/AdminPanel/category/EditCategory.jsx";
import { EditProduct } from "./component/AdminPanel/product/EditProduct.jsx";
import { OtpForResetPass } from "./component/Auth/ForgotPassword/OtpForResetPass.jsx";
import UpdatePassword from "./component/Auth/ForgotPassword/UpdatePassword.jsx";
import EditAddress from "./route/profile/address/EditAddress.jsx";
// import GetCategory from "./component/AdminPanel/category/GetCategory.jsx";

axios.defaults.withCredentials = true;

export const GoogleBtn = ({ text }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API}>
      <Suspense fallback={<LoadingFallback />}>
        <GoogleAuth text={text} />
      </Suspense>
    </GoogleOAuthProvider>
  );
};

function App() {
  const { isLoginUser, userDetails } = useGoogleAuthContext();
  // const [userEmail, setUserEmail] = useState(null); // Set initial state to null

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="deletebtn" element={<DeleteBtn />} />
          <Route path="review" element={<ReviewSection />} />
          <Route path="description" element={<ProductDesciption />} />
          <Route path="skeleton" element={<ShoppingCartSkeleton />} />
          <Route path="filter" element={<ReviewFilter />} />
          <Route path="otp" element={<OtpVerification />} />
          <Route path="otpforresetpass" element={<OtpForResetPass />} />

          <Route element={<AdminProtected />}>
            <Route path="/admin/product/add" element={<ProductAdminPanel />} />
            <Route
              path="/admin/product/delete"
              element={<ProductDeleteAdminPanel />}
            />
            <Route path="/admin/category/add" element={<AddCategory />} />
            <Route path="/admin/category/delete" element={<DeleteCategory />} />
            <Route path="/admin/category/edit" element={<EditCategory />} />
            <Route
              path="/admin/category/product/edit/:pId"
              element={<EditProduct />}
            />
            <Route path="/admin/category/all" element={<GetCategory />} />
            <Route
              path="/admin/category/allproduct/:cId"
              element={<GetProductByCategory />}
            />
          </Route>

          <Route element={<UserProtected />}>
            {/* <Route path="/admin/product/add" element={<ProductAdminPanel />} />
            <Route path="/admin/product/delete"element={<ProductDeleteAdminPanel />}/> */}

            <Route
              path="/profile"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/profile/editprofile"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <EditProfile />
                </Suspense>
              }
            />
            <Route
              path="/profile/address"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Address />
                </Suspense>
              }
            >
            
            </Route>
            <Route
                path="/profile/address/add"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AddAddress />
                  </Suspense>
                }
              />
            <Route
                path="/profile/address/Edit/:AddressId"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <EditAddress/>
                  </Suspense>
                }
              />
            <Route
              path="/profile/order"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Order />
                </Suspense>
              }
            />

            <Route
              path="checkout"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <CheckOut />
                </Suspense>
              }
            />
            <Route
              path="wishlist"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <WishList />
                </Suspense>
              }
            />
          </Route>

          <Route path="shoppingcart" element={<ShoppingCart />} />

          <Route
            path="productlist/:cId"
            element={
              <Suspense fallback={<ProductListSkeleton />}>
                <ProductList />
              </Suspense>
            }
          ></Route>
          <Route
            path="productdetails/:pId"
            element={
              <Suspense fallback={<ProductDetailSkeleton />}>
                <ProductDetails />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <AboutUs />
              </Suspense>
            }
          />

          <Route
            path="productdetailspopup"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ProductDetailsPopUp />
              </Suspense>
            }
          />

          <Route
            path="/shoppingcarttopup"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <ShoppingCartTopUp />
              </Suspense>
            }
          />
        </Route>

        {/* Auth routes */}

        <Route element={<AuthRedirect />}>
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
        </Route>

        <Route
          path="forgotpasswordform"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ForgotPasswordForm />
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
        <Route
          path="updatepassword"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <UpdatePassword />
            </Suspense>
          }
        />

        {/* Shopping routes */}
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
