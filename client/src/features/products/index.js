import { lazy } from "react";

const ProductDesciption = lazy(() => import("@/features/products/products/ProductDescription"));
const ProductList = lazy(() => import("@/features/products/products/ProductList"));
const ProductDetail = lazy(() => import("@/features/products/products/ProductDetail"));
const ProductDetailPopUp = lazy(() => import("@/features/products/products/ProductDetailPopUp"));

// import ProductCard from "@/features/products/components/ProductCard";
// import ProductDetailCard from "@/features/products/components/ProductDetailCard";
const ProductCard = lazy(() => import("@/features/products/components/ProductCard"));
const ProductDetailCard = lazy(() => import("@/features/products/components/ProductDetailCard"));



export{
    ProductDesciption,
    ProductDetailPopUp,
    ProductDetail,
    ProductList,

    // components 

    ProductCard ,
    ProductDetailCard
}