import { Route } from "react-router-dom";

import { WishList } from "@/features/wishlist";
import { Checkout, Order } from "@/features/order";
import { AddAddress, Address, EditAddress, Profile, UserProfile } from "@/features/profile";

const UserRoutes = (
  <>
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/editprofile" element={<UserProfile />} />
    <Route path="/profile/address" element={<Address />} />
    <Route path="/profile/address/add" element={<AddAddress />} />
    <Route path="/profile/address/Edit/:AddressId" element={<EditAddress />} />
    <Route path="/profile/order" element={<Order />} />

    <Route path="checkout" element={<Checkout />} />
    <Route path="wishlist" element={<WishList />} />
  </>
);

export default UserRoutes;
