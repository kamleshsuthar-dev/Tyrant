import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

function Quantity({ setQuantity,quantity }) {
  return (
    <div>
      <Label className="text-xl">Quantity</Label>
      <div className="mt-2 flex w-fit items-center rounded-lg bg-primary text-secondary">
        <Button
          variant="primary"
          size="icon"
          className="h-8 w-7 border-none bg-transparent hover:bg-transparent hover:text-secondary"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Minus className="h-2 w-2" />
        </Button>
        <span className="w-10 border-l-2 border-r-2 text-center text-sm">
          {quantity}
        </span>
        <Button
          variant="primary"
          size="icon"
          className="h-8 w-7 border-none bg-transparent hover:bg-transparent hover:text-secondary"
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Quantity;
