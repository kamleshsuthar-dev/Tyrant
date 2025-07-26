import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"

// function cn(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

function ProductDetailImage({productImages}) {
     const [selectedImageIndex, setSelectedImageIndex] = useState(0);
     const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
      const [api, setApi] = useState();
      const [activeIndex, setActiveIndex] = useState(0);

        useEffect(() => {
          if (!api) {
            return () => {}; // Return empty cleanup function
          }
      
          // setCount(api.scrollSnapList().length);
          // setCurrent(api.selectedScrollSnap() + 1);
      
          const handleSelect = () => {
            // setCurrent(api.selectedScrollSnap() + 1);
            setActiveIndex(api.selectedScrollSnap());
          };
      
          api.on("select", handleSelect);
      
          // Cleanup function
          return () => {
            api.off("select", handleSelect); // Remove event listener
          };
        }, [api]);

  return (
    <div className="relative flex w-fit justify-center rounded-3xl bg-primary p-4 md:justify-between">
                   {/* Desktop: Vertical thumbnails on the left */}
                   <div className="absolute hidden flex-col gap-2 rounded-2xl bg-[#D1D1D1] p-2 md:flex">
                     {productImages.map((image, index) => (
                       <button
                         key={index}
                         onMouseEnter={() => setHoveredImageIndex(index)}
                         onMouseLeave={() => setHoveredImageIndex(null)}
                         onClick={() => setSelectedImageIndex(index)}
                         className={cn(
                           "relative aspect-square w-14 overflow-hidden rounded-2xl border-2 bg-secondary",
                           selectedImageIndex === index
                             ? "border-primary"
                             : "border-gray-200 hover:border-gray-300",
                         )}
                       >
                         <img
                           src={image || "/placeholder.svg"}
                           alt={`Product ${index + 1}`}
                           className="h-full w-full object-cover"
                         />
                       </button>
                     ))}
                   </div>
   
                   {/* Main Image */}
                   <div className="relative ml-[5.3rem] hidden h-full overflow-hidden rounded-2xl border border-gray-100 bg-secondary md:flex">
                     <img
                       src={
                         productImages[
                           hoveredImageIndex !== null
                             ? hoveredImageIndex
                             : selectedImageIndex
                         ] || "/placeholder.svg"
                       }
                       alt="Product Image"
                       className="h-full w-full object-contain"
                     />
                   </div>
   
                   {/* Mobile: Horizontal thumbnails below images*/}
                   <div className="flex snap-x md:hidden">
                     <div className="max-w-xs">
                       <Carousel setApi={setApi} className="w-full max-w-xs">
                         <CarouselContent>
                           {productImages.map((image, index) => {
                             return (
                               <CarouselItem key={index}>
                                 <Card>
                                   <CardContent className="xs:p-3 flex aspect-square items-center justify-center p-1">
                                     <img src={image} alt="Chitapak Dum Dum" />
                                   </CardContent>
                                 </Card>
                               </CarouselItem>
                             );
                           })}
                         </CarouselContent>
                       </Carousel>
                       {/* Dots Navigation */}
                       <div className="mt-4 flex justify-center gap-2">
                         {productImages.map((_, index) => (
                           <div
                             key={index}
                             className={`h-2 w-2 rounded-full transition-all duration-300 ${
                               activeIndex === index
                                 ? "scale-125 bg-blue-500"
                                 : "bg-gray-300"
                             }`}
                           ></div>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
  )
}

export default ProductDetailImage