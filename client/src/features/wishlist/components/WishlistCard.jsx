import { StarRating } from "@/components/components";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


function WishlistCard({wishlist , deleteBtn,addToCart,toggleLoading}) {
        const navigate = useNavigate()

     const productDetailFunction = (wishlistID) => {
        console.log(wishlistID);
        navigate(`/productdetails/${wishlistID}`);
     };

    

  return (
    <>
      <div
        key={wishlist?._id}
        className="flex items-center gap-6 rounded-xl border p-4"
      >
        <div
          className="shrink-0"
          onClick={() => productDetailFunction(wishlist?._id)}
        >
          <img
            src={wishlist?.pImages[0].URL}
            alt={wishlist?.pName}
            width={100}
            height={100}
            className="rounded-md"
          />
        </div>

        <div
          className="flex-grow"
          onClick={() => productDetailFunction(wishlist?._id)}
        >
          <h3 className="mb-2 font-medium">{wishlist?.pName}</h3>
          <div className="mb-1 flex items-center gap-1">
            <StarRating
              rating={wishlist.avgRating}
              Pcolor="#FFC224"
              Scolor="#202020"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Status: {wishlist?.pStatus}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-bold">
              Rs.{(wishlist?.pPrice * (100 - wishlist?.pOffer)) / 100}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              Rs.{wishlist?.pPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            className="bg-green-500 text-secondary hover:bg-green-600"
            onClick={() => addToCart(wishlist?._id,wishlist)}
          >
            ADD  CART
          </Button>
          <Button
            onClick={() => deleteBtn(wishlist?._id)}
            variant="destructive"
            disabled={toggleLoading}
          >
              {toggleLoading ? "Deleting..." : "DELETE"} 
          </Button>
        </div>
      </div>
    </>
  );
}

export default WishlistCard;
