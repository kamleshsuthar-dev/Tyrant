"use client";

import { Minus, Plus } from "lucide-react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

import ProductDetailSkeleton from "@/component/skeleton/ProductDetailSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGoogleAuthContext } from "@/context/GoogleAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import WishList from "../wishlist/WishList";
// import ReviewSection from "./ReviewSection";
// import ProductDesciption from "./ProductDescription";
import StarRating from "@/features/reuseable-component/StarRating";
const ShoppingCartTopUp = lazy(
  () => import("@/route/shoppingCart/ShoppingCartTopUp"),
);

// import { cn } from "@/lib/utils"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetailCard({ pId }) {
  const { isLoginUser } = useGoogleAuthContext();
  //   const {pId} = useParams()

  const [quantity, setQuantity] = useState(1);

  const sizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");

  const colors = ["#00D1FF", "#15F301", "#FDD33C", "#E700C2"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [reviewsUpdated, setReviewsUpdated] = useState(0);

  const navigate = useNavigate();
  const popUp = useRef(null);

  //  Simlar Products

  useEffect(() => {
    const singlePrd = async () => {
      try {
        let res = await axios.get(
          `${import.meta.env.VITE_PRODUCT_SINGLE_PRODUCT}?pId=${pId}`,
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
  }, [pId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setProduct(null);
  }, [pId]);

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

  const addToWishList = async () => {
    if (isLoginUser === true) {
      try {
        setWishlistLoading(true);
        const res = await axios.post(
          `${import.meta.env.VITE_PRODUCT_TOGGLE_WISHLIST}`,
          { productId: pId },
          { withCredentials: true },
        );
        console.log(res.data);
        setWishlist((prev) => !prev);
        setWishlistLoading(false);
      } catch (error) {
        console.log("whishlist api error", error);
      }
    } else {
      alert("login toh kar pahle ");
    }
  };

  const addtoCart = async () => {
    if (!isLoginUser) {
      alert("Please login to add items in cart");
      return;
    }

    try {
      popUp.current.click();
      axios
        .post(`${import.meta.env.VITE_ADD_CART_PRODUCT}`, {
          productId: pId,
          quantity: quantity,
          color: selectedColor,
          size: selectedSize,
        })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((error) => {
          console.log("Add to cart API error:", error);
        });
    } catch (error) {
      console.log("Add to cart error:", error);
    }
  };

  const checkOut = () => {
    navigate("/checkout");
  };

  if (!product)
    return (
      <>
        <ProductDetailSkeleton />
      </>
    );

  const productImages = product.pImages.map((img) => img.URL) || [];

  return (
    <>
      <div className="bg-secondary " id="top">
        <div className="max-w-7xl mx-auto">
          {/* Main Product Section */}
          <div className="bg-secondary rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8   p-4 md:p-8 ">
              {/* Image Section */}
              <div className="relative w-fit rounded-3xl bg-primary p-4 flex justify-center md:justify-between">
                {/* Desktop: Vertical thumbnails on the left */}
                <div className="hidden md:flex flex-col gap-2 absolute   bg-[#D1D1D1] rounded-2xl p-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onMouseEnter={() => setHoveredImageIndex(index)}
                      onMouseLeave={() => setHoveredImageIndex(null)}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "relative w-14 aspect-square rounded-2xl overflow-hidden border-2 bg-secondary",
                        selectedImageIndex === index
                          ? "border-primary"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="hidden md:flex h-full relative border border-gray-100 bg-secondary rounded-2xl overflow-hidden ml-[5.3rem]">
                  <img
                    src={
                      productImages[
                        hoveredImageIndex !== null
                          ? hoveredImageIndex
                          : selectedImageIndex
                      ] || "/placeholder.svg"
                    }
                    alt="Product Image"
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Mobile: Horizontal thumbnails below images*/}
                <div className="flex md:hidden    snap-x">
                  <div className=" max-w-xs">
                    <Carousel setApi={setApi} className="w-full max-w-xs">
                      <CarouselContent>
                        {productImages.map((image, index) => {
                          return (
                            <CarouselItem key={index}>
                              <Card>
                                <CardContent className="flex aspect-square items-center justify-center xs:p-3 p-1">
                                  <img src={image} alt="Chitapak Dum Dum" />
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
              <div className="space-y-2">
                <div>
                  <h1 className="text-2xl font-bold">{product.pName}</h1>
                  <p>{product.pDescription}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                    <span className="">{product.avgRating}</span>
                    <StarRating
                      rating={product.avgRating}
                      Pcolor="#FFC224"
                      Scolor="#202020"
                    />
                    <span
                      className={` flex justify-center items-center gap-1 ${product.reviewCount == 0 ? "hidden" : " "}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="7"
                        height="5"
                        viewBox="0 0 7 3"
                        className="pt-[1px]"
                        fill="none"
                      >
                        <path
                          d="M1 0.5L3.5 2.5L6 0.5"
                          stroke="#202020"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {product.reviewCount}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 border-b-2 pb-4 border-dashed border-[#2020202c]">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      Rs. {(product.pPrice * (100 - product.pOffer)) / 100}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      Rs. {product.pPrice}
                    </span>
                    <span className="text-sm text-primary font-medium bg-[#72D570] px-1 py-1 rounded">
                      {product.pOffer}% Off
                    </span>
                  </div>
                  <p className="text-xs text-primary">
                    Tax included. Shipping calculated at checkout.
                  </p>
                </div>

                {/* Size Selector */}
                <div className="relative space-y-2 !mt-2 ">
                  <div className="absolute  right-8 flex gap-2 ">
                    <button
                      className={`bg-none scale-[0.85] ${
                        wishlistLoading ? "cursor-wait" : ""
                      }  `}
                      onClick={addToWishList}
                      disabled={wishlistLoading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="25"
                        viewBox="0 0 28 25"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.20485 2.27588C2.90348 1.56772 3.73293 1.00597 4.64583 0.622711C5.55872 0.239449 6.53718 0.042184 7.52532 0.042184C8.51346 0.042184 9.49192 0.239449 10.4048 0.622711C11.3177 1.00597 12.1472 1.56772 12.8458 2.27588C13.1196 2.55441 13.4742 2.90104 13.9096 3.31578C14.3429 2.90104 14.6975 2.5539 14.9734 2.27436C16.3735 0.833694 18.281 0.015664 20.2763 0.000222616C22.2715 -0.0152187 24.1911 0.773193 25.6128 2.19202C27.0344 3.61084 27.8417 5.54385 27.8569 7.56582C27.8722 9.58778 27.0942 11.5331 25.694 12.9737L14.9734 23.8393C14.6912 24.1251 14.3086 24.2857 13.9096 24.2857C13.5106 24.2857 13.128 24.1251 12.8458 23.8393L2.1221 12.9722C0.746902 11.5349 -0.0152525 9.60721 0.000231393 7.60533C0.0157153 5.60345 0.807595 3.68806 2.20485 2.27283V2.27588Z"
                          fill={wishlist ? "#9EFF00" : "#fff"}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M24.3985 11.699C25.4624 10.6039 26.0535 9.12537 26.0416 7.58866C26.0298 6.05196 25.416 4.58297 24.3353 3.50485C23.8003 2.97102 23.1667 2.54922 22.4707 2.26353C21.7748 1.97784 21.0301 1.83386 20.2792 1.83981C18.7628 1.85182 17.3132 2.47379 16.2493 3.56889C15.9604 3.86165 15.5933 4.22099 15.1479 4.64691L13.9096 5.82861L12.6712 4.64691C12.2249 4.21997 11.8572 3.86063 11.5683 3.56889C10.4961 2.48228 9.04174 1.87183 7.52532 1.87183C6.0089 1.87183 4.55458 2.48228 3.48231 3.56889C1.27347 5.80879 1.24789 9.43014 3.40106 11.6807L13.9096 22.3298L24.3985 11.699ZM2.20485 2.27588C2.90348 1.56772 3.73293 1.00597 4.64583 0.622711C5.55872 0.239449 6.53718 0.042184 7.52532 0.042184C8.51346 0.042184 9.49192 0.239449 10.4048 0.622711C11.3177 1.00597 12.1472 1.56772 12.8458 2.27588C13.1196 2.55441 13.4742 2.90104 13.9096 3.31578C14.3429 2.90104 14.6975 2.5539 14.9734 2.27436C16.3735 0.833694 18.281 0.015664 20.2763 0.000222616C22.2715 -0.0152187 24.1911 0.773193 25.6128 2.19202C27.0344 3.61084 27.8417 5.54385 27.8569 7.56582C27.8722 9.58778 27.0942 11.5331 25.694 12.9737L14.9734 23.8393C14.6912 24.1251 14.3086 24.2857 13.9096 24.2857C13.5106 24.2857 13.128 24.1251 12.8458 23.8393L2.1221 12.9722C0.746902 11.5349 -0.0152525 9.60721 0.000231393 7.60533C0.0157153 5.60345 0.807595 3.68806 2.20485 2.27283V2.27588Z"
                          fill="#212121"
                        />
                      </svg>
                    </button>
                    <button className="bg-none scale-[0.8]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="26"
                        viewBox="0 0 23 26"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.4697 0C17.2682 0 16.1159 0.456546 15.2663 1.2692C14.4167 2.08186 13.9394 3.18406 13.9394 4.33333C13.9394 4.59164 13.9635 4.84758 14.0105 5.09838L7.41562 9.5141C7.38206 9.53657 7.35031 9.56059 7.32038 9.58597C6.52787 8.99337 5.5467 8.66667 4.5303 8.66667C3.32879 8.66667 2.17649 9.12321 1.32689 9.93587C0.477298 10.7485 0 11.8507 0 13C0 14.1493 0.477298 15.2515 1.32689 16.0641C2.17649 16.8768 3.32879 17.3333 4.5303 17.3333C5.5467 17.3333 6.52787 17.0066 7.32038 16.414C7.35031 16.4394 7.38206 16.4634 7.41562 16.4859L14.0105 20.9016C13.9635 21.1524 13.9394 21.4084 13.9394 21.6667C13.9394 22.8159 14.4167 23.9181 15.2663 24.7308C16.1159 25.5435 17.2682 26 18.4697 26C19.6712 26 20.8235 25.5435 21.6731 24.7308C22.5227 23.9181 23 22.8159 23 21.6667C23 20.5174 22.5227 19.4152 21.6731 18.6025C20.8235 17.7899 19.6712 17.3333 18.4697 17.3333C17.2682 17.3333 16.1159 17.7899 15.2663 18.6025C15.1235 18.7391 14.9912 18.8839 14.8699 19.0357L8.62489 14.8543C8.90911 14.28 9.06061 13.6475 9.06061 13C9.06061 12.3525 8.90911 11.72 8.62489 11.1457L14.8699 6.96427C14.9912 7.11608 15.1235 7.26086 15.2663 7.39746C16.1159 8.21012 17.2682 8.66667 18.4697 8.66667C19.6712 8.66667 20.8235 8.21012 21.6731 7.39746C22.5227 6.58481 23 5.4826 23 4.33333C23 3.18406 22.5227 2.08186 21.6731 1.2692C20.8235 0.456546 19.6712 0 18.4697 0ZM16.7448 2.68342C17.2023 2.24583 17.8227 2 18.4697 2C19.1167 2 19.7371 2.24583 20.1946 2.68342C20.6521 3.121 20.9091 3.71449 20.9091 4.33333C20.9091 4.95217 20.6521 5.54566 20.1946 5.98325C19.7371 6.42083 19.1167 6.66667 18.4697 6.66667C17.8227 6.66667 17.2023 6.42083 16.7448 5.98325C16.2873 5.54566 16.0303 4.95217 16.0303 4.33333C16.0303 3.71449 16.2873 3.121 16.7448 2.68342ZM16.7448 20.0168C17.2023 19.5792 17.8227 19.3333 18.4697 19.3333C19.1167 19.3333 19.7371 19.5792 20.1946 20.0168C20.6521 20.4543 20.9091 21.0478 20.9091 21.6667C20.9091 22.2855 20.6521 22.879 20.1946 23.3166C19.7371 23.7542 19.1167 24 18.4697 24C17.8227 24 17.2023 23.7542 16.7448 23.3166C16.2873 22.879 16.0303 22.2855 16.0303 21.6667C16.0303 21.0478 16.2873 20.4543 16.7448 20.0168ZM4.5303 10.6667C3.88334 10.6667 3.26287 10.9125 2.80539 11.3501C2.34792 11.7877 2.09091 12.3812 2.09091 13C2.09091 13.6188 2.34792 14.2123 2.80539 14.6499C3.26287 15.0875 3.88334 15.3333 4.5303 15.3333C5.17727 15.3333 5.79774 15.0875 6.25521 14.6499C6.71269 14.2123 6.9697 13.6188 6.9697 13C6.9697 12.3812 6.71269 11.7877 6.25521 11.3501C5.79774 10.9125 5.17727 10.6667 4.5303 10.6667Z"
                          fill="#202020"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="!mt-0">
                    <Label className="text-xl">Size</Label>
                    <RadioGroup
                      defaultValue={selectedSize}
                      onValueChange={setSelectedSize}
                      className="flex flex-wrap gap-2 mt-2"
                    >
                      {sizes.map((size) => {
                        return (
                          <Label
                            key={size}
                            className={`py-[3px] rounded-xl border-2 w-[60px] cursor-pointer text-sm text-secondary bg-[#42985A] flex items-center justify-center  ${
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
                    <Label className="text-xl">Color</Label>
                    <RadioGroup
                      defaultValue={selectedColor}
                      onValueChange={setSelectedColor}
                      className="flex gap-2 mt-2"
                    >
                      {colors.map((color) => (
                        <Label
                          key={color}
                          className={`w-8 h-8 rounded-[11px] cursor-pointer border-[3px]  hover:drop-shadow-[0_4px_9.6px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:translate-y-[-4px] ${
                            selectedColor === color
                              ? "border-primary hover:border-primary drop-shadow-[0_4px_9.6px_rgba(0,0,0,0.20)] -translate-y-[2px] hover:translate-y-[-2px]"
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
                    <Label className="text-xl">Quantity</Label>
                    <div className="flex items-center mt-2 bg-primary w-fit text-secondary rounded-lg">
                      <Button
                        variant="primary"
                        size="icon"
                        className="bg-transparent hover:bg-transparent hover:text-secondary border-none w-7 h-8"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="w-2 h-2" />
                      </Button>
                      <span className="w-10 text-center border-l-2 border-r-2 text-sm">
                        {quantity}
                      </span>
                      <Button
                        variant="primary"
                        size="icon"
                        className="bg-transparent hover:bg-transparent hover:text-secondary border-none w-7 h-8"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-4 w-full flex-wrap ">
                  <div>
                    <Suspense fallback={<div>Loading...</div>}>
                      <ShoppingCartTopUp ref={popUp} product={product} />
                    </Suspense>
                  </div>
                  <Button
                    variant="primary"
                    className="flex w-full py-0 rounded-xl"
                    onClick={addtoCart}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="accent"
                    className="flex w-full py-0 rounded-xl"
                    onClick={checkOut}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
