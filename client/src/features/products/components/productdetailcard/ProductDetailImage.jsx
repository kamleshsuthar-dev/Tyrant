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
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { MobileCarousel } from './MoblieCarousel';

const ResponsiveProductGallery = ({productImages}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState(null);

 
  return (
    <div className=" w-full max-w-6xl mx-auto ">
      <div className=" flex flex-col md:flex-row lg:h-[540px] min-h-[400px] w-full justify-center rounded-3xl border-4 border-secondary bg-primary p-2  gap-4">
        
        {/* Desktop: Vertical thumbnails on the left - Hidden on mobile/tablet */}
        <div className="hidden md:flex flex-col items-center gap-y-2 rounded-3xl bg-secondary p-2 overflow-y-auto max-h-[550px] h-fit scrollbar-hide w-20 shrink-0">
          {productImages.map((image, index) => (
            <button
              key={index}
              onMouseEnter={() => setHoveredImageIndex(index)}
              onMouseLeave={() => setHoveredImageIndex(null)}
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                "relative aspect-square wshrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 hover:scale-105",
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
        <div className="hidden md:flex flex-1 overflow-hidden rounded-3xl border border-gray-200 bg-white">
          <img
            src={productImages[hoveredImageIndex !== null ? hoveredImageIndex : selectedImageIndex]}
            alt="Product Image"
            className="h-full w-full object-contain p-4"
          />
        </div>

        <div className="flex md:hidden w-full flex-col ">
            <MobileCarousel productImages={productImages}/>
        </div>

      </div>
    </div>
  );
};

export default ResponsiveProductGallery;