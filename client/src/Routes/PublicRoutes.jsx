import Home from "@/pages/Home";

import { Route } from "react-router-dom";


import {ForgotPasswordForm, OtpForResetPass, OtpVerification, SetPassword, UpdatePassword,} from "@/features/auth";
import {ProductDesciption, ProductDetail, ProductList,} from "@/features/products";
import {ReviewFilter, ReviewSection } from "@/features/review";
import {ShoppingCart, ShoppingCartPopUp } from "@/features/shopping";

import Layout from "./../../Layout";

export const PublicRoutes = (
  <>
   <Route path="/" element={<Layout />}>
    <Route path="" element={<Home />} />
   

    <Route path="productlist/:cId" element={<ProductList />} />
    <Route path="productdetails/:pId" element={<ProductDetail />} />

    <Route path="review" element={<ReviewSection />} />

    <Route path="product-description" element={<ProductDesciption />} />

    <Route path="filter" element={<ReviewFilter />} />

    <Route path="shoppingcart" element={<ShoppingCart />} />

    <Route path="/shoppingcarttopup" element={<ShoppingCartPopUp />} />

   </Route>
    <Route path="otp-verification" element={<OtpVerification />} />

    <Route path="otpforresetpass" element={<OtpForResetPass />} />

    <Route path="forgotpasswordform" element={<ForgotPasswordForm />} />

    <Route path="password" element={<SetPassword />} />

    <Route path="updatepassword" element={<UpdatePassword />} />
  </>
);

export default PublicRoutes;
