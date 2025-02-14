import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { Card, CardContent } from "@/components/ui/card"
import { Star, StarHalf } from "lucide-react"
import ProductListSkeleton from '../component/skeleton/ProductListSkeleton';
    // const products = [
    //   {
    //     id: 1,
    //     name: 'Earthen Bottle',
    //     href: '#',
    //     price: '$48',
    //     imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
    //     imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    //   },
    //   {
    //     id: 2,
    //     name: 'Nomad Tumbler',
    //     href: '#',
    //     price: '$35',
    //     imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
    //     imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."

    //   },
    //   {
    //     id: 3,
    //     name: 'Focus Paper Refill',
    //     href: '#',
    //     price: '$89',
    //     imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
    //     imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."

    //   },
    //   {
    //     id: 4,
    //     name: 'Machined Mechanical Pencil',
    //     href: '#',
    //     price: '$35',
    //     imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
    //     imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."

    //   },
    //   {
    //           "id" : 123,
    //           "imageSrc" : "https://m.media-amazon.com/images/I/61CkG3E9EjL._SX569_.jpg",
    //           "name" : "condom",
    //           "detail" :"use in during sex",
    //           "price" : "200 rs"    ,
    //           "detail" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    //         },
    //   // More products...
    // ]



export default function ProductList() {
  const {prd,name} = useProduct()
  const discount = 20
  const cId="67ab9caa61b7763a0938c690"
  const [products,setProducts] = useState([])
         useEffect(()=>{
                const fetchData = async()=>{
                    // const res= await axios.get(`${import.meta.env.VITE_PRODUCT}/all-product`)
                    const res= await axios.post(`${import.meta.env.VITE_PRODUCT_BY_CATEGORY}`,{cId:cId})
                                console.log(res);
                                
                              console.log(res.data.products);
                              
                       setProducts(res.data.products)
                }
                fetchData()
         },[]) 

            let navigate = useNavigate()

  const productDetailFunction = (e,product)=>{
    e.preventDefault();
        // navigate('/productDetails',{state:{product}})
      
        navigate('/productDetails',{state:{product}})

}
// let rating = 
let originalPrice = 5000;
const renderStars = (rating) => {
  const stars = []
  const fullStars = Math.floor(rating)
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
            <a key={product.id} href={product.href} onClick={(e)=>productDetailFunction(e,product)} className="group">
              <Card className="max-w-sm overflow-hidden rounded-3xl border-0 shadow-lg">
      <CardContent className="p-4">
              <img
                // alt={product.imageAlt}
                src={product.pImages[0].URL
                }
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
        <h3 className="text-base font-medium text-gray-900">{product.pName}</h3>

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
         </a>
          ))
          }
    
        
        </div>
      </div>
    </div>
  )


};









