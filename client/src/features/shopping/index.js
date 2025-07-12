import { lazy } from "react";

const ShoppingCartPopUp = lazy(() => import("@/features/shopping/shopping/ShoppingCartPopUp"));
const ShoppingCart = lazy(() => import("@/features/shopping/shopping/ShoppingCart"));

export{
    ShoppingCart,
    ShoppingCartPopUp
}