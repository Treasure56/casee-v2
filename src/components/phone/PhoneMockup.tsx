/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function PhoneMockup({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const templateSrc = dark
    ? "/images/phone-template-dark-edges.png"
    : "/images/phone-template-white-edges.png";

  return (
    <div className={cn("relative z-50 aspect-[896/1831] w-full select-none pointer-events-none", className)}>
      {/* bezel template overlay */}
      <img
        src={templateSrc}
        alt="Phone bezel"
        className="pointer-events-none select-none h-full w-full absolute inset-0 z-20"
      />
      
      {/* masked container for sliding images */}
      <div 
        className="absolute inset-0 z-10 w-full h-full overflow-hidden"
        style={{
          borderTopRightRadius: "12% 10%",
          borderTopLeftRadius: "12% 10%",
          borderBottomRightRadius: "12% 10%",
          borderBottomLeftRadius: "14% 10%"
        }}
      >
        {children}
      </div>
    </div>
  );
}
