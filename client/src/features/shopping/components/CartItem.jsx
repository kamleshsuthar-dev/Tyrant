import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import DeleteBtn from "../../../components/home/DeleteBtn.jsx";
import QuantitySelector from "./QuantitySelector.jsx"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export function CartItem({ 
  cartItem, 
  isChecked, 
  onCheckboxChange, 
  onUpdateQuantity, 
  onDelete,
  isMobile = false ,
 
}) {
  const navigate = useNavigate()
  const handleGoToDetail = (id)=>{
    console.log("hello");
    
      navigate(`/productdetails/${id}`)
  }
  

  if (isMobile) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex item-center justify-center">
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => onCheckboxChange(cartItem._id)}
              />
            </div>
            <img
              src={cartItem.productId?.pImages[0].URL || "/placeholder.svg"}
              alt={cartItem.name}
              width={80}
              height={80}
              className="object-cover"
              onClick={()=>handleGoToDetail(cartItem.productId?._id)}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {cartItem.productId?.pName}
              </h3>
              <div className="text-sm text-muted-foreground">
                Color:{" "}
                <div
                  className="h-3 w-3 inline-block rounded-sm"
                  style={{ backgroundColor: cartItem.variant.color }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Size: {cartItem.variant.size || "red"}
              </p>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <div className="line-through text-gray-400 text-xs">
                    Rs. {cartItem.productId?.pPrice.toFixed(2)}
                  </div>
                  <div>
                    Rs.
                    {(
                      (cartItem.productId?.pPrice *
                        (100 - cartItem.productId?.pOffer)) /
                      100
                    ).toFixed(2)}
                  </div>
                </div>
                <div className="relative">
                  <QuantitySelector
                    quantity={cartItem.quantity}
                    onIncrease={() => onUpdateQuantity(cartItem, cartItem.quantity + 1)}
                    onDecrease={() => onUpdateQuantity(cartItem, cartItem.quantity - 1)}
                    disabled={cartItem.quantity <= 1}
                  />
                  <div
                    className="absolute top-[-4.5rem] right-8 h-12 w-9 bg-[#FF1010] rounded-md flex justify-center items-center cursor-pointer"
                    onClick={() => onDelete(cartItem._id)}
                  >
                    <DeleteBtn />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 items-center mb-4 border-b pb-4 relative">
      <div className="flex gap-4">
        <div className="relative top-8">
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => onCheckboxChange(cartItem._id)}
          />
        </div>
       
        <img
          src={cartItem.productId?.pImages[0].URL || "/placeholder.svg"}
          alt={cartItem.name}
          width={80}
          height={80}
          className="object-cover "
          onClick={()=>handleGoToDetail(cartItem.productId?._id)}
        />
       
        <div>
          <h3 className="text-lg font-semibold">
            {cartItem.productId?.pName}
          </h3>
          <div className="text-sm text-muted-foreground">
            Color:{" "}
            <div
              className="h-3 w-3 inline-block rounded-sm"
              style={{ backgroundColor: cartItem.variant.color }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground">
            Size: {cartItem.variant.size || "red"}
          </p>
        </div>
      </div>
      <div>
        <div className="line-through text-gray-400 text-xs">
          Rs. {cartItem.productId?.pPrice.toFixed(2)}
        </div>
        <div>
          Rs.
          {(
            (cartItem.productId?.pPrice *
              (100 - cartItem.productId?.pOffer)) /
            100
          ).toFixed(2)}
        </div>
      </div>
      <div>
        <QuantitySelector
          quantity={cartItem.quantity}
          onIncrease={() => onUpdateQuantity(cartItem, cartItem.quantity + 1)}
          onDecrease={() => onUpdateQuantity(cartItem, cartItem.quantity - 1)}
          disabled={cartItem.quantity <= 1}
         
        />
      </div>
      <div>
        Rs.{" "}
        {(
          ((cartItem.productId?.pPrice *
            (100 - cartItem.productId?.pOffer)) /
            100) *
          cartItem.quantity
        ).toFixed(2)}
      </div>
      <div
        className="absolute right-0 top-5 h-12 w-9 bg-[#FF1010] rounded-md flex justify-center items-center cursor-pointer"
        onClick={() => onDelete(cartItem._id)}
      >
        <DeleteBtn />
      </div>
    </div>
  );
}   


