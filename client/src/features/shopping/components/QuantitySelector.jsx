import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useSelector } from "react-redux";

 
 
export default function QuantitySelector({ quantity, onIncrease, onDecrease, disabled }) {
  const {quantityUpdateStatus : {loading :isLoading}} = useSelector(state=> state?.shoppingCart)

  return (
    <div className="flex items-center mt-2 text-primary w-fit bg-secondary rounded-lg">
      <Button
        variant="secondary"
        size="icon"
        className="hover:bg-transparent hover:text-gray-400 border-none"
        onClick={onDecrease}
        disabled={disabled }
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="w-12 text-center border-l-2 border-r-2 text-lg">
        {/* {updateQuantityLoad ? "..." :  quantity} */}
        {isLoading ? "..." : quantity}
      </span>
      <Button
        variant="secondary"
        size="icon"
        className="bg-transparent hover:bg-transparent hover:text-gray-400 border-none"
        onClick={onIncrease}
       
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}