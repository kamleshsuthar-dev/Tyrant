import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CouponCode() {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode === "FUCKYOU") {
      alert("Coupon Applied");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">COUPON CODE</h3>
      <input
        type="text"
        placeholder="Enter CODE"
        className="mb-2 w-full rounded-sm text-sm text-black px-2 py-1"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <Button
        variant="accent"
        className="w-full"
        onClick={handleApplyCoupon}
      >
        APPLY COUPON
      </Button>
    </div>
  );
}