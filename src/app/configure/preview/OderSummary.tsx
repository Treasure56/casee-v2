import { formatPrice } from "@/functions/helpers";

export default function OrderSummary() {
    return (
        <div className="border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="flex justify-between mt-2">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-semibold">{formatPrice(14.0)}</span>
            </div>
            <div className="flex justify-between mt-2 text-brand-primary">
                <span className="">Shipping</span>
                <span className="font-semibold">Free</span>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-2">
                <div className="flex justify-between">
                    <span className="text-gray-700">Total</span>
                    <span className="font-semibold">{formatPrice(14.0)}</span>
                </div>
            </div>
        </div>
    );
}