/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { AspectRatio } from "./aspect-ratio";
import { cn } from "@/lib/utils";

export default function PhonePreview({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    "black-titanium": "bg-zinc-900",
    "zinc": "bg-zinc-900",
    "black": "bg-zinc-900",
    "white-titanium": "bg-zinc-100",
    "blue-titanium": "bg-blue-950",
    "blue": "bg-blue-950",
    "natural-titanium": "bg-stone-300",
    "pink": "bg-rose-200",
    "rose": "bg-rose-200",
    "forest-green": "bg-emerald-900",
    "lilac-purple": "bg-violet-300",
    "deep-burgundy": "bg-red-900",
  };

  const caseBackgroundColoor = colorMap[color] || "bg-zinc-950";
  return (
    <AspectRatio
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
