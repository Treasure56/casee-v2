import { formatPrice } from "@/functions/helpers";
import { OrderSummaryProps } from "@/types/preview";

export default function OrderSummary({ totalPrice }: OrderSummaryProps) {
  return (
    <div className="border border-border rounded-md p-4">
      <h3 className="text-lg font-semibold">Order Summary</h3>
      <div className="flex justify-between mt-2">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-semibold">{formatPrice(totalPrice)}</span>
      </div>
      <div className="flex justify-between mt-2 text-brand-primary">
        <span className="">Shipping</span>
        <span className="font-semibold">Free</span>
      </div>
      <div className="border-t border-border mt-4 pt-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="font-semibold">{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
