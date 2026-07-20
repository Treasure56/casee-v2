import { formatPrice } from "@/functions/helpers";
import { colors, models, material, finishes } from "@/validators/optionValidators";
import { basePrice } from "@/data/product";
import Link from "next/link";
import PhonePreview from "@/components/ui/PreviewPhone";

interface ThankYouProps {
  configId?: string;
  imageUrl?: string;
  color?: string;
  phoneModel?: string;
  materialValue?: string;
  finishValue?: string;
}

export default function ThankYou({
  configId = "",
  imageUrl = "/images/user1.jpg",
  color = "black-titanium",
  phoneModel = "iphone15",
  materialValue = "silicone",
  finishValue = "smooth",
}: ThankYouProps) {
  // Format details from option validators
  const colorObj = colors.find((c) => c.value === color) || colors[0];
  const modelObj = models.options.find((m) => m.value === phoneModel) || models.options[0];
  const materialObj = material.options.find((m) => m.value === materialValue) || material.options[0];
  const finishObj = finishes.options.find((f) => f.value === finishValue) || finishes.options[0];

  const totalAddonPrice = materialObj.price + finishObj.price;
  const totalPrice = basePrice + totalAddonPrice;

  // Create a display order ID
  const displayOrderId = configId 
    ? `#CS-${configId.slice(-6).toUpperCase()}` 
    : "#CS-DEMO123";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 app-container items-center max-w-6xl mx-auto min-h-[75vh]">
      {/* Left: Phone Preview (Original layout) */}
      <div className="overflow-hidden rounded-xl bg-muted/50 ring-1 ring-border lg:rounded-2xl max-w-md mx-auto w-full">
        <PhonePreview croppedImageUrl={imageUrl} color={color} />
      </div>

      {/* Right: Clean Minimal Receipt */}
      <div className="flex flex-col gap-6 text-left max-w-md w-full mx-auto md:mx-0">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Order Confirmed
          </h1>
          <p className="text-base text-muted-foreground">
            Thank you for your purchase! We have received your custom case design and are beginning production.
          </p>
        </div>

        {/* Dynamic transaction info */}
        <div className="border-t border-border pt-6 flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-semibold text-foreground">
              {displayOrderId}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Device</span>
            <span className="font-medium text-foreground">{modelObj.label}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Specifications</span>
            <span className="font-medium text-foreground">
              {colorObj.label} • {materialObj.label} • {finishObj.label}
            </span>
          </div>

          <div className="border-t border-border/60 pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price</span>
              <span className="text-foreground">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-500 font-medium">Free</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border/40">
              <span className="text-base font-bold text-foreground">Total Paid</span>
              <span className="text-xl font-bold text-brand-secondary">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4">
          <Link
            href="/"
            className="btn btn-primary !py-2.5 !rounded-lg inline-flex items-center justify-center font-bold text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}