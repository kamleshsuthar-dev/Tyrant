"use client";

import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";
import { useShoppingPopUp } from "@/context/ShoppingPopUpContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailData from "./productdetailcard/ProductDetailData";
import ProductDetailImage from "./productdetailcard/ProductDetailImage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "@/store/action/productAction";
import { clearSingleProduct } from "@/store/reducer/productSlice";

function ProductDetailCard({pId}) {
  // const [product, setProduct] = useState(null);
  // const [wishlist, setWishlist] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const {singleProduct:product , fetchSPStatus :{loading ,error} } = useSelector(state=>state?.product)
  // const { pId } = useParams();
  
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
    <div key={pId} className="bg-secondary" id="top">
      <div className="mx-auto">
        <div className="overflow-hidden rounded-3xl bg-secondary">
          <div className="grid gap-8 p-4 md:grid-cols-2 md:p-8">
            <ProductDetailImage productImages={productImages} />
            <ProductDetailData 
              product={product} 
             
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCard;

