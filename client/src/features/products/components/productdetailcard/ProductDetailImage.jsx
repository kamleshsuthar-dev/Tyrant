// import { Card, CardContent } from '@/components/ui/card';
// import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
// import React, { useEffect, useState } from 'react'
// import { cn } from "@/lib/utils"

// // function cn(...classes) {
// //   return classes.filter(Boolean).join(" ");
// // }

// function ProductDetailImage({productImages}) {
//      const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//      const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
//       const [api, setApi] = useState();
//       const [activeIndex, setActiveIndex] = useState(0);

//         useEffect(() => {
//           if (!api) {
//             return () => {}; // Return empty cleanup function
//           }
      
//           // setCount(api.scrollSnapList().length);
//           // setCurrent(api.selectedScrollSnap() + 1);
      
//           const handleSelect = () => {
//             // setCurrent(api.selectedScrollSnap() + 1);
//             setActiveIndex(api.selectedScrollSnap());
//           };
      
//           api.on("select", handleSelect);
      
//           // Cleanup function
//           return () => {
//             api.off("select", handleSelect); // Remove event listener
//           };
//         }, [api]);

//   return (
//     <div className="relative flex lg:h-[590px] h-6/9 min-w-92   justify-center rounded-3xl border-[4px] border-secondary bg-primary p-2 md:justify-between">
//                    {/* Desktop: Vertical thumbnails on the left */}
                 

//                   <div className="hidden flex-col items-center gap-y-2 rounded-3xl bg-[#D1D1D1] p-2 md:flex  overflow-y-auto max-h-[550px] scrollbar-hide">
//                       {productImages.map((image, index) => (
//                         <button
//                           key={index}
//                           onMouseEnter={() => setHoveredImageIndex(index)}
//                           onMouseLeave={() => setHoveredImageIndex(null)}
//                           onClick={() => setSelectedImageIndex(index)}
//                           className={cn(
//                             "relative aspect-square w-16 flex-shrink-0 overflow-hidden rounded-3xl bg-secondary border-[4px] transition-all duration-200",
//                             selectedImageIndex === index
//                               ? "border-primary shadow-lg"
//                               : "border-primary-muted hover:border-primary-contrast hover:shadow-md",
//                           )}
//                         >
//                           <img
//                             src={image || "/placeholder.svg"}
//                             alt={`Product ${index + 1}`}
//                             className="h-full w-full object-cover"
//                           />
//                         </button>
//                       ))}
//                    </div>
                
   
//                    {/* Main Image */}
//                    <div className=" hidden overflow-hidden rounded-3xl border border-gray-100 bg-secondary md:flex">
//                      <img
//                        src={
//                          productImages[
//                            hoveredImageIndex !== null
//                              ? hoveredImageIndex
//                              : selectedImageIndex
//                          ] || "/placeholder.svg"
//                        }
//                        alt="Product Image"
//                        className="h-full max-w-full object-contain"
//                      />
//                    </div>
                  
   
//                    {/* Mobile: Horizontal thumbnails below images*/}
//                    <div className="flex snap-x md:hidden">
//                      <div className="max-w-xs">
//                        <Carousel setApi={setApi} className="w-full max-w-xs">
//                          <CarouselContent>
//                            {productImages.map((image, index) => {
//                              return (
//                                <CarouselItem key={index}>
//                                  <Card>
//                                    <CardContent className="xs:p-3 flex aspect-square items-center justify-center p-1">
//                                      <img src={image} alt="Chitapak Dum Dum" />
//                                    </CardContent>
//                                  </Card>
//                                </CarouselItem>
//                              );
//                            })}
//                          </CarouselContent>
//                        </Carousel>
//                        {/* Dots Navigation */}
//                        <div className="mt-4 flex justify-center gap-2">
//                          {productImages.map((_, index) => (
//                            <div
//                              key={index}
//                              className={`h-2 w-2 rounded-full transition-all duration-300 ${
//                                activeIndex === index
//                                  ? "scale-125 bg-blue-500"
//                                  : "bg-gray-300"
//                              }`}
//                            ></div>
//                          ))}
//                        </div>
//                      </div>
//                    </div>
                   
//                  </div>
//   )
// }

// export default ProductDetailImage



import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Mock Carousel components for demo
const Carousel = ({ children, setApi, className }) => (
  <div className={className}>{children}</div>
);

const CarouselContent = ({ children }) => (
  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
    {children}
  </div>
);

const CarouselItem = ({ children }) => (
  <div className="flex-none w-full snap-center">
    {children}
  </div>
);

const Card = ({ children }) => (
  <div className="bg-white rounded-lg shadow-sm border">
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

const ResponsiveProductGallery = ({productImages}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState(null);

 
  return (
    <div className=" w-full max-w-6xl mx-auto ">
      <div className=" flex flex-col lg:flex-row lg:h-[540px] min-h-[400px] w-full justify-center rounded-3xl border-4 border-secondary bg-primary p-2 gap-4">
        
        {/* Desktop: Vertical thumbnails on the left - Hidden on mobile/tablet */}
        <div className="hidden lg:flex flex-col items-center gap-y-2 rounded-3xl bg-secondary p-2 overflow-y-auto max-h-[550px] scrollbar-hide w-20 flex-shrink-0">
          {productImages.map((image, index) => (
            <button
              key={index}
              onMouseEnter={() => setHoveredImageIndex(index)}
              onMouseLeave={() => setHoveredImageIndex(null)}
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                "relative aspect-square w-16 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 hover:scale-105",
                selectedImageIndex === index
                  ? "border-primary shadow-lg ring-2 ring-primary"
                  : "border-primary-muted hover:border-primary-contrast hover:shadow-md"
              )}
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Desktop: Main Image - Hidden on mobile/tablet */}
        <div className="hidden lg:flex flex-1 overflow-hidden rounded-3xl border border-gray-200 bg-white">
          <img
            src={productImages[hoveredImageIndex !== null ? hoveredImageIndex : selectedImageIndex]}
            alt="Product Image"
            className="h-full w-full object-contain p-4"
          />
        </div>

        {/* Tablet: Horizontal layout - Hidden on mobile and desktop */}
        <div className="hidden md:flex lg:hidden w-full gap-4">
          {/* Tablet thumbnails */}
          <div className="flex flex-col gap-2 w-20 flex-shrink-0">
            {productImages.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={cn(
                  "aspect-square w-16 overflow-hidden rounded-xl border-2 transition-all duration-200",
                  selectedImageIndex === index
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-300 hover:border-blue-400"
                )}
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
            {productImages.length > 4 && (
              <div className="aspect-square w-16 rounded-xl bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                +{productImages.length - 4}
              </div>
            )}
          </div>
          
          {/* Tablet main image */}
          <div className="flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <img
              src={productImages[selectedImageIndex]}
              alt="Product Image"
              className="h-full w-full object-contain p-4"
            />
          </div>
        </div>

        {/* Mobile: Carousel with dots - Only visible on mobile */}
        <div className="flex md:hidden w-full flex-col">
          <div className="w-full">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {productImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-2">
                        <img 
                          src={image} 
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          
          {/* Mobile: Dots Navigation */}
          <div className="mt-4 flex justify-center gap-2">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "scale-125 bg-blue-500 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile: Thumbnail strip */}
          <div className="mt-4 flex gap-2 justify-center overflow-x-auto pb-2 scrollbar-hide">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200",
                  activeIndex === index
                    ? "border-blue-500 shadow-md"
                    : "border-gray-300 hover:border-blue-400"
                )}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveProductGallery;