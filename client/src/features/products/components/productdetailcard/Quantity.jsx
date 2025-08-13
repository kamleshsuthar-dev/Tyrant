import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

function Quantity({ setQuantity,quantity }) {
  return (
    <div>
      <Label className="text-xl">Quantity</Label>

      <div className="mt-2 flex  w-24 h-9 items-center rounded-lg bg-secondary text-primary font-medium">
        <Button
          variant="primary"
          // size="icon"
          className="h-8 w-7 border-none bg-transparent hover:bg-transparent hover:text-primary-muted rounded-lg text-primary "
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Minus className="h-2 w-2 font-medium" />
        </Button>
        <span className="w-10 px-3 border-l-2 border-r-2 border-primary text-center text-sm font-medium">
          {quantity}
        </span>
        <Button
          variant="primary"
          // size="icon"
          className="h-8 w-7 border-none bg-transparent hover:bg-transparent hover:text-primary-muted rounded-lg text-primary "
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Quantity;
