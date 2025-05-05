import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Minus, Plus } from "lucide-react";

const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#2020200f]  p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-secondary rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
            {/* Image Section */}
            <div className="relative">
              {/* Desktop Thumbnails */}
              <div className="hidden md:flex flex-col gap-4 absolute left-0 top-0 h-full pr-4 ">
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="w-16 aspect-[3/4] rounded-lg bg-gray-200 animate-pulse"
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="hidden md:flex aspect-[3/4] relative rounded-2xl overflow-hidden md:ml-20 bg-gray-200 animate-pulse">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-secondary/80 backdrop-blur-sm rounded-full"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden aspect-square bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              {/* Title and Description */}
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-20 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className="w-16 h-10 bg-gray-200 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="w-12 h-8 bg-gray-200 rounded animate-pulse" />
                  <Button variant="outline" size="icon" disabled>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Share Button */}
              <div className="w-full sm:w-auto h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
