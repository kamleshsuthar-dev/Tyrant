import Home from "@/pages/header/Home";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const ProductDesciption = lazy(() => import("@/pages/product-Detail/ProductDescription"));
const ShoppingCartTopUp = lazy(() => import("@/pages/shoppingCart/ShoppingCartTopUp"));
const ShoppingCart = lazy(() => import("@/pages/shoppingCart/ShoppingCart"));
const ReviewSection = lazy(() => import("@/pages/product-Detail/ReviewSection"));
const ReviewFilter = lazy(() => import("@/pages/product-Detail/ReviewFilter"));
const ProductList = lazy(() => import("@/pages/product-Detail/ProductList"));
const ProductDetails = lazy(() => import("@/pages/product-Detail/ProductDetails"));
const OtpForResetPass = lazy(() => import("@/components/Auth/ForgotPassword/OtpForResetPass"));
const ForgotPasswordForm = lazy(() => import("@/components/Auth/ForgotPassword/ForgotPasswordForm"));
const SetPassword = lazy(() => import("@/components/Auth/SetPassword"));
const UpdatePassword = lazy(() => import("@/components/Auth/ForgotPassword/UpdatePassword"));

export const PublicRoutes = (
  <>
    <Route path="" element={<Home />} />

    <Route
      path="productlist/:cId"
      element={
        <Suspense>
          <ProductList />
        </Suspense>
      }/>
    <Route
      path="productdetails/:pId"
      element={
        <Suspense>
          <ProductDetails />
        </Suspense>
      }/>

    <Route
      path="review"
      element={
        <Suspense>
          <ReviewSection />
        </Suspense>
      }/>

    <Route
      path="description"
      element={
        <Suspense>
          <ProductDesciption />
        </Suspense>
      }/>

    <Route
      path="filter"
      element={
        <Suspense>
          <ReviewFilter />
        </Suspense>
      }/>

    <Route
      path="shoppingcart"
      element={
        <Suspense>
          <ShoppingCart />
        </Suspense>
      }/>

    <Route
      path="/shoppingcarttopup"
      element={
        <Suspense>
          <ShoppingCartTopUp />
        </Suspense>
      }/>

    <Route
      path="otpforresetpass"
      element={
        <Suspense>
          <OtpForResetPass />
        </Suspense>
      }/>

    <Route
      path="forgotpasswordform"
      element={
        <Suspense>
          <ForgotPasswordForm />
        </Suspense>
      }/>

    <Route
      path="password"
      element={
        <Suspense>
          <SetPassword />
        </Suspense>
      }/>

    <Route
      path="updatepassword"
      element={
        <Suspense>
          <UpdatePassword />
        </Suspense>
      }/>

  </>
);

export default PublicRoutes;

