import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function HeroSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_ADMIN_GET_ALL_CATEGORY}`
        ); // Replace with your actual API endpoint

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data, "hiii");

        setCategories(data.Categories);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories");
        setLoading(false);
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  let handleProductList = (id)=>{
        navigate(`productlist/${id}`)
  }

  return (
    <>
      <div className=" h-[200vh] w-full grid grid-cols-12 grid-rows-12  p-3 gap-3">
        <div className="relative col-span-12 row-span-4 bg-slate-400 rounded-xl flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1739361133037-77be66a4ea6a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="object-cover h-full w-full absolute"
          />
        </div>
        <div className="col-span-5 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center">
          2
        </div>
        <div className="col-span-7 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center">
          3
        </div>
        {/* <div className="col-span-4 row-span-3  bg-slate-400 rounded-xl flex justify-center items-center">4</div>
           <div className="col-span-4 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center">5</div>
           <div className="col-span-4 row-span-3 bg-slate-400 rounded-xl flex justify-center items-center">6</div> */}
        {categories.map((category) => (
          <div
            key={category._id}
            className=" col-span-4 row-span-3  bg-slate-400 rounded-xl flex justify-center items-center"
            onClick={()=>handleProductList(category._id)}
          >
            <div className=" flex justify-center items-center z-10 w-full h-full">
              <img
                src={category.cImageURL}
                alt=""
                className="object-contain h-full w-full  "
              />
            </div>
          </div>
        ))}

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

      <div className="flex justify-center items-center"></div>
    </>
  );
}

export default HeroSection;
