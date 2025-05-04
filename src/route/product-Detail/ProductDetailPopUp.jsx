  import { Button } from "@/components/ui/button";
  import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer";
  import { GetApi } from "@/features/reuseable-component/ApiCaller";
  import PorductCard from "@/features/reuseable-component/PorductCard";
  import ProductDetailCard from "@/features/reuseable-component/ProductDetailCard";
  import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
  import { useEffect } from "react";
  import { forwardRef, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";

  const ProductDetailsPopUp = forwardRef(({ product ,cId}, ref) => {
    console.log("ProductDetailsPopUp", product , cId);

    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(true); // open the drawer on div click
    };

      // category similar products 
    const [categoryP, setCategoryP] = useState();
    const [categoryData, categoryError, categoryLoading] = GetApi( `${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`,"get product by category api", );

    useEffect(() => {
      if (categoryData?.data?.products) {
        setCategoryP(categoryData.data.products);
      }
    }, [categoryData]);


    let navigate = useNavigate();
    const productDetailFunction = (e, product) => { 
      e.preventDefault();
      console.log(categoryP)
      console.log(product._id);
      navigate(`/productdetails/${product._id}` , {state :{ product , categoryP}});
      // navigate(`/productdetails/${product._id}`, { replace: true })
    };

    return (
      <>
        <div ref={ref} onClick={handleClick} />
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="scrollbar-hide m-[5vh] h-[90vh] max-w-7xl overflow-y-auto rounded-xl border-none bg-transparent pb-0 outline-none sm:mx-auto [&::after]:hidden">
            <DrawerHeader>
              <VisuallyHidden>
                <DrawerTitle>Product Details</DrawerTitle>
                <DrawerDescription>
                  View and interact with product information in detail.
                </DrawerDescription>
              </VisuallyHidden>
            </DrawerHeader>

            <div className="absolute h-[165vh] w-full bg-emerald-400">
              <div className="relative flex h-[80vh] w-full items-stretch justify-center rounded-xl bg-red-400  overflow-scroll ">
                {/* {product.pName}
                <Button   onClick={(e) => productDetailFunction(e, product)} className="absolute bottom-0 ">See More</Button> */}
                <ProductDetailCard pId={product._id} />
                <Button
                  onClick={(e) => productDetailFunction(e, product)}
                  className="absolute bottom-[-60px] "
                >
                  See More
                </Button>
              </div>
              <div className="mt-[5vh] h-[80vh] w-full flex justify-center  rounded-xl bg-pink-400">
                <div className="grid-cols-auto mt-4 grid gap-4 md:grid-cols-4">
                  {categoryP && categoryP.length > 0 ? (
                    <>
                      {categoryP.map((p) => (
                        <PorductCard product={p} categoryP={categoryP} variant="similar" />
                      
                      ))}
                    </>
                  ) : (
                    <>
                    
                    </>
                  )}
                </div>

              
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  });

  export default ProductDetailsPopUp;
