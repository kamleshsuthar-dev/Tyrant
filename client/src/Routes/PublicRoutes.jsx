import Home from "@/route/header/Home";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const ProductDesciption = lazy(() => import("@/route/product-detail/ProductDescription"));
const ShoppingCartTopUp = lazy(() => import("@/route/shoppingCart/ShoppingCartTopUp"));
const ShoppingCart = lazy(() => import("@/route/shoppingCart/ShoppingCart"));
const ReviewSection = lazy(() => import("@/route/product-detail/ReviewSection"));
const ReviewFilter = lazy(() => import("@/route/product-detail/ReviewFilter"));
const ProductList = lazy(() => import("@/route/product-detail/ProductList"));
const ProductDetails = lazy(() => import("@/route/product-detail/ProductDetails"));
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
