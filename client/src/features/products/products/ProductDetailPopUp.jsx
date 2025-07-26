import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {GetApi}from "@/components/components"
import { ProductDetailCard ,ProductCard}from "@/features/products"

const ProductDetailPopUp = forwardRef(({ product, cId }, ref) => {
  console.log("ProductDetailsPopUp", product, cId);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true); // open the drawer on div click
  };

  // category similar products
  const [categoryP, setCategoryP] = useState();
  const [categoryData, categoryError, categoryLoading] = GetApi(
    `${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`,
    "get product by category api",
  );

  useEffect(() => {
    if (categoryData?.data?.products) {
      setCategoryP(categoryData.data.products);
    }
  }, [categoryData]);

  let navigate = useNavigate();
  const productDetailFunction = (e, product) => {
    e.preventDefault();
    console.log(categoryP);
    console.log(product._id);
    navigate(`/productdetails/${product._id}`, {
      state: { product, categoryP },
    });
    // navigate(`/productdetails/${product._id}`, { replace: true })
  };

  return (
    <>
      <div ref={ref} onClick={handleClick} />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="scrollbar-hide mt-5vh mx-[5vh] h-[90vh] max-w-7xl overflow-y-auto rounded-t-xl border-none bg-transparent pb-0 outline-none sm:mx-auto [&::after]:hidden">
          <DrawerHeader>
            <VisuallyHidden>
              <DrawerTitle>Product Details</DrawerTitle>
              <DrawerDescription>
                View and interact with product information in detail.
              </DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>

          <div className="absolute h-auto w-full pb-[5vh]">
            <div className="relative flex h-[80vh] w-full flex-col items-stretch justify-center overflow-clip rounded-3xl border-[3px] border-primary bg-secondary">
              {/* {product.pName}
                <Button   onClick={(e) => productDetailFunction(e, product)} className="absolute bottom-0 ">See More</Button> */}
              <div className="pb-10">
                <ProductDetailCard pId={product._id} />
              </div>

              <Button
                onClick={(e) => productDetailFunction(e, product)}
                className="absolute inset-x-0 bottom-0 max-h-10 rounded-none border-t-2 border-dashed border-primary bg-secondary text-primary hover:bg-gray-200"
              >
                See More
              </Button>
            </div>
            <div
              id="similarProductSection"
              className="mt-[5vh] flex h-auto w-full justify-center rounded-3xl border-[3px] border-primary bg-secondary"
            >
              <div className="grid-cols-auto m-4 grid w-full items-center justify-items-center md:grid-cols-4">
                {categoryP && categoryP.length > 0 ? (
                  <>
                    {categoryP.map((p) => (
                      <ProductCard
                        product={p}
                        categoryP={categoryP}
                        variant="similar"
                      />
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
});

export default ProductDetailPopUp;
