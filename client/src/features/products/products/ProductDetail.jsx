
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

  const [isSticky, setIsSticky] = useState(false);
  const descriptionRef = useRef(null);
  const stickyRef = useRef(null);
  const sentinelRef = useRef(null); // Sentinel element to detect when to stop sticking

 useEffect(() => {
  const handleScroll = () => {
    if (!descriptionRef.current) return;

    const descriptionRect = descriptionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Keep sticky while description is visible, stop when it exits viewport
    setIsSticky(descriptionRect.bottom > windowHeight * 0.3);
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const handleScroll = () => {
  const sentinelRect = sentinelRef.current.getBoundingClientRect();
  const stickyHeight = stickyRef.current.offsetHeight;
  setIsSticky(sentinelRect.top > stickyHeight + 20);
};

  return (
     <div className="min-h-screen bg-primary text-secondary !pt-5" id="top">
        <div className="mx-auto max-w-7xl">
            <ProductDetailCard isSticky={isSticky} imgRef={stickyRef} pId={pId}/>
           
          <div className="my-10 relative" style={{width: '100vw',marginLeft: 'calc(-50vw + 50%)'}} >
                <DottedLine dashLength={23} color="#fff" size="1" />
          </div>

       <div ref={descriptionRef}>
          <ProductDesciption />
        </div>

<div ref={sentinelRef} className="h-1 w-full"></div>

          <div className="space-y-9 my-9">
            <img src="/png/img1.png" alt="" className="h-full w-full rounded-3xl object-cover" />
            <img src="/png/img2.png" alt="" className="h-full w-full rounded-3xl object-cover"/>
          </div>


           <div className="my-10 relative" style={{width: '100vw',marginLeft: 'calc(-50vw + 50%)'}} >
                <DottedLine dashLength={23} color="#fff" size="1" />
          </div>
                {/* review  */}
          <div className="my-4 relative ">
          
            <ReviewSection
              avgRating={product?.avgRating}
              onReviewChange={() => setReviewsUpdated(Date.now())}
            />
          </div>

          {/* Similar newProducts */}
          <div className="grid-cols-auto mt-8 grid gap-4 md:grid-cols-4">
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
