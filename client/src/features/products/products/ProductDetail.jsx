
"use client";
import ProductDetailCard from "../components/ProductDetailCard";

import React, { useEffect, useRef, useState } from 'react'
import ProductCard from "../components/ProductCard";
import {ReviewSection} from "@/features/review";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { DottedLine } from "@/components/components";
import ProductDesciption from "./ProductDescription";

function ProductDetail() {
  
  const { pId } = useParams();
    const location = useLocation();
  const {product,categoryP} = location.state || {}
  const [reviewsUpdated,setReviewsUpdated]=useState()




  return (
     <div className="min-h-screen bg-primary text-secondary !pt-5 px-3"  id="top">
        <div className="mx-auto max-w-7xl">
          <div className="daddy relative">
           
            <ProductDetailCard  pId={pId}/>
           
            <div className="my-10 relative" style={{width: '100vw',marginLeft: 'calc(-50vw + 50%)'}} >
                  <DottedLine dashLength={23} color="#fff" size="1" />
            </div>
            <ProductDesciption />
          </div>
       


          <div className="space-y-9 my-9">
            <img src="/png/img1.png" alt="" className="h-full w-full rounded-3xl object-cover" />
            <img src="/png/img2.png" alt="" className="h-full w-full rounded-3xl object-cover"/>
          </div>


           <div className="my-10 relative" style={{width: '100vw',marginLeft: 'calc(-50vw + 50%)'}} >
                <DottedLine dashLength={23} color="#fff" size="1" />
          </div>
                {/* review  */}
          <div className="my-4  ">
          
            <ReviewSection
              avgRating={product?.avgRating}
              onReviewChange={() => setReviewsUpdated(Date.now())}
            />
          </div>





          {/* Similar newProducts */}
          <div className="grid-cols-auto mt-8 grid gap-4 md:grid-cols-4 justify-center">
            {categoryP && categoryP.length > 0 ? (
              <>
                {categoryP.map((p) => (
                  <ProductCard product={p} categoryP={categoryP} />
                ))}
              </>
            ) : (
              <>
              No Similar Products...
              </>
            )}
          </div>
        </div>
    </div>
  )
}

export default ProductDetail
