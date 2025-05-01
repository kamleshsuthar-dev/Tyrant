import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, Link, useLoaderData, useParams } from "react-router-dom";


// import { Star, StarHalf } from "lucide-react"

import ProductListSkeleton from "../component/skeleton/ProductListSkeleton";

import { GetApi } from "@/features/reuseable-component/GetApi";
import ProductCard from "@/features/reuseable-component/PorductCard"
export default function ProductList() {
  // const {prd,name} = useProduct()

  const discount = 20;
  // const cId="67ab9caa61b7763a0938c690"
  const { cId } = useParams();
  const [products, setProducts] = useState([]);
  // const [loading , setLoading] = useState(false)

  const [data, error, loading] = GetApi(
    `${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`,
    "get product by category api "
  );
  useEffect(() => {
    if (data && data.data && data.data.products) {
      setProducts(data.data.products);
    }
  }, [data]);
  console.log("proo", data?.data);

  // useEffect(()=>{
  //   ;(async()=>{
  //     try {
  //       setLoading(true)
  //       // let res = await axios.get(`${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`)
  //       let res =await fetch(`${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`)

  //       // console.log("resss",res);
  //       let data =await res.json()

  //       console.log("dataaa",data);
  //       // console.log("product api ",res);
  //         setMessage(data.message)
  //         setProducts(data.products)
  //         setLoading(false)
  //     } catch (error) {
  //       console.log("poductList api error ", error);
  //       setLoading(false)
  //     }
  //   })()
  // },[])

  
  if (loading) return <ProductListSkeleton />;
  else
    return (
      <div className="bg-white ">
        <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="relative text-4xl font-extrabold flex justify-center bg-slate-100 rounded-lg p-2 ">
            Products{" "}
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
                <ProductCard product={product}/>
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
      </div>
    );
}
