import { StarRating } from "@/components/components";


function Data({product}) {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">{product.pName}</h1>
        <p>{product.pDescription}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
          <span className="">{product.avgRating}</span>
          <StarRating
            rating={product.avgRating}
            Pcolor="#FFC224"
            Scolor="#202020"
          />
          <span
            className={`flex items-center justify-center gap-1 ${product.reviewCount == 0 ? "hidden" : " "}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="5"
              viewBox="0 0 7 3"
              className="pt-[1px]"
              fill="none"
            >
              <path
                d="M1 0.5L3.5 2.5L6 0.5"
                stroke="#202020"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {product.reviewCount}
          </span>
        </div>
      </div>

      <div className="space-y-1 border-b-2 border-dashed border-[#2020202c] pb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            Rs. {(product.pPrice * (100 - product.pOffer)) / 100}
          </span>
          <span className="text-sm text-gray-500 line-through">
            Rs. {product.pPrice}
          </span>
          <span className="rounded bg-[#72D570] px-1 py-1 text-sm font-medium text-primary">
            {product.pOffer}% Off
          </span>
        </div>
        <p className="text-xs text-primary">
          Tax included. Shipping calculated at checkout.
        </p>
      </div>
    </div>
  );
}

export default Data;
