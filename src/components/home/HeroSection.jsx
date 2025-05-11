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
  console.log("Categories:", data.data?.Categories);

  const handleProductList = (id, category) => {
    // console.log();

    navigate(`productlist/${id}`, {
      state: { cName: category.cName, cDescription: category.cDescription },
    });
    // Navigate(<HomeProduct path=''/>)
    // <HomeProduct/>
  };

  return (
    <>
      <div className="h-auto w-full grid grid-cols-12 [grid-template-rows:repeat(14,minmax(100px,auto))] p-3 lg:py-4 lg:px-12 gap-y-6 gap-x-4">
        <div className="min-h-[content-fit] relative col-span-12 row-span-1 overflow-hidden aspect-[4.61/1] bg-slate-400 rounded-xl flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/dzzs9yjcf/image/upload/v1746168602/Ad_Section_abm7zv.png"
            alt=""
            className="object-cover h-full w-full absolute"
          />
        </div>
        {loading ? (
          <div className="col-span-12 flex justify-center items-center">
            Loading categories...
          </div>
        ) : error ? (
          <div className="col-span-12 flex justify-center items-center ">
            {" "}
            loading categories,{" "}
            <span className="text-red-500"> {error.message}</span>
          </div>
        ) : categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="col-span-4 row-span-1 rounded-xl flex justify-center items-center cursor-pointer "
              onClick={() => handleProductList(category._id, category)}
            >
              <div className="flex justify-center items-center z-10 w-[75%] aspect-[1.54/1] border-[5px] border-primary rounded-2xl overflow-clip">
                <img
                  src={category.cImageURL}
                  alt={category.name || "Category"}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12 flex justify-center items-center">
            No categories found
          </div>
        )}

        <div className="col-span-6 row-span-4 bg-[#696969] rounded-xl" />
        <div className="col-span-2 row-span-4 bg-[#b3f54a] rounded-xl" />
        <div className="col-span-4 row-span-2 bg-[#7d7d7d] rounded-xl" />
        <div className="col-span-2 row-span-2 bg-[#202020] rounded-xl " />
        <div className="col-span-2 row-span-4 bg-[#7ebc1b] rounded-xl" />
        <div className="col-span-4 row-span-2 bg-[#4a6027] rounded-xl" />
        <div className="col-span-6 row-span-2 bg-[#494949] rounded-xl" />
        <div className="col-span-12 row-span-6 bg-[#7ebc1b] rounded-xl" />
      </div>
    </>
  );
}

export default HeroSection;
