import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { useNavigate ,Link} from 'react-router-dom';

import { Card, CardContent } from "@/components/ui/card"
import { Star, StarHalf } from "lucide-react"
import ProductListSkeleton from '../component/skeleton/ProductListSkeleton';




export default function ProductList() {
  // const {prd,name} = useProduct()
  const discount = 20
  const cId="67ab9caa61b7763a0938c690"
  const [products,setProducts] = useState([])

    

        useEffect(()=>{
          ;(async()=>{
            try {
              let res = await axios.post(`${import.meta.env.VITE_PRODUCT_BY_CATEGORY}`,{cId:cId})
              // console.log(res.data.products);
                setProducts(res.data.products)
              
            } catch (error) {
              console.log("poductList api error ", error);
              
            }
          })()
        },[])

            let navigate = useNavigate()

  const productDetailFunction = (e,product)=>{
    e.preventDefault();
        navigate('/productdetails',{state:{product}})
             
}

  // const productDetailFunction = (e, product) => {
  //   e.preventDefault();
  //   setSelectedProduct(product);
  //   // Programmatically click the drawer trigger
  //   if (drawerTriggerRef.current) {
  //     drawerTriggerRef.current.click();
  //   }
  // };

// let originalPrice = 5000;
const renderStars = (rating) => {
  // console.log(rating);
  
  const stars = []
  const fullStars= Math.floor(rating )
  const hasHalfStar = rating % 1 !== 0

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400 w-4 h-4" />)
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className="fill-yellow-400 text-yellow-400 w-4 h-4" />)
  }

  return stars
}

if(products.length === 0) return <ProductListSkeleton/>
else  return (

    <div className="bg-white">

      
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product._id} href={product.href} onClick={(e)=>productDetailFunction(e,product)} className="group" >
              <Card className="max-w-sm overflow-hidden rounded-3xl border-0 shadow-lg">
      <CardContent className="p-4">
              <img
                // alt={product.imageAlt}
                src={product.pImages[0].URL
                }
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
        <h3 className="text-xl font-bold text-gray-900">{product.pName}</h3>

        <div className="mt-1 flex items-center gap-1">
          <div className="flex items-center">{renderStars(product.avgRating
)}</div>
          <span className={`text-sm text-gray-600 ${product.reviewCount==0 ? "hidden":" "}`}> ({product.reviewCount})</span>
        </div>

        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">MRP Rs. {product.pPrice}</span>
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">{product.pOffer}% Off</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">Rs.{product.pPrice*(100- product.pOffer)/100}</span>
          
          </div>
        </div>

        {/* <div className="mt-3 space-y-2">
          <div className="rounded-full bg-red-100 px-3 py-1 text-center text-sm text-red-600">Limited time offer</div>

          <p className="text-sm text-gray-600">Get it by 30 feb</p>
        </div> */}
      </CardContent>
    </Card>
            </Link>
          ))
          }
    
        
        </div>
      </div>
    </div>
  )


};









