import { lazy } from "react";

const Address = lazy(() => import("@/features/profile/profile/address/Address"));
const AddAddress = lazy(() => import("@/features/profile/profile/address/AddAddress"));
const EditAddress = lazy(() => import("@/features/profile/profile/address/EditAddress"));
const UserProfile = lazy(() => import("@/features/profile/profile/user-profile/UserProfile"));
const Profile = lazy(() => import("@/features/profile/profile/Profile"));



export{
    Profile,

    AddAddress,
    EditAddress,
    Address,

    UserProfile
}