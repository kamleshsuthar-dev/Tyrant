import axios from "axios";
import React, { useEffect, useState,useRef } from "react";

import {  useParams,useLocation } from "react-router-dom";


// import { Star, StarHalf } from "lucide-react"

import ProductListSkeleton from "../component/skeleton/ProductListSkeleton";

import { GetApi } from "@/features/reuseable-component/ApiCaller";
import ProductCard from "@/features/reuseable-component/PorductCard"
import ShoppingCartTopUp from "./shoppingCart/ShoppingCartTopUp";


import ProductDetailsPopUp from "./product-Detail/ProductDetailTopUp";
export default function ProductList() {
    const location = useLocation()
    const {cName , cDescription} = location?.state || {cName: "Ram" , cDescription: "Shyam"}
  
    

  const discount = 20;
  const { cId } = useParams();
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const popUp = useRef(null)
  const productPopUp = useRef(null)

  const [data, error, loading] = GetApi(`${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`, "get product by category api" );
  useEffect(() => {
    if (data && data.data && data.data.products) {
      setProducts(data.data.products);
    }
  }, [data]);

function handleShopping (e, product){
  e.preventDefault()
  e.stopPropagation();
  setCartProducts(product)
  popUp.current.click()
  console.log("hello ");
}

function handleProductPopUp (e, product){
  e.preventDefault()
  e.stopPropagation();
  setCurrentProduct(product)
  productPopUp.current.click()
  console.log("hello ");
  
}
  
  if (loading) return <ProductListSkeleton />;
  else
    return (
      <div className="bg-white ">
        <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="relative text-4xl font-extrabold flex justify-center items-center   bg-slate-100 rounded-lg p-2 ">
          {cName} {" :"}&nbsp; <span className="text-2xl "> {cDescription}</span>
          </h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center ">
            {loading ? (
              <div className="col-span-12 flex justify-center items-center">
                Loading Products...
              </div>
            ) : error ? (
              <div className="col-span-12 flex justify-center items-center ">
                {" "}
                loading Products,
                <span className="text-red-500">
                  {" "}
                  {error?.response?.data?.message}
                </span>
                <span className="text-red-500">, {error?.message}</span>
              </div>
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <>
                     <ProductCard key={product._id}  product={product} handleShopping={(e)=>handleShopping(e, product)} handleProductPopUp={(e)=>{handleProductPopUp(e, product)}}/>
                </>
                            
              
              ))
            ) : (
              <>
                <h1 className="absolute text-2xl w-full  text-center my-32">
                  {error?.response?.data?.message}
                </h1>
              </>
            )}
          </div>
        </div>

        <ShoppingCartTopUp ref={popUp} product={cartProducts} />
        <ProductDetailsPopUp ref={productPopUp} product={currentProduct} />
      
      </div>
    );
}




