import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";


function Size({ sizes , addToWishList, wishlistLoading, wishlist ,selectedSize,setSelectedSize  }) {
 



  return (
 
      <div className="!mt-2 space-y-[14px]">
        <Label className="text-xl font-medium ">Size</Label>
        <RadioGroup
          defaultValue={selectedSize}
          onValueChange={setSelectedSize}
          className="mt-2 flex flex-wrap gap-2"
        >
          {sizes.map((size) => (
            <Label
              key={size}
              className={`flex w-[55px] cursor-pointer items-center justify-center rounded-xl  bg-[#42985A] py-[3px] text-sm  ${
                selectedSize === size
                  ? "bg-secondary text-primary"
                  : "bg-primary-contrast "
              }`}
            >
              <RadioGroupItem value={size} className="sr-only" />
              {size}
            </Label>
          ))}
        </RadioGroup>
      </div>
  );
}

export default Size;