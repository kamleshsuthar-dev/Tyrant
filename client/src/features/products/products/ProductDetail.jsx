
"use client";
import ProductDetailCard from "../components/ProductDetailCard";

import React from 'react'
import ProductCard from "../components/ProductCard";
import {ReviewSection} from "@/features/review";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

function ProductDetail() {
  
  const { pId } = useParams();
    const location = useLocation();
  const {product,categoryP} = location.state || {}
  
  return (
     <div className="min-h-screen bg-secondary p-4" id="top">
        <div className="mx-auto max-w-7xl">
             <Card   className="overflow-hidden rounded-3xl bg-secondary">
            <ProductDetailCard pId={pId}/>

             </Card>



                {/* review  */}
          <div className="mt-4">
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
