"use client";

import { useEffect, useRef,Suspense,lazy ,useState } from "react";
import { Heart, Minus, Plus, Share2 } from "lucide-react";

import { useLocation, NavLink, useNavigate,useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGoogleAuthContext } from "@/context/GoogleAuth";
import ProductDetailSkeleton from "@/component/skeleton/ProductDetailSkeleton";
import axios from "axios";
import WishList from "../wishlist/WishList";
import ReviewSection from "./ReviewSection";
import ProductDesciption from "./ProductDescription";

const ShoppingCartTopUp = lazy(() => import("../shoppingCart/ShoppingCartTopUp"));

// import { cn } from "@/lib/utils"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { isLoginUser } = useGoogleAuthContext();
  // console.log(googleData);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const colors = ["#00D1FF", "#15F301", "#FDD33C", "#E700C2"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  // const {wishlistID} = useParams()
  const navigate = useNavigate();
  const popUp = useRef(null);

  const location = useLocation();
  const productData = location.state?.product;
    const wishlistID = location.state?.wishlistID;
    
  const productId = productData?._id ?? wishlistID ;

  useEffect(() => {
    const singlePrd = async () => {
      try {
        let res = await axios.post(
          `${import.meta.env.VITE_PRODUCT_SINGLE_PRODUCT}`,
          { pId: productId }
        );

        console.log("detail", res.data.product);
        if (res.data.product.isInWishlist) {
          setWishlist(true);
        } else {
          setWishlist(false);
        }
        setProduct(res.data.product);
      } catch (error) {
        return <ProductDetailSkeleton />;
      }
    };
    singlePrd();
  }, []);

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

 
  const [wishlistLoading, setWishlistLoading] = useState(false);



  const addToWishList = () => {
   
     const wishlistfun = async () => {
      if (isLoginUser === true) {
          try {
            setWishlistLoading(true)
            const res = await axios.post(
              `${import.meta.env.VITE_PRODUCT_TOGGLE_WISHLIST}`,
              { productId: productId },
              { withCredentials: true }
            );
            console.log(res.data);
            setWishlist((prev) => !prev);
            setWishlistLoading(false)
          } catch (error) {
            console.log("whishlist api error", error);
          }
        }
       else {
        alert("login toh kar pahle Bhosdike ")
      }
    }

      wishlistfun()
  };

  const addtoCart = () => {
   const cartfun = async () => {
    if (isLoginUser === true) {
        try {
          let res = await axios.post(`${import.meta.env.VITE_ADD_CART_PRODUCT}`, {
            productId: productId,
            quantity: quantity,
            color: selectedColor,
            size: selectedSize,
          });
          
          console.log(res.data.message);
        } catch (error) {
          console.log("add cart api error", error);
        }
    } else {
      alert("login kon tera Baap kare ga Bhosdike ")
      return
    }
    popUp.current.click();
    }
      cartfun()
  };

  const checkOut = () => {
    navigate("/checkout");
  };

 

  if (!product) return <ProductDetailSkeleton />;
  const productImages = product.pImages.map((img) => img.URL) || [];

  return (
    <>
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Product Section */}
          <Card className="bg-white rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8 ">
              {/* Image Section */}
              <div className="relative rounded-3xl bg-[#202020]">
                {/* chat gpt  */}

               {/* Desktop: Vertical thumbnails on the left */}
                <div className="hidden md:flex flex-col gap-4 absolute  left-0 top-0 h-full pr-4">
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
                <div className="hidden md:flex aspect-[3/4] relative border-[12px] border-[#202020] rounded-3xl overflow-hidden  md:ml-20">
                  <img
                    src={
                      productImages[
                        hoveredImageIndex !== null
                          ? hoveredImageIndex
                          : selectedImageIndex
                      ] || "/placeholder.svg"
                    }
                    alt="Product Image"
                    className="object-cover w-full"
                  />
                  <Button
                    onClick={addToWishList}
                    disabled={wishlistLoading}
                    variant="ghost"
                  size="icon"
                    className={`absolute top-4 right-4 inline-flex items-center justify-center p-4 rounded-full transition-all duration-200 ${
                      wishlist ? "bg-red-100" : "bg-gray-100"
                    } ${
                      wishlistLoading ? "cursor-wait" : "hover:bg-red-50"
                    } disabled:opacity-50`}
                  >
                    <Heart
                      className={` w-5 h-5 transition-all duration-200 ${wishlist ? "fill-pink-500 stroke-[#202020]" : "stroke-[#202020]"} ${wishlistLoading ? "animate-pulse" : ""}  `}
                    />

                    {wishlistLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-full h-full animate-ping rounded-full bg-red-200 opacity-75"></div>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Mobile: Horizontal thumbnails below images*/}
                <div className="flex md:hidden gap-2 mt-4 overflow-auto pb-2 snap-x">
                  <div className="mx-auto max-w-xs">
                    <Carousel setApi={setApi} className="w-full max-w-xs">
                      <CarouselContent>
                        {productImages.map((image, index) => {
                          return (
                            <CarouselItem key={index}>
                              <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                  <img src={image} alt="" />
                                </CardContent>
                              </Card>
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>
                    </Carousel>
                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-4">
                      {productImages.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            activeIndex === index
                              ? "bg-blue-500 scale-125"
                              : "bg-gray-300"
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
                  <h1 className="text-3xl font-bold">{product.pName}</h1>
                  <p>{product.pDescription}</p>
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
                    <span className="text-2xl font-bold">
                      Rs. {(product.pPrice * (100 - product.pOffer)) / 100}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      Rs. {product.pPrice}
                    </span>
                    <span className="text-sm text-[#202020] font-medium bg-[#72D570] px-1 py-1 rounded">
                      {product.pOffer}% Off
                    </span>
                  </div>
                  <p className="text-sm text-[#202020]">
                    Tax included. Shipping calculated at checkout.
                  </p>
                </div>

                {/* Size Selector */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-2xl">Size</Label>
                    <RadioGroup
                      defaultValue={selectedSize}
                      onValueChange={setSelectedSize}
                      className="flex flex-wrap gap-2 mt-2"
                    >
                      {sizes.map((size) => {
                        return (
                          <Label
                            key={size}
                            className={`py-[1.5px] rounded-xl px-auto border-2 w-[60px] cursor-pointer text-lg text-[#FFFFFF] bg-[#42985A] flex items-center justify-center  ${
                              selectedSize === size
                                ? "border-[#35343A] bg-[#35343A] "
                                : "border-[#42985A] hover:border-[#42985A]"
                            }`}
                          >
                            <RadioGroupItem value={size} className="sr-only" />
                            {size}
                          </Label>
                        );
                      })}
                    </RadioGroup>
                  </div>

                  {/* Color Selector */}
                  <div>
                    <Label className="text-2xl">Color</Label>
                    <RadioGroup
                      defaultValue={selectedColor}
                      onValueChange={setSelectedColor}
                      className="flex gap-2 mt-2"
                    >
                      {colors.map((color) => (
                        <Label
                          key={color}
                          className={`w-8 h-8 rounded-[11px] cursor-pointer border-[3px]   ${
                            selectedColor === color
                              ? "border-[#202020] drop-shadow-[0_4px_9.6px_rgba(0,0,0,0.25)] -translate-y-[2px]"
                              : "border-transparent"
                          }`}
                        >
                          <RadioGroupItem value={color} className="sr-only" />
                          <span
                            className="block w-full h-full rounded-[8px] "
                            style={{ backgroundColor: color }}
                          />
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <Label className="text-2xl">Quantity</Label>
                    <div className="flex items-center mt-2 bg-[#202020] w-fit text-[#FFFFFF] rounded-lg">
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-transparent hover:bg-transparent hover:text-[#FFFFFF] border-none"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center border-l-2 border-r-2 text-lg">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-transparent hover:bg-transparent hover:text-[#FFFFFF] border-none"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-4 max-w-[460px] flex-wrap ">
                  <div>
                    <Suspense fallback={<div>Loading...</div>}>
                      <ShoppingCartTopUp ref={popUp} product={product} />
                    </Suspense>
                  </div>
                  <Button
                    className="flex w-full text-2xl text-[#FFFFFF] bg-[#202020] py-[24px] px-[144px] rounded-xl"
                    onClick={addtoCart}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="secondary"
                    className="flex w-full text-2xl text-[#202020] bg-[#9EFF00] py-[24px] px-[144px] rounded-xl"
                    onClick={checkOut}
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Product Description */}
                      {/* <ProductDesciption/> */}
                {/* Share Button */}
                {/* <Button variant="ghost" className="w-full sm:w-auto">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button> */}
              </div>
            </div>
          </Card>

        {/* review  */}
        <div className=" mt-4">
          <ReviewSection product = {product}/>       
          </div>
          

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
    </>
  );
}
