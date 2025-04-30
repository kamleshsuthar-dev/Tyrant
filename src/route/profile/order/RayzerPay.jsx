import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
function RayzerPay({profile , amount}) {
    // console.log(JSON.stringify());
    console.log(amount,"fff");
    
    
  const [loading, setLoading] = useState(false);

  const  handlePayment = async ()=>{
    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_PAYMENT_GETEWAY}`, {amount, name:profile.name , email:profile.email ,contact:parseInt(profile.contact) });
      
      const res = data
      if (!res.key_id) {
        throw new Error("Missing key_id in API response");
      }
      if(res.success){
        var options = {
          "key": res.key_id,
          "amount": res.amount,
          "currency": "INR",
          "name": res.name,
          "description": res.description,
          "image": "/razorpay_logo.svg",
          "order_id": res.order_id,
          "handler": function (response){
            alert("Payment Succeeded");
            // window.open("/","_self")
          },
          "prefill": {
            "contact": res.contact,
            "name": res.customerName,
            "email": res.email,
          },
          "notes" : {
            "description": res.description
          },
          "theme": {
            "color": "#202020"
          }
        };
        var razorpayObject =  new Razorpay(options);
        razorpayObject.on('payment.failed', function (response){
            alert("Payment Failed");
        });
        razorpayObject.open();
      } else{
        alert(res.msg);
      }     
      
    } catch (error) {
      console.error("Payment error:", error);
    } 
    finally {
      setLoading(false);
    }
  }

  return (
    <>
   
          <Button onClick={handlePayment} className="w-full bg-lime-400 hover:bg-lime-500 text-black mt-4">
              Proceed To Pay &gt;&gt;
            </Button>
    </>
  )
}

export default RayzerPay