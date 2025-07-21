/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { colors } from "@/validators/optionValidators";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { DesignConfigType } from "@/types/designConfig";
import Image from "next/image";
import { useState } from "react";
import { Rnd } from "react-rnd";

export default function DesignConfig({
  ImageDimensions,
  configId,
  imageUrl,
}: DesignConfigType) {
  const [options, setOptions] = useState<{ color: (typeof colors)[number] }>({
    color: colors[0],
  
  });
  
  // to save the croped image dimensions and position
    const [renderedDimension, setRenderedDimension] = useState({
    width: ImageDimensions.width/4,
    height: ImageDimensions.height/4
  })
  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  })
  return (
    <div className="relative h-[73.5rem] bg-gray-900/2 overflow-hidden col-span-2 w-full max-w-4xl  flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary  focus: ring-offdet">
      <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
        <AspectRatio
          ratio={896 / 1831}
          className="pointer-events-none relative  z-50 aspect-[896/1831] w-full"
        >
          <Image
            fill
            alt="phone image"
            src="/images/phone-template.png"
            className=" pointer-events-none z-50 select-none"
          />
        </AspectRatio>
        <div className="absolute inset-0 z-40 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.3)]" />
        <div
          className={cn(
            " absolute inset-0  left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
            `bg-${options?.color.tw}`
          )}
        />
      </div>
      <Rnd
        default={{
          x: 150,
          y: 205,
          height: ImageDimensions.height / 4,
          width: ImageDimensions.width / 4,
        }}
        onResizeStop = {(_,__, ref, ___,{x, y}) =>{
          setRenderedDimension({
            height: parseInt(ref.style.height.slice(0, -2)),
            width: parseInt(ref.style.width.slice(0, -2)),
          })
          setRenderedPosition({x, y})
        }}
      ></Rnd>
    </div>
  );
}
