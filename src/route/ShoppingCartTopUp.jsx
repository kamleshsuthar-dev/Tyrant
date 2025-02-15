"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

 const ShoppingCartTopUp= forwardRef((props,ref)=> {
  
  
  const [isOpen, setIsOpen] = useState(false);
  const [items] = useState([
    {
      id: 1,
      name: "Floral Print Kurta Set",
      price: 129.5,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7BC06A71B7-4076-4D41-8FA1-01B098E71F15%7D-zIxMpmdJd5Mb8LIJ1ORTkh4dczZqkW.png",
    },
  
 
  ]);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)

  const addToCart = () => {
    setIsOpen(true)
    // Auto close after 3 seconds
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  return (
    <div>
      <Button onClick={addToCart} ref={ref} className="hidden">
       
        Add to Cart
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-50 transition-opacity" onClick={() => setIsOpen(false)} />
          <div className="fixed bottom-4 right-4 z-50 w-full max-w-md animate-slide-up">
            <div className="bg-background rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex  justify-center relative items-center mb-4">
                  <h2 className="text-2xl text-center  font-semibold">Cart</h2>
                  <button onClick={() => setIsOpen(false)} className="text-muted-foreground absolute top-2 right-2 hover:text-foreground">
                    X
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm">
                    Item Has Been Added Successfully
                  </div>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-16 w-16 bg-muted rounded-md overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <div className="text-sm text-muted-foreground mt-1">${item.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <div className="font-medium">SUBTOTAL</div>
                    <div className="font-medium">${subtotal.toFixed(2)}</div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full">CHECK OUT</Button>
                    <NavLink to='/shoppingcart'>
                      <Button variant="outline" className="w-full">
                        View Cart
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
})

export default ShoppingCartTopUp;