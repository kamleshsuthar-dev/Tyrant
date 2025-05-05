import { Card, CardContent } from "@/components/ui/card";
import StarRating from "@/features/reuseable-component/StarRating";
import { useNavigate } from "react-router-dom";
import { ShoppingCartSVG } from "./CommonSVG";

export default function PorductCard({
  product,
  handleShopping = null,
  handleProductPopUp = null,
  variant = "similar",
  categoryP = null,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        key={product._id}
        href={product.href}
        onClick={(e) =>
          variant === "nonSimilar"
            ? handleProductPopUp(e, product)
            : navigate(`/productdetails/${product._id}`, {
                state: { product, categoryP },
              })
        }
        className="group w-fit"
      >
        <Card className="group relative p-4 my-3 flex max-w-[242px] overflow-visible rounded-3xl border-0 shadow-lg  !text-secondary">
          <div className="absolute h-[287px] w-[70%]  bg-accent left-[10px] bottom-0 transition-transform rounded-3xl origin-bottom-left group-hover:rotate-[-20deg] z-0">
            <div
              className="absolute top-5 left-5 rotate-[20deg]"
              onClick={handleShopping}
            >
              <ShoppingCartSVG />
            </div>
          </div>
          <div className="absolute h-full w-full bg-primary top-0 left-0 rounded-3xl z-5"></div>
          <CardContent className="relative z-10 flex flex-col w-[210px] p-0 ">
            <div className="relative w-[212px] h-[180px] mb-3 bg-secondary rounded-2xl group-hover:bg-accent overflow-hidden">
              <div className="absolute w-[1000px] h-[1000px] rounded-lg flex flex-col overflow-clip z-0 translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[200%] w-[1.5px] bg-[#3d3d3d6c] rotate-[31deg]"
                    style={{ marginLeft: `${i * 20}px`, position: "absolute" }}
                  ></div>
                ))}
              </div>

              <img
                alt={product.imageAlt}
                src={product.pImages[0].URL}
                className="z-10 absolute aspect-square mb-[12px] group-hover:scale-[85%] transition-transform scale-75 self-center w-[212px] h-[180px] rounded-lg  object-contain  xl:aspect-[7/8] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]"
              />
            </div>

            <h3 className="text-xl font-bold line-clamp-2">{product.pName}</h3>

            <div className="mt-1 flex items-center gap-1">
              <StarRating
                rating={product.avgRating}
                Pcolor="#9EFF00"
                Scolor="#fff"
              />
              <span
                className={`text-sm  ${
                  product.reviewCount == 0 ? "hidden" : " "
                }`}
              >
                {" "}
                ( {product.reviewCount} )
              </span>
            </div>

            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-light text-[#e2e2e2] line-through">
                  MRP Rs. {product.pPrice}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-md w-[57px] text-center bg-[#FFB524] inline-block px-1 pt-1 pb-[1px] text-xs text-primary">
                  {product.pOffer}% Off
                </div>
                <span className="text-xl font-semibold">
                  Rs.{" "}
                  {Math.floor((product.pPrice * (100 - product.pOffer)) / 100)}
                  <span className="text-sm">
                    .
                    {
                      ((product.pPrice * (100 - product.pOffer)) / 100)
                        .toFixed(2)
                        .split(".")[1]
                    }
                  </span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
