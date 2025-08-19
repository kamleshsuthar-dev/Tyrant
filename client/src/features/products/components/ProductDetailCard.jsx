"use client";
import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";
import { useEffect, useState } from "react";
import ProductDetailData from "./productdetailcard/ProductDetailData";
import ProductDetailImage from "./productdetailcard/ProductDetailImage";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "@/store/action/productAction";
import { clearSingleProduct } from "@/store/reducer/productSlice";
function ProductDetailCard({pId }) {
  
  const dispatch = useDispatch()
  const {singleProduct:product , fetchSPStatus :{loading ,error} } = useSelector(state=>state?.product)
  useEffect(()=>{
    window.scrollTo(0, 0);
    dispatch(clearSingleProduct())
    dispatch(fetchSingleProduct(pId))
  },[pId])


  if (loading || !product) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading product: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const productImages = product.pImages?.map((img) => img.URL) || [];
  
  return (
    <div key={pId} className="text-secondary" id="top">
       
          <div className="mx-auto rounded-3xl grid gap-8  md:grid-cols-2 items-start">

    
            {/* <ProductDetailImage productImages={productImages} /> */}
            <div className="self-start">
              <div className="sticky top-0">
                <ProductDetailImage productImages={productImages} />
              </div>
            </div>  

            <ProductDetailData 
              product={product} 
             
            />
      </div>
    </div>
  );
}

export default ProductDetailCard;

