"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"



const items = [
  {
    title: "Product Description",
    content:
      "Roberto cavalli paradiso was designed to enhance the joie de vivre. An uplifting and stimulating fragrance, it radiates delight and happiness. A resounding ode to sensuality and seduction, it encourages us to seize the moment and fully enjoy the pleasures of this earthly paradise.",
  },
  {
    title: "Care & Materials",
    content:
      "Made with premium materials that require gentle care. Hand wash only with mild detergent. Do not bleach. Lay flat to dry.",
  },
  {
    title: "Size & Fit",
    content: "Regular fit. Model is wearing size M. See size guide for detailed measurements.",
  },
  {
    title: "Product Information",
    content: "SKU: RC2024-001. Made in Italy. Composition: 100% premium materials.",
  },
]

export default function ProductDesciption() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border-b border-dashed border-gray-200">
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="flex justify-between items-center w-full py-4 text-left"
            aria-expanded={openIndex === index}
            aria-controls={`content-${index}`}
          >
            <h2 className="text-xl font-medium">{item.title}</h2>
            <span className="flex items-center justify-center h-6 w-6">
              {openIndex === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </span>
          </button>
          <div
            id={`content-${index}`}
            role="region"
            className={cn(
              "grid transition-all duration-200",
              openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <p className="pb-4 text-gray-600">{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


