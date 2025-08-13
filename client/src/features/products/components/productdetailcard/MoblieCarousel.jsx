"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,

//   type CarouselApi, 
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

export function MobileCarousel({ productImages }) {
  const [api, setApi] = React.useState(null)
  const [activeIndex, setActiveIndex] = React.useState(0)

  // Listen for slide changes
  React.useEffect(() => {
    if (!api) return

    setActiveIndex(api.selectedScrollSnap()) // set initial slide index

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="mx-auto max-w-xs flex flex-col  items-center relative">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {productImages.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center rounded-lg p-2">
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

     
        <div className=" flex justify-center gap-2 relative bottom-4 w-fit bg-primary px-3 rounded-xl py-[3px]">

          
            {productImages.map((_, index) => (
                <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    activeIndex === index
                    ? "scale-125 bg-secondary w-6"
                    : "bg-secondary hover:bg-gray-400"
                )}
                aria-label={`Go to image ${index + 1}`}
                />
            ))}
          
        </div>
    </div>
  )
}
