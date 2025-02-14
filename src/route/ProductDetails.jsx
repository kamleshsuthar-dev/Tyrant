// import React, { useState } from "react";
// import { Heart, Share2, Minus, Plus, LogIn } from "lucide-react";

// import { useLocation, useNavigate,NavLink } from "react-router-dom";
// import { useCartContext } from "../context/CartContext";

// const ProductPage = () => {
//   const location = useLocation();
//   const product = location.state?.product;
//   // console.log(product);
//   const {addToCart} = useCartContext()

//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState("S");
//   const [selectedColor, setSelectedColor] = useState("cyan");

//   const sizes = ["XS", "S", "M", "L", "XL"];
//   const colors = ["cyan", "lime", "yellow", "magenta"];

//   const incrementQuantity = () => setQuantity((prev) => prev + 1);
//   const decrementQuantity = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   const navigate = useNavigate()
//   const addCart = ()=>{
//         navigate('/shoppingcart',{state :{product}})
//         addToCart(quantity,selectedColor,selectedSize,product)

//   }

//   return (
//     <div className="bg-pink-400 mx-auto p-4">
//       <div className=" flex flex-col md:flex-row bg-white rounded-lg p-4">
//         <div className=" flex w-[40wh] bg-pink-400 rounded-lg justify-center p-2">
//           <div className="Img flex flex-col gap-2 mr-2">
//             <img
//               src="https://m.media-amazon.com/images/I/61CkG3E9EjL._SX569_.jpg"
//               alt=""
//               className="h-[67px] min-w-[67px] object-cover rounded-2xl"
//             />
//             <img
//               src="https://m.media-amazon.com/images/I/61CkG3E9EjL._SX569_.jpg"
//               alt=""
//               className="h-[67px] min-w-[67px] object-cover rounded-2xl"
//             />
//             <img
//               src="https://m.media-amazon.com/images/I/61CkG3E9EjL._SX569_.jpg"
//               alt=""
//               className="h-[67px] min-w-[67px] object-cover rounded-2xl"
//             />
//             <img
//               src="https://m.media-amazon.com/images/I/61CkG3E9EjL._SX569_.jpg"
//               alt=""
//               className="h-[67px] min-w-[67px] object-cover rounded-2xl"
//             />
//             <img
//               src="https://m.media-amazon.com/images/I/61CkG3E9EjL._SX569_.jpg"
//               alt=""
//               className="h-[67px] min-w-[67px] object-cover rounded-2xl"
//             />
//           </div>
//           <div className="">
//             <div className="p-0">
//               <img
//                 // src={product.imageSrc}
//                 src={product.pImages[0].URL}
//                 alt="Yellow printed kurta"
//                 className="object-cover max-w-[450px] minw-[350px] h-[600px] rounded-lg"
//               />
//               <button className="absolute top-4 right-4">
//                 <Heart className="w-6 h-6 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="detail space-y-6 w-[60vw]  flex flex-col justify-between space-x-4">
//           <div className="pl-4">
//             <h1 className="text-2xl font-semibold mb-2">
//               {product.pName}
//               {/* {product.name} */}
//             </h1>
//             <div className="flex items-center gap-2">
//               <span className="text-lg">4.5</span>
//               <div className="flex">
//                 {"★".repeat(3)}
//                 {"☆".repeat(2)}
//               </div>
//               <span className="text-gray-600">- 761</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <span className="text-2xl font-bold">Rs. {product.price}</span>
//             <span className="text-gray-500 line-through">Rs. 2,599.00</span>
//             <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
//               %13 Off
//             </span>
//           </div>

//           <div>
//             <p className="text-gray-600 mb-1">Tax included.</p>
//             <button className="text-blue-600 hover:underline">
//               {/* Shipping calculated at checkout. */}
//               {product.pDetail}
//               {/* {product.detail} */}
//             </button>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-3">Size</h2>
//             <div className="flex gap-2">
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 rounded-md ${
//                     selectedSize === size
//                       ? "bg-teal-600 text-white"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-3">Color</h2>
//             <div className="flex gap-2">
//               {colors.map((color) => (
//                 <button
//                   key={color}
//                   onClick={() => setSelectedColor(color)}
//                   className={`w-8 h-8 rounded-full border-2 ${
//                     selectedColor === color
//                       ? "border-black"
//                       : "border-transparent"
//                   }`}
//                   style={{ backgroundColor: color }}
//                 />
//               ))}
//             </div>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold mb-3">Quantity</h2>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={decrementQuantity}
//                 className="p-2 bg-gray-200 rounded-md"
//               >
//                 <Minus className="w-4 h-4" />
//               </button>
//               <span className="w-12 text-center">{quantity}</span>
//               <button
//                 onClick={incrementQuantity}
//                 className="p-2 bg-gray-200 rounded-md"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <button
//               className="flex-1 bg-white text-black border-2 border-black hover:bg-gray-100"
//               size="lg"
//               onClick={addCart}
//             >
//               Add to Cart
//             </button>
//             <button className="flex-1" size="lg">
//               Buy Now
//             </button>
//           </div>

//           <div className="flex justify-between items-center pt-4">
//             <button variant="link" className="text-gray-600" onClick={() => {}}>
//               See More
//             </button>
//             <Share2 className="w-6 h-6 text-gray-600 cursor-pointer" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

"use client";
import { useEffect } from "react";
import { Heart, Minus, Plus, Share2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious } from "@/components/ui/carousel";
import { toast } from "sonner"
import ShoppingCartTopUp from "./ShoppingCartTopUp";
import ProductDetailSkeleton from "@/component/skeleton/ProductDetailSkeleton";
import axios from "axios";
// import { toast } from "@/components/ui/use-toast";
// import { useToast } from "@/components/ui/use-toast";

// import { cn } from "@/lib/utils"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
 
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [api, setApi] = useState()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["yellow", "blue", "pink", "purple"];
  const [product,setProduct] = useState(null)
  const location = useLocation();
  const productData = location.state?.product;
  // console.log(product);
  
  const productId = productData._id

  useEffect( ()=>{
       const singlePrd = async()=>{
        try {
          let res = await axios.post(`${import.meta.env.VITE_PRODUCT_SINGLE_PRODUCT}`,{ pId: productId})
          setProduct(res.data.product)
         
          
        } catch (error) {
          return (<ProductDetailSkeleton/>)
        }
      }
      // const productImages = product.pImages
     
      
    singlePrd();  
  },[productId])

  
      // console.log("fuck",product);
  // useEffect(() => {
  //   if (!api) {
  //     return
  //   }
  //   setCount(api.scrollSnapList().length)
  //   setCurrent(api.selectedScrollSnap() + 1)

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //     setActiveIndex(api.selectedScrollSnap());
  //   })
  // }, [api])
  useEffect(() => {
    if (!api) {
      return () => {}; // Return empty cleanup function
    }
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
  
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setActiveIndex(api.selectedScrollSnap());
    };
  
    api.on("select", handleSelect);
  
    // Cleanup function
    return () => {
      api.off("select", handleSelect); // Remove event listener
    };
  }, [api]);

  const addToCart =()=>{               
    return  ( 
      toast(
        "Event has been created", {
          description:  <ShoppingCartTopUp product={product} />,
          className:"bg-blue flex justify-center items-center p-none"
        })
      )
    } 
    
    if(!product) return <ProductDetailSkeleton/>
    const productImages = product.pImages.map((img)=>img.URL) || [];
 
  return (
    <div className="min-h-screen bg-pink-50 md:bg-pink-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Product Section */}
        <Card className="bg-white rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
            {/* Image Section */}
            <div className="relative">
              {/* chat gpt  */}

              {/* Desktop: Vertical thumbnails on the left */}
              <div className="hidden md:flex flex-col gap-4 absolute left-0 top-0 h-full pr-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setHoveredImageIndex(index)} // Set hover state
                    onMouseLeave={() => setHoveredImageIndex(null)} // Reset on leave
                    onClick={() => setSelectedImageIndex(index)} // Click to set selected image
                    className={cn(
                      "relative w-16 aspect-[3/4] rounded-lg overflow-hidden border-2",
                      selectedImageIndex === index
                        ? "border-black"
                        : "border-transparent hover:border-gray-200"
                    )}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="hidden md:flex aspect-[3/4] relative rounded-2xl overflow-hidden md:ml-20">
                <img
                  src={
                    productImages[
                      hoveredImageIndex !== null
                        ? hoveredImageIndex
                        : selectedImageIndex
                    ] || "/placeholder.svg"
                  }
                  alt="Product Image"
                  className="object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Mobile: Horizontal thumbnails below */}
              <div className="flex md:hidden gap-2 mt-4 overflow-auto pb-2 snap-x">
                <div className="mx-auto max-w-xs">
                    <Carousel setApi={setApi} className="w-full max-w-xs">
                      <CarouselContent>
                        {productImages.map((image, index) =>{         
                         return(
                          <CarouselItem key={index}    >
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6"  >
                                {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                <img src={image} alt="" />
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        )})}
                      </CarouselContent>
                    
                    </Carousel>
                      {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-4">
                        {productImages.map((_, index) => (
                          <div
                            key={index}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${
                              activeIndex === index ? "bg-blue-500 scale-125" : "bg-gray-300"
                            }`}
                          ></div>
                        ))}
                   </div>

                </div>

              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">
                 {product.pName}
                </h1>
                <p>
                  {product.pDescription}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <span key={star} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                    <span className="text-gray-300">★</span>
                  </div>
                  <span className="text-sm text-gray-500">(4.0)</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">Rs. {product.pPrice*(100-product.pOffer)/100}</span>
                  <span className="text-sm text-gray-500 line-through">
                    Rs. {product.pPrice}
                  </span>
                  <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded">
                   {product.pOffer}% OFF
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Tax included. Shipping calculated at checkout.
                </p>
              </div>

              {/* Size Selector */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Size</Label>
                  <RadioGroup
                    defaultValue={selectedSize}
                    onValueChange={setSelectedSize}
                    className="flex flex-wrap gap-2 mt-2"
                  >
                    {sizes.map((size) => (
                      <Label
                        key={size}
                        className={`px-4 py-2 rounded-full border-2 cursor-pointer ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value={size} className="sr-only" />
                        {size}
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Color Selector */}
                <div>
                  <Label className="text-base">Color</Label>
                  <RadioGroup
                    defaultValue={selectedColor}
                    onValueChange={setSelectedColor}
                    className="flex gap-2 mt-2"
                  >
                    {colors.map((color) => (
                      <Label
                        key={color}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                          selectedColor === color
                            ? "border-black"
                            : "border-transparent"
                        }`}
                      >
                        <RadioGroupItem value={color} className="sr-only" />
                        <span
                          className="block w-full h-full rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Quantity Selector */}
                <div>
                  <Label className="text-base">Quantity</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Button className="flex-1 text-lg h-12"onClick={addToCart} >Add to Cart</Button> */}
                <Button
                  // variant="outline"
                  className="flex-1 text-lg h-12"
                 onClick={ addToCart } 
                 >
               Add to Cart
              </Button>
                <Button variant="secondary" className="flex-1 text-lg h-12"> Buy Now </Button>
              </div>

              {/* Share Button */}
              <Button variant="ghost" className="w-full sm:w-auto">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </Card>

        {/* Similar Products */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[3/4] relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B29A32F65-986C-4D6C-9FA9-F59A29CACDEF%7D-gh0Fx6Io6ARfqYrKf5RUUO65Z6pXBd.png"
                  alt="Similar Product"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium truncate">
                  Adaa Jaipur Comfort Printed Cotton Shirt
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">Rs. 1,999.00</span>
                  <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded">
                    33% OFF
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
