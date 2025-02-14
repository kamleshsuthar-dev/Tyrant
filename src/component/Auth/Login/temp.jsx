"use client"

import { Heart, Minus, Plus, Share2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("yellow")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const sizes = ["XS", "S", "M", "L", "XL"]
  const colors = ["yellow", "blue", "pink", "purple"]

  // Sample product images - replace with your actual image URLs
  const productImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B29A32F65-986C-4D6C-9FA9-F59A29CACDEF%7D-gh0Fx6Io6ARfqYrKf5RUUO65Z6pXBd.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B29A32F65-986C-4D6C-9FA9-F59A29CACDEF%7D-gh0Fx6Io6ARfqYrKf5RUUO65Z6pXBd.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B29A32F65-986C-4D6C-9FA9-F59A29CACDEF%7D-gh0Fx6Io6ARfqYrKf5RUUO65Z6pXBd.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B29A32F65-986C-4D6C-9FA9-F59A29CACDEF%7D-gh0Fx6Io6ARfqYrKf5RUUO65Z6pXBd.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B29A32F65-986C-4D6C-9FA9-F59A29CACDEF%7D-gh0Fx6Io6ARfqYrKf5RUUO65Z6pXBd.png",
  ]

  return (
    <div className="min-h-screen bg-pink-50 md:bg-pink-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Product Section */}
        <Card className="bg-white rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
            {/* Image Section */}
            <div className="relative">
              {/* Desktop: Vertical thumbnails on the left */}
              <div className="hidden md:flex flex-col gap-4 absolute left-0 top-0 h-full pr-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative w-16 aspect-[3/4] rounded-lg overflow-hidden border-2",
                      selectedImageIndex === index ? "border-black" : "border-transparent hover:border-gray-200",
                    )}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="aspect-[3/4] relative rounded-2xl overflow-hidden md:ml-20">
                <Image
                  src={productImages[selectedImageIndex] || "/placeholder.svg"}
                  alt="Product Image"
                  fill
                  className="object-cover"
                  priority
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
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative w-20 flex-shrink-0 aspect-[3/4] rounded-lg overflow-hidden border-2 snap-center",
                      selectedImageIndex === index ? "border-black" : "border-transparent hover:border-gray-200",
                    )}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Adaa Jaipur Pink Printed Cotton A-Line Straight Kurta</h1>
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
                  <span className="text-2xl font-bold">Rs. 1,999.00</span>
                  <span className="text-sm text-gray-500 line-through">Rs. 2,999.00</span>
                  <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded">33% OFF</span>
                </div>
                <p className="text-sm text-gray-500">Tax included. Shipping calculated at checkout.</p>
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
                  <RadioGroup defaultValue={selectedColor} onValueChange={setSelectedColor} className="flex gap-2 mt-2">
                    {colors.map((color) => (
                      <Label
                        key={color}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                          selectedColor === color ? "border-black" : "border-transparent"
                        }`}
                      >
                        <RadioGroupItem value={color} className="sr-only" />
                        <span className="block w-full h-full rounded-full" style={{ backgroundColor: color }} />
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Quantity Selector */}
                <div>
                  <Label className="text-base">Quantity</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 text-lg h-12">Add to Cart</Button>
                <Button variant="secondary" className="flex-1 text-lg h-12">
                  Buy Now
                </Button>
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
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B29A32F65-986C-4D6C-9FA9-F59A29CACDEF%7D-gh0Fx6Io6ARfqYrKf5RUUO65Z6pXBd.png"
                  alt="Similar Product"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium truncate">Adaa Jaipur Comfort Printed Cotton Shirt</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">Rs. 1,999.00</span>
                  <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded">33% OFF</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

