import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { lazy,Suspense } from 'react'

// const ProductDetails = lazy(()=> import('./ProductDetails'))
// import ProductDetail from './ProductDetails'

const ProductDetailsPopUp = forwardRef(({ product }, ref) => {
  console.log("ProductDetailsPopUp",product);
  
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true); // open the drawer on div click
  };

    let navigate = useNavigate();
  const productDetailFunction = (e, product) => {
    e.preventDefault();
    console.log(product._id);
    navigate(`/productdetails/${product._id}`);
    // navigate(`/productdetails/${product._id}`, { replace: true })
  };


  return (
    <>
      <div ref={ref} onClick={handleClick} />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="pb-0 sm:mx-auto max-w-7xl h-[90vh] m-[5vh] rounded-xl overflow-y-auto scrollbar-hide bg-transparent border-none outline-none [&::after]:hidden">
          <div className="absolute h-[165vh] w-full bg-emerald-400">
            <div className="relative h-[80vh] w-full bg-red-400  rounded-xl flex justify-center items-stretch">
              {product.pName}
              <Button   onClick={(e) => productDetailFunction(e, product)} className="absolute bottom-0 ">See More</Button>
            </div>
            <div className="h-[80vh] w-full bg-pink-400  mt-[5vh] rounded-xl">
              {product.pName}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
});

export default ProductDetailsPopUp;
