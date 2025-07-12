import { Card, CardContent } from "@/components/ui/card";
import {StarRating} from "@/components/components/";
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
        <Card className="group relative my-3 flex max-w-[242px] overflow-visible rounded-3xl border-0 p-4 !text-secondary shadow-lg">
          <div className="absolute bottom-0 left-[10px] z-0 h-[287px] w-[70%] origin-bottom-left rounded-3xl bg-accent transition-transform group-hover:rotate-[-20deg]">
            <div
              className="absolute left-5 top-5 rotate-[20deg]"
              onClick={handleShopping}
            >
              <ShoppingCartSVG />
            </div>
          </div>
          <div className="z-5 absolute left-0 top-0 h-full w-full rounded-3xl bg-primary"></div>
          <CardContent className="relative z-10 flex w-[210px] flex-col p-0">
            <div className="relative mb-3 h-[180px] w-[212px] overflow-hidden rounded-2xl bg-secondary group-hover:bg-accent">
              <div className="absolute left-[50%] top-[50%] z-0 flex h-[1000px] w-[1000px] translate-x-[-50%] translate-y-[-50%] flex-col overflow-clip rounded-lg">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[200%] w-[1.5px] rotate-[31deg] bg-[#3d3d3d6c]"
                    style={{ marginLeft: `${i * 20}px`, position: "absolute" }}
                  ></div>
                ))}
              </div>

              <img
                alt={product.imageAlt}
                src={product.pImages[0].URL}
                className="absolute left-[50%] top-[50%] z-10 mb-[12px] aspect-square h-[180px] w-[212px] translate-x-[-50%] translate-y-[-50%] scale-75 self-center rounded-lg object-contain transition-transform group-hover:scale-[85%] xl:aspect-[7/8]"
              />
            </div>

            <h3 className="line-clamp-2 text-xl font-bold">{product.pName}</h3>

            <div className="mt-1 flex items-center gap-1">
              <StarRating
                rating={product.avgRating}
                Pcolor="#9EFF00"
                Scolor="#fff"
              />
              <span
                className={`text-sm ${
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
                <div className="inline-block w-[57px] rounded-md bg-[#FFB524] px-1 pb-[1px] pt-1 text-center text-xs text-primary">
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
