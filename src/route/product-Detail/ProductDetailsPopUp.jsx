  import React from 'react'
  import {
      Drawer,
      DrawerClose,
      DrawerContent,
      DrawerDescription,
      DrawerFooter,
      DrawerHeader,
      DrawerTitle,
      DrawerTrigger,
    } from "@/components/ui/drawer"
    import { Button } from '@mui/material'
  // import { lazy,Suspense } from 'react'

  // const ProductDetails = lazy(()=> import('./ProductDetails'))
  import ProductDetail from './product-Detail/ProductDetails'

  function ProductDetailsPopUp() {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
      <Drawer>
    <DrawerTrigger >Open</DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
              {/* <Suspense fallback={<h1>fuck you</h1>}>
                  <ProductDetails/>
              </Suspense> */}
              <ProductDetail />
      </DrawerHeader>
      <DrawerFooter>
          <h1>footer</h1>
        {/* <Button>Submit</Button>
        <DrawerClose>
          <Button variant="outline">Cancel</Button>
        </DrawerClose> */}
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
      <Drawer>
    <DrawerTrigger >Open</DrawerTrigger>
    <DrawerContent>
      
    </DrawerContent>
  </Drawer>

      </div>
    )
  }

  export default ProductDetailsPopUp
