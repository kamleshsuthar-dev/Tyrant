import { lazy } from "react";

const ProductDesciption = lazy(() => import("@/features/products/products/ProductDescription"));
const ProductList = lazy(() => import("@/features/products/products/ProductList"));
const ProductDetail = lazy(() => import("@/features/products/products/ProductDetail"));
const ProductDetailPopUp = lazy(() => import("@/features/products/products/ProductDetailPopUp"));

export{
    ProductDesciption,
    ProductDetailPopUp,
    ProductDetail,
    ProductList
}