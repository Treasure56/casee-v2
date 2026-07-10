/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type PhoneProps = HTMLAttributes<HTMLDivElement> & {
  imgSrc: string;
  dark?: boolean;
};

export default function Phone({ imgSrc, className, dark = false, ...props }: PhoneProps) {
  const templateSrc = dark
    ? "/images/phone-template-dark-edges.png"
    : "/images/phone-template-white-edges.png";

  return (
    <div
      className={cn("relative pointer-events-none z-50 overflow-hidden", className)}
      style={{
        borderTopRightRadius: "12% 10%",
        borderTopLeftRadius: "12% 10%",
        borderBottomRightRadius: "12% 10%",
        borderBottomLeftRadius: "14% 10%",
      }}
      {...props}
    >
      <img
        src={templateSrc}
        alt=""
        className="pointer-events-none select-none"
      />
      <img
        src={imgSrc}
        alt="overlaying phone image"
        className="absolute inset-0 -z-10 w-full h-full object-cover"
      />
    </div>
  );
}
