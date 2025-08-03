import { Button } from "@/components/ui/button";

// function ActionButton({checkOut,addtoCart}) {
//   return (
//     <div className="flex w-full  flex-wrap gap-4">
      
//       <Button
//         variant="primary"
//         className="flex w-1/2 rounded-xl py-0"
//         onClick={(e) => addtoCart(e )}
//       >
//         Add to Cart
//       </Button>

//       <Button
//         variant="accent"
//         className="flex w-1/2 rounded-xl py-0"
//         onClick={checkOut}
//       >
//         Buy Now
//       </Button>
//     </div>
//   );
// }

// export default ActionButton;
function ActionButton({checkOut,addtoCart}) {
  return (
    <div className="flex gap-4 ">
      
      <Button
        variant="secondary"
        size = "xl"
        className="flex w-1/2  "
        onClick={(e) => addtoCart(e )}
      >
        Add to Cart
      </Button>

      <Button
        variant="accent"
        size="xl"
        className="flex w-1/2"
        onClick={checkOut}
      >
        Buy Now
      </Button>
    </div>
  );
}

export default ActionButton;
