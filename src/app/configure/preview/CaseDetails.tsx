"use client";
import { formatPrice } from "@/functions/helpers";
import { LucideCheckCircle } from "lucide-react";
import CaseFeatures from "./CaseFeatures";
import OrderSummary from "./OderSummary";
import { LuArrowRight } from "react-icons/lu";
import Confetti, { ConfettiConfig } from 'react-dom-confetti'
import { useEffect, useState } from "react";

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
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};


export default function CaseDetails() {
     const [showConfetti, setShowConfetti] = useState<boolean>(false);
     useEffect(() =>{
        const timer = setTimeout(() => {
            setShowConfetti(true);
        }, 1000); 

        return () => clearTimeout(timer); 
     },[showConfetti]);
  return (
   <>
   <div aria-hidden className="pointer-event-none select-none absolute inset-0 overflow-hidden flex justify-center">
    <Confetti active={showConfetti} config={config as ConfettiConfig} />
   </div>
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold tracking-tight text-gray-800">
        Your iphone 12 Case
      </h3>
      <p className="bg-brand-primary/10 rounded-3xl px-3 py-1 inline-flex gap-2 items-center text-brand-primary self-start">
        <LucideCheckCircle className="h-5 w-5" />
        Available now and ships immediately
      </p>
      <div className="border border-gray-200 flex flex-col gap-4 p-4 rounded-md">
        <div className="flex items-center gap-2">
          <p className="text-3xl text-gray-800 font-bold">
            {formatPrice(14.0)}
          </p>
          <div className="flex mt-2 gap-2 items-center">
            <p className="text-base text-gray-500 line-through">
              {formatPrice(19.99)}
            </p>
            <p className="text-sm text-white bg-red-500 font-semibold rounded-3xl px-3 py-1">
              20% Off
            </p>
          </div>
        </div>
        <p className="text-base text-gray-500">
          Free shipping on orders over $25
        </p>
      </div>
      <CaseFeatures />
      <OrderSummary />
      <div className="flex justify-end">
        <button className="btn btn-primary !py-3 !rounded-md w-full md:w-auto">
          Check Out
          <LuArrowRight />
        </button>
      </div>
    </div>
   </>
  );
}
