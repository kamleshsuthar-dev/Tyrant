import React, { useEffect, useState } from "react";
import { useNavigate ,Navigate} from "react-router-dom";
import { GetApi } from "@/features/reuseable-component/ApiCaller";
import HomeProduct from '@/features/reuseable-component/PorductCard'

function HeroSection() {
  const navigate = useNavigate();
  const [categories , setCategories] = useState()
  // Properly use the API URL

  const [data, error, loading] = GetApi(import.meta.env.VITE_ADMIN_GET_ALL_CATEGORY ,"get category api ");
  useEffect(()=>{
    if (data && data.data && data.data.Categories) {
      setCategories(data.data.Categories);
    }
  },[data])
  console.log("Categories:", data.data?.Categories);
  

  const handleProductList = (id,category) => {
    // console.log();
    
    navigate(`productlist/${id}` ,{state:{cName :category.cName, cDescription : category.cDescription}});
    // Navigate(<HomeProduct path=''/>)
    // <HomeProduct/>
  };

  return (
    <>
      <div className="h-[200vh] w-full grid grid-cols-12 [grid-template-rows:repeat(12,minmax(0,min-content))] p-3 gap-3">
        <div className="relative col-span-12 row-span-1 overflow-hidden aspect-[4.61/1] bg-slate-400 rounded-xl flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1746168602/Ad_Section_abm7zv.png"
            alt=""
            className="object-cover h-full w-full absolute"
          />
        </div>
        {/* <div className="col-span-5 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center">
          2
        </div>
        <div className="col-span-7 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center">
          3
        </div> */}
        
        {loading ? (
          <div className="col-span-12 flex justify-center items-center">Loading categories...</div>
        ) : error ? (
          <div className="col-span-12 flex justify-center items-center "> loading categories, <span className="text-red-500"> {error.message}</span></div>
        ) : (
          categories && categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="col-span-4 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center cursor-pointer"
                onClick={() => handleProductList(category._id , category)}
              >
                <div className="flex justify-center items-center z-10 w-[50%] h-full">
                  <img
                    src={category.cImageURL}
                    alt={category.name || "Category"}
                    className="object-contain h-full w-full"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-12 flex justify-center items-center">No categories found</div>
          )
        )}

        <div className="col-span-4 row-span-2 bg-slate-400 rounded-xl flex justify-center items-center">
          7
        </div>
        <div className="col-span-4 row-span-2 bg-slate-400 rounded-xl flex justify-center items-center">
          8
        </div>
        <div className="col-span-4 row-span-2 bg-slate-400 rounded-xl flex justify-center items-center">
          9
        </div>
      </div>
    </>
  );
}

export default HeroSection;