/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./aspect-ratio";
import { cn } from "@/lib/utils";

export default function PhonePreview({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: "blue" | "rose" | "zinc" | "black";
}) {
  const ref = useRef<HTMLImageElement>(null);

  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);

  let caseBackgroundColoor = "bg-zinc-950";
  if (color === "blue") caseBackgroundColoor = "bg-blue-950";
  if (color === "rose") caseBackgroundColoor = "bg-rose-950";
  return (
    <AspectRatio
      ref={ref}
      ratio={3000 / 2001}
      className="relative object-contain"
    >
      <div
        className="absolute inset-0 w-full h-full flex justify-start"
        // style={{
        //   left:
        //     renderedDimensions.width / 2 -
        //     renderedDimensions.width / (1216 / 121),
        //   top: renderedDimensions.height / 6.22,
        // }}
      >
        <div className="w-[40%] h-full  flex-shrink-0" />
        <div className="w-[23.5%] h-full  flex-shrink-0 flex flex-col">
          <div className="h-[15%]  flex-shrink-0" />
          <div className="h-[68%]  flex-shrink-0">
            <img
              //   width={renderedDimensions.width / (3000 / 637)}
              //   className={cn(
              //       " z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
              //       caseBackgroundColoor,
              //       "!"
              //     )}
              className={cn(`w-[90%] h-full rotate-[-11.5deg] rounded-2xl object-cover`, caseBackgroundColoor)}
              src={croppedImageUrl}
            />
          </div>
          {/* <div className="h-[20%]  flex-shrink-0" /> */}
        </div>
        <div className="w-[30%] h-full  flex-shrink-0" />
      </div>

      <div className="relative h-full z-40">
        <img
          src="/images/clearphone.png"
          alt=""
          className="pointer-events-none h-full w-full antialiased rounded-md object-contain"
        />
      </div>
    </AspectRatio>
  );
}
