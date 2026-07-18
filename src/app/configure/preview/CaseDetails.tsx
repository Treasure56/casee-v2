"use client";

import { formatPrice } from "@/functions/helpers";
import { LucideCheckCircle } from "lucide-react";
import CaseFeatures from "./CaseFeatures";
import OrderSummary from "./OderSummary";
import { LuArrowRight } from "react-icons/lu";
import Confetti, { ConfettiConfig } from "react-dom-confetti";
import { useEffect, useState } from "react";
import { colors, models, material, finishes } from "@/validators/optionValidators";
import { basePrice } from "@/data/product";
import { useRouter } from "next/navigation";
import { CaseDetailsProps } from "@/types/preview";

const config = {
  angle: 90, // shoot straight up
  spread: 360, // spread in all directions
  startVelocity: 45, // initial speed
  elementCount: 120, // reasonable particle count
  dragFriction: 0.1, // slows the particles down
  duration: 3000, // in ms
  stagger: 2, // delay between particles
  width: "8px",
  height: "8px",
  perspective: "700px", // makes the 3D effect deeper
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};



export default function CaseDetails({
  configId,
  colorValue,
  modelValue,
  materialValue,
  finishValue,
}: CaseDetailsProps) {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showConfetti]);

  const colorObj = colors.find((c) => c.value === colorValue) || colors[0];
  const modelObj = models.options.find((m) => m.value === modelValue) || models.options[0];
  const materialObj = material.options.find((m) => m.value === materialValue) || material.options[0];
  const finishObj = finishes.options.find((f) => f.value === finishValue) || finishes.options[0];

  const totalPrice = basePrice + materialObj.price + finishObj.price;

  const handleCheckout = () => {
    // Redirect to thank-you success page
    window.location.href = "/thank-you";
  };

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti active={showConfetti} config={config as ConfettiConfig} />
      </div>
      <div className="flex flex-col gap-4 text-start">
        <h3 className="text-3xl font-bold tracking-tight text-foreground">
          Your {modelObj.label} Case
        </h3>
        <p className="bg-brand-secondary/10 rounded-3xl px-3 py-1 inline-flex gap-2 items-center text-brand-secondary self-start">
          <LucideCheckCircle className="h-5 w-5" />
          Available now and ships immediately
        </p>
        <div className="border border-border flex flex-col gap-4 p-4 rounded-md">
          <div className="flex items-center gap-2">
            <p className="text-3xl text-foreground font-bold">
              {formatPrice(totalPrice)}
            </p>
            <div className="flex mt-2 gap-2 items-center">
              <p className="text-base text-muted-foreground line-through">
                {formatPrice(totalPrice + 5.99)}
              </p>
              <p className="text-sm text-white bg-red-500 font-semibold rounded-3xl px-3 py-1">
                20% Off
              </p>
            </div>
          </div>
          <p className="text-base text-muted-foreground">
            Free shipping on orders over $25
          </p>
        </div>
        <CaseFeatures />
        <OrderSummary totalPrice={totalPrice} />
        <div className="flex justify-end mt-6">
          <button 
            onClick={handleCheckout}
            className="btn btn-primary !py-3 !rounded-md w-full md:w-auto cursor-pointer flex items-center justify-center gap-1.5"
          >
            Check Out
            <LuArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
