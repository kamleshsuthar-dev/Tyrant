// import axios from "axios";
// import React, { useEffect, useState } from "react";

// import { useNavigate, Link, useLoaderData, useParams } from "react-router-dom";

// import { Card, CardContent } from "@/components/ui/card";
// // import { Star, StarHalf } from "lucide-react"

// import ProductListSkeleton from "@/component/skeleton/ProductListSkeleton";
// import StarRating from "@/features/reuseable-component/StarRating";
// import { GetApi } from "@/features/reuseable-component/GetApi";

// export default function ProductList() {


//   const discount = 20;

//   const { cId } = useParams();
//   const [products, setProducts] = useState([]);


//   const [data, error, loading] = GetApi(
//     `${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`,
//     "get product by category api "
//   );
//   useEffect(() => {
//     if (data && data.data && data.data.products) {
//       setProducts(data.data.products);
//     }
//   }, [data]);
//   console.log("proo", data?.data);

 

//   let navigate = useNavigate();
//   const productDetailFunction = (e, product) => {
//     console.log(product._id);

//     e.preventDefault();
//     navigate(`/productdetails/${product._id}`);
//     // navigate(`/productdetails/${product._id}`, { replace: true })
//   };

//   if (loading) return <ProductListSkeleton />;
//   else
//     return (
//       <div className="bg-white ">
//         <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//           <h2 className="relative text-4xl font-extrabold flex justify-center bg-slate-100 rounded-lg p-2 ">
//             Products{" "}
//           </h2>

//           <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//             {loading ? (
//               <div className="col-span-12 flex justify-center items-center">
//                 Loading Products...
//               </div>
//             ) : error ? (
//               <div className="col-span-12 flex justify-center items-center ">
//                 {" "}
//                 loading Products,
//                 <span className="text-red-500">
//                   {" "}
//                   {error?.response?.data?.message}
//                 </span>
//                 <span className="text-red-500">, {error?.message}</span>
//               </div>
//             ) : products && products.length > 0 ? (
//               products.map((product) => (
//                 <Link
//                   key={product._id}
//                   href={product.href}
//                   onClick={(e) => productDetailFunction(e, product)}
//                   className="group"
//                 >
//                   <Card className="max-w-sm overflow-hidden rounded-3xl border-0 shadow-lg">
//                     <CardContent className="p-4">
//                       <img
//                         // alt={product.imageAlt}
//                         src={product.pImages[0].URL}
//                         className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
//                       />
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {product.pName}
//                       </h3>

//                       <div className="mt-1 flex items-center gap-1">
//                         {/* <div className="flex items-center">{renderStars(product.avgRating
//               )}</div> */}
//                         <StarRating
//                           rating={product.avgRating}
//                           Pcolor="#FFC224"
//                           Scolor="#202020"
//                         />
//                         <span
//                           className={`text-sm text-gray-600 ${
//                             product.reviewCount == 0 ? "hidden" : " "
//                           }`}
//                         >
//                           {" "}
//                           ({product.reviewCount})
//                         </span>
//                       </div>

//                       <div className="mt-2 space-y-1">
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm text-gray-500 line-through">
//                             MRP Rs. {product.pPrice}
//                           </span>
//                           <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">
//                             {product.pOffer}% Off
//                           </span>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <span className="text-xl font-semibold">
//                             Rs.{(product.pPrice * (100 - product.pOffer)) / 100}
//                           </span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </Link>
//               ))
//             ) : (
//               <>
//                 <h1 className="absolute text-2xl w-full  text-center my-32">
//                   {error?.response?.data?.message}
//                 </h1>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     );
// }



import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import {  Link ,useNavigate} from "react-router-dom";
import StarRating from "@/features/reuseable-component/StarRating";
export default  function PorductCard({product}) {

  let navigate = useNavigate();
  const productDetailFunction = (e, product) => {
    console.log(product._id);

    e.preventDefault();
    navigate(`/productdetails/${product._id}`);
    // navigate(`/productdetails/${product._id}`, { replace: true })
  };

  return (
    <>
      <Link
key={product._id}
href={product.href}
onClick={(e) => productDetailFunction(e, product)}
className="group w-fit"
>

<Card className="group relative p-4 my-3 flex max-w-[242px] overflow-visible rounded-3xl border-0 shadow-lg  !text-white">
  <div className="absolute h-[287px] w-[70%]  bg-[#9EFF00] left-[10px] bottom-0 transition-transform rounded-3xl origin-bottom-left group-hover:rotate-[-20deg] z-0"></div>
<div className="absolute h-full w-full bg-[#202020] top-0 left-0 rounded-3xl z-5"></div>
  <CardContent className="relative z-10 flex flex-col w-[210px] p-0 ">
    <div className="relative w-[212px] h-[180px] mb-3 bg-white rounded-2xl group-hover:bg-[#9EFF00] overflow-hidden">

  <div className="absolute w-[1000px] h-[1000px] rounded-lg flex flex-col overflow-clip z-0 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
        {[...Array(20)].map((_, i) => (
          <div
          key={i}
          className="h-[200%] w-[1.5px] bg-[#3d3d3d6c] rotate-[31deg]"
          style={{ marginLeft: `${i * 20}px`, position: 'absolute' }}
          ></div>
        ))}
      </div>
 
      <img
      alt={product.imageAlt}
      src={product.pImages[0].URL}
      className="z-10 absolute aspect-square mb-[12px] group-hover:scale-[85%] transition-transform scale-75 self-center w-[212px] h-[180px] rounded-lg  object-contain  xl:aspect-[7/8] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
    />
    </div>
                    
    <h3 className="text-xl font-bold ">
      {product.pName}
    </h3>

    <div className="mt-1 flex items-center gap-1">
      <StarRating
        rating={product.avgRating}
        Pcolor="#9EFF00"
        Scolor="#fff"
      />
      <span
        className={`text-sm  ${
          product.reviewCount == 0 ? "hidden" : " "
        }`}
      >
        {" "}
        ( {product.reviewCount} )
      </span>
    </div>

    <div className="mt-2 space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-lg font-light text-[#e2e2e2] line-through">
          MRP Rs. {product.pPrice}
        </span>
       
      </div>

      <div className="flex items-center gap-2">
      <div className="rounded-md w-[57px] text-center bg-[#FFB524] inline-block px-1 pt-1 pb-[1px] text-xs text-[#202020]">
          {product.pOffer}% Off
        </div>
        <span className="text-xl font-semibold">
          Rs. {Math.floor((product.pPrice * (100 - product.pOffer)) / 100)}
          <span className="text-sm">.{((product.pPrice * (100 - product.pOffer)) / 100).toFixed(2).split(".")[1]}</span>
        </span>
      </div>
    </div>
  </CardContent>
</Card>
    </Link>
    </>
  )
}


