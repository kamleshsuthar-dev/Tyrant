import React, { useContext } from 'react'

import ProductDetails from './ProductDetails'     
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import ProductContext from '../context/ProductContext';

    // const products = {
    //   "tittle" : "Russian" ,
    //   "productList" : [
    //     {
    //       "id" : "123",
    //       "image" : "https://m.media-amazon.com/images/I/61CkG3E9EjL._SX569_.jpg",
    //       "name" : "condom",
    //       "detail" :"use in during sex",
    //       "price" : "200 rs"    ,
    //       "discription" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    //     },
    //     {
    //        "id" : "1234",
    //       "image" : "https://m.media-amazon.com/images/I/61CkG3E9EjL._SX569_.jpg",
    //       "name" : "girl",
    //       "detail" :"use for  sex",
    //       "price" : "150 rs"    ,
    //       "discription" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    //     },
    //     {
    //       "id" : "1235",
    //       "image" : "https://m.media-amazon.com/images/I/61CkG3E9EjL._SX569_.jpg",
    //       "name" : "dick",
    //       "detail" :"use to fuck a girl",
    //       "price" : "20000 rs"    ,
    //       "discription" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    //     }
    //     ]
    // }
  

    const products = [
      {
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        price: '$48',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
      },
      {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      },
      {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      },
      {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
      {
              "id" : 123,
              "imageSrc" : "https://m.media-amazon.com/images/I/61CkG3E9EjL._SX569_.jpg",
              "name" : "condom",
              "detail" :"use in during sex",
              "price" : "200 rs"    ,
              "discription" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
            },
      // More products...
    ]



export default function ProductList() {
            // const {name,products} = useContext(ProductContext)
            

            let navigate = useNavigate()

  const productDetailFunction = (e)=>{
    e.preventDefault();
        navigate('/productDetails')
   
}



  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} onClick={productDetailFunction} className="group">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

