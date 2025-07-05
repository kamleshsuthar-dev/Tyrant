import { GetApi } from "@/features/reuseable-component/ApiCaller";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  // Properly use the API URL

  const [data, error, loading] = GetApi(
    import.meta.env.VITE_ADMIN_GET_ALL_CATEGORY,
    "get category api ",
  );

  useEffect(() => {
    if (data && data.data && data.data.Categories) {
      setCategories(data.data.Categories);
    }
  }, [data]);
  // console.log("Categories:", data.data?.Categories);

  const handleProductList = (id, category) => {
    navigate(`productlist/${id}`, { state: { cName: category.cName, cDescription: category.cDescription }});
  };

  return (
    <>
      <div className="grid h-auto w-full grid-cols-12 gap-x-4 gap-y-6 p-3 [grid-template-rows:repeat(14,minmax(100px,auto))] lg:px-12 lg:py-4">
        <div className="relative col-span-12 row-span-1 flex aspect-[4.61/1] min-h-[content-fit] items-center justify-center overflow-hidden rounded-xl bg-slate-400">
          <img
            src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1746168602/Ad_Section_abm7zv.png"
            alt=""
            className="absolute h-full w-full object-cover"
          />
        </div>
        {loading ? (
          <div className="col-span-12 flex items-center justify-center">
            Loading categories...
          </div>
        ) : error ? (
          <div className="col-span-12 flex items-center justify-center">
            {" "}
            loading categories,{" "}
            <span className="text-red-500"> {error.message}</span>
          </div>
        ) : categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="col-span-4 row-span-1 flex cursor-pointer items-center justify-center rounded-xl"
              onClick={() => handleProductList(category._id, category)}
            >
              <div className="z-10 flex aspect-[1.54/1] w-[75%] items-center justify-center overflow-clip rounded-2xl border-[5px] border-primary">
                <img
                  src={category.cImageURL}
                  alt={category.name || "Category"}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12 flex items-center justify-center">
            No categories found
          </div>
        )}

        <div className="col-span-6 row-span-4 rounded-xl bg-[#696969]" />
        <div className="col-span-2 row-span-4 rounded-xl bg-[#b3f54a]" />
        <div className="col-span-4 row-span-2 rounded-xl bg-[#7d7d7d]" />
        <div className="col-span-2 row-span-2 rounded-xl bg-[#202020]" />
        <div className="col-span-2 row-span-4 rounded-xl bg-[#7ebc1b]" />
        <div className="col-span-4 row-span-2 rounded-xl bg-[#4a6027]" />
        <div className="col-span-6 row-span-2 rounded-xl bg-[#494949]" />
        <div className="col-span-12 row-span-6 rounded-xl bg-[#7ebc1b]" />
      </div>
    </>
  );
}

export default HeroSection;
