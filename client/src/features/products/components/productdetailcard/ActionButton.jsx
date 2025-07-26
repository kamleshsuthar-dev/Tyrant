import { Button } from "@/components/ui/button";

function ActionButton({checkOut,addtoCart}) {
  return (
    <div className="flex w-full flex-row flex-wrap gap-4">
      {/* <div>
                       <Suspense fallback={<div>Loading...</div>}>
                         <ShoppingCartTopUp ref={popUp} product={product} />
                       </Suspense>
                     </div> */}
      <Button
        variant="primary"
        className="flex w-full rounded-xl py-0"
        onClick={(e) => addtoCart(e )}
      >
        Add to Cart
      </Button>

      <Button
        variant="accent"
        className="flex w-full rounded-xl py-0"
        onClick={checkOut}
      >
        Buy Now
      </Button>
    </div>
  );
}

export default ActionButton;
