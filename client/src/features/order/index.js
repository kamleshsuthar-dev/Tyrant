import { lazy } from "react";

const Order = lazy(() => import("@/features/order/order/Order"));
const Checkout = lazy(() => import("@/features/order/order/Checkout"));
const COD = lazy(() => import("@/features/order/order/COD"));
const RayzerPay = lazy(() => import("@/features/order/order/RayzerPay"));

export{
    Checkout,
    COD,
    Order,
    RayzerPay
}