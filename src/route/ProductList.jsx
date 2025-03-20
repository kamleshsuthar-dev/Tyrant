import axios from 'axios';
import React, { useEffect, useState, } from 'react'

import { useNavigate ,Link, useLoaderData,useParams} from 'react-router-dom';

import { Card, CardContent } from "@/components/ui/card"
import { Star, StarHalf } from "lucide-react"

import ProductListSkeleton from '../component/skeleton/ProductListSkeleton';



export default function ProductList() {
  // const {prd,name} = useProduct()
  
  const discount = 20
  // const cId="67ab9caa61b7763a0938c690"
  const {cId} = useParams();
  const [products,setProducts] = useState([])
  const [loading , setLoading] = useState(false)
  const [message , setMessage] = useState(false)
    

        useEffect(()=>{
          ;(async()=>{
            try {
              setLoading(true)
              // let res = await axios.get(`${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`)
              let res =await fetch(`${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`)
              
              // console.log("resss",res);
              let data =await res.json()
              
              console.log("dataaa",data);
              // console.log("product api ",res);
                setMessage(data.message)
                setProducts(data.products)
                setLoading(false)
            } catch (error) {
              console.log("poductList api error ", error);
              setLoading(false)
            }
          })()
        },[])

            let navigate = useNavigate()

  const productDetailFunction = (e,product)=>{
    console.log(product._id);
    
    e.preventDefault();
        navigate(`/productdetails/${product._id}`, { replace: true })
             
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


if(loading) return <ProductListSkeleton/>

else  return (

    <div className="bg-white ">
      <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="relative text-4xl font-extrabold flex justify-center bg-slate-100 rounded-lg p-2 ">Products </h2>


        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          { products && products.length >1 ?  (
          products.map((product) => (
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
          ))):(
            <>
            <h1 className='absolute text-2xl w-full  text-center my-32'>{message}</h1>
            </>
          )
          }
    
        
        </div>
      </div>
    </div>
  )


};









