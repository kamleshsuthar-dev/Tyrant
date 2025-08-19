import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CouponCode } from "./CouponCode";

export function OrderSummary({
  subtotal,
  shipping = "FREE",
  discount = 0.0,
  tax,
  total,
  onCheckout
}) {
  return (
    <Card className="bg-primary text-secondary m-5 lg:m-0">
      <CardContent className="lg:p-6 px-12 py-8 flex flex-col ">
        <h2 className="text-lg font-bold mb-4">CARD TOTALS</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs.{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-accent">{shipping}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>Rs.{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>Rs.{tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rs.{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <Button
          variant="accent"
          className="lg:w-full   mt-4"
          onClick={onCheckout}
        >
          CHECKOUT &gt;&gt;
        </Button>
        {/* <CouponCode /> */}
      </CardContent>
    </Card>
  );
}