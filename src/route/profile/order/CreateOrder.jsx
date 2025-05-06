import { Button } from "@/components/ui/button";
import axios from "axios";

function CreateOrder({
  profile,
  Tamount,
  cartItems,
  addressId,
  paymentMethod,
  isPaid,
}) {
  // console.log("cooo",JSON.stringify(profile));
  // console.log("cooo",JSON.stringify(cartItems));
  // console.log("cooo",JSON.stringify(addressId._id));
  // console.log("cooo",JSON.stringify(Tamount));

  const handleOrder = async () => {
    try {
      let res = await axios.post(`${import.meta.env.VITE_CREATE_ORDER}`, {
        cartItems,
        addressId,
        paymentMethod,
        totalAmount: Tamount,
        isPaid,
      });

      //   console.log(res,"cod");
      if (res.data.success) {
        alert("order success done");
        window.location.reload();
      } else {
        alert("Kuch Toh Gabad Hai Daya!!");
      }
    } catch (error) {
      console.log(error, "cod");
    }
  };

  return (
    <div>
      <Button
        onClick={handleOrder}
        className="w-full bg-lime-400 hover:bg-lime-500 text-primary mt-4 capitalize"
      >
        cash-on-delivery &gt;&gt;
      </Button>
    </div>
  );
}

export default CreateOrder;
