import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
// import ShoppingCart from "@/route/shoppingCart/ShoppingCart";
// import ShoppingCartTopUp from "./../route/shoppingCart/ShoppingCartTopUp";

const Orders = lazy(() => import("@/pages/profile/order/Order"));
const CheckoutPage = lazy(() => import("@/pages/profile/order/CheckOut"));
const Address = lazy(() => import("@/pages/profile/address/Address"));
const AddAddress = lazy(() => import("@/pages/profile/address/AddAddress"));
const EditProfile = lazy(() => import("@/pages/profile/user-profile/Profile"));
const EditAddress = lazy(() => import("@/pages/profile/address/EditAddress"));
const WishList = lazy(() => import("@/pages/wishlist/WishList"));
const Profile = lazy(() => import("@/pages/profile/ProfileHome"));

const UserRoutes = (
  <>
    <Route path="/profile"
           element={ <Suspense><Profile /></Suspense>} />
    <Route path="/profile/editprofile" 
            element={
                <Suspense>
                  <EditProfile />
                  </Suspense>
              }/>
    <Route path="/profile/address" 
            element={
                <Suspense>
                  <Address />
                  </Suspense>
              }/>
    <Route path="/profile/address/add" 
            element={
                <Suspense>
                  <AddAddress />
                  </Suspense>
              }/>
    <Route path="/profile/address/Edit/:AddressId" 
            element={
                <Suspense>
                  <EditAddress />
                  </Suspense>
              }/>
    <Route path="/profile/order" 
            element={
                <Suspense>
                  <Orders />
                  </Suspense>
              }/>

    <Route path="checkout" 
            element={
                <Suspense>
                  <CheckoutPage />
                  </Suspense>
              }/>
    <Route path="wishlist" 
            element={
                <Suspense>
                  <WishList />
                  </Suspense>
              }/>


    {/* <Route path="shoppingcart" element={<ShoppingCart />} /> */}
    {/* <Route path="/ShoppingCartTopUp" element={<ShoppingCartTopUp />} /> */}
  </>
);

export default UserRoutes;
