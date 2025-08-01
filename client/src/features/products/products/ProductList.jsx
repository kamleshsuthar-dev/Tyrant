import { useEffect, useRef, useState,useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useShoppingPopUp } from "@/context/ShoppingPopUpContext";
import ProductListSkeleton from "@/components/skeleton/ProductListSkeleton";


import {GetApi } from "@/components/components/index"
import {ProductDetailPopUp , ProductCard} from "@/features/products"
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProduct } from "@/store/action/productAction";



export default function ProductList() {
  const location = useLocation();
  const dispatch =useDispatch()
  const {productItems : products , fetchCPStatus :{loading , error}} = useSelector(state=>state?.product)
  const { cName, cDescription } = location?.state || {
    cName: "Ram",
    cDescription: "Shyam",
  };

 console.log(products,"fffdfdf");
 
  const { cId } = useParams();
  const [currentProduct, setCurrentProduct] = useState([]);
  const popUp = useRef(null);
  const productPopUp = useRef(null);
  const { showCartPopup } = useShoppingPopUp();
  
  // const [products, setProducts] = useState([]);
  // const apiUrl = useMemo(() => {
  //   return `${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`;
  // }, [cId]);

  // const [data, error, loading] = GetApi(apiUrl, "get product by category api");
  
  // useEffect(() => {
    //   if (data && data.data &&data.data.products &&JSON.stringify(data.data.products) !== JSON.stringify(products)) {
      //     setProducts(data.data.products);
      //   }
      // }, [data]);
      
  useEffect(()=>{
    dispatch(fetchCategoryProduct(cId))
  },[])
      
  function handleShopping(e, product) {
    e.preventDefault();
    e.stopPropagation();
    showCartPopup(product);
    popUp.current.click();
  }

  function handleProductPopUp(e, product) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentProduct(product);
    productPopUp.current.click();
  }

  if (loading) return <ProductListSkeleton />;
  else
    return (
      <div className="bg-primary">
        <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="relative flex items-center justify-center rounded-lg bg-slate-100 p-2 text-4xl font-extrabold">
            {cName} {" :"}&nbsp;{" "}
            <span className="text-2xl"> {cDescription}</span>
          </h2>

          <div className="grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              <div className="col-span-12 flex items-center justify-center">
                Loading Products...
              </div>
            ) : error ? (
              <div className="col-span-12 flex text-red-500 items-center justify-center my-auto h-96 text-3xl">
                {" "}
                  {error} 
               
              
              </div>
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <div key={product._id}>
                  <ProductCard
                    variant="nonSimilar"
                    product={product}
                    handleShopping={(e) => handleShopping(e, product)}
                    handleProductPopUp={(e) => {
                      handleProductPopUp(e, product);
                    }}
                  />
                </div>
              ))
            ) : (
              <>
                <h1 className="absolute my-32 w-full text-center text-2xl">
                  || There is no products in category
                </h1>
              </>
            )}
          </div>
        </div>

        <ProductDetailPopUp
          ref={productPopUp}
          product={currentProduct}
          cId={cId}
        />
      </div>
    );
}
