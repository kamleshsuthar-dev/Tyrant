import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
// import ShoppingCart from "@/route/shoppingCart/ShoppingCart";
// import ShoppingCartTopUp from "./../route/shoppingCart/ShoppingCartTopUp";

const Orders = lazy(() => import("@/route/profile/order/Order"));
const CheckoutPage = lazy(() => import("@/route/profile/order/CheckOut"));
const Address = lazy(() => import("@/route/profile/address/Address"));
const AddAddress = lazy(() => import("@/route/profile/address/AddAddress"));
const EditProfile = lazy(() => import("@/route/profile/user-profile/Profile"));
const EditAddress = lazy(() => import("@/route/profile/address/EditAddress"));
const WishList = lazy(() => import("@/route/wishlist/WishList"));
const Profile = lazy(() => import("@/route/profile/ProfileHome"));
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
