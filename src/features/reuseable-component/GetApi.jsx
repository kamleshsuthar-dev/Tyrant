import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'

export function GetApi(api,konsiApi) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    // console.log(api);
    
    useEffect(()=>{
        const fetchData = async () => {
            if(!api)  return ;

            try {
              setLoading(true);
              setError(false);
              const res = await axios.get(`${api}`);
              console.log(res);
              setItems(res);
              setLoading(false);
            } catch (error) {
              console.log(konsiApi, error);
              setLoading(false);
              setError(error);
            }
          }

          if(api){
            fetchData()
          }
    },[api])

    return [items,error,loading]
  
}




function Wraper ({dataXML,errorXML}) {
  return (
    <div>
          {loading ? (
          <div className="col-span-12 flex justify-center items-center">Loading categories...</div>
        ) : error ? (
          <div className="col-span-12 flex justify-center items-center "> loading categories, <span className="text-red-500"> {error}</span></div>
        ) : (
          categories && categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="col-span-4 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center cursor-pointer"
                onClick={() => handleProductList(category._id)}
              >
                <div className="flex justify-center items-center z-10 w-full h-full">
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
    </div>
  )
}

export default Wraper






