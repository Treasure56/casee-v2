"use client";

import { colors } from "@/validators/optionValidators";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Rnd } from "react-rnd";

type DesignConfigProps = {
  imageUrl: string;
  imageDimensions: { width: number; height: number };
  color: (typeof colors)[number];
  renderedDimension: { width: number; height: number };
  setRenderedDimension: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  renderedPosition: { x: number; y: number };
  setRenderedPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
};

export default function DesignConfig({
  imageUrl,
  imageDimensions,
  color,
  renderedDimension,
  setRenderedDimension,
  renderedPosition,
  setRenderedPosition,
}: DesignConfigProps) {
  return (
    <div className="relative h-[73.5rem] bg-muted/50 overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
      
      {/* Phone Case Canvas Overlay */}
      <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
        <AspectRatio
          ratio={896 / 1831}
          className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
        >
          <Image
            fill
            alt="phone image"
            src="/images/phone-template.png"
            className="pointer-events-none z-50 select-none"
          />
        </AspectRatio>

        {/* Clip mask */}
        <div className="absolute inset-0 z-40 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.3)] dark:shadow-[0_0_0_99999px_rgba(10,10,15,0.5)]" />

        {/* Dynamic color background */}
        <div
          className={cn(
            "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] transition-colors duration-300",
            `bg-${color.tw}`
          )}
        />
      </div>

      {/* Draggable and Resizable User Image Layer */}
      <Rnd
        size={{
          width: renderedDimension.width,
          height: renderedDimension.height,
        }}
        position={{
          x: renderedPosition.x,
          y: renderedPosition.y,
        }}
        onDragStop={(_, data) => {
          setRenderedPosition({ x: data.x, y: data.y });
        }}
        onResizeStop={(_, __, ref, ___, position) => {
          setRenderedDimension({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          });
          setRenderedPosition(position);
        }}
        lockAspectRatio
        className="absolute z-30 pointer-events-auto cursor-grab active:cursor-grabbing border-[2px] border-brand-primary"
        resizeHandleClasses={{
          bottomRight: "w-4 h-4 bg-white border border-brand-primary rounded-full absolute -right-2 -bottom-2 cursor-se-resize shadow-sm flex items-center justify-center z-50",
          bottomLeft: "w-4 h-4 bg-white border border-brand-primary rounded-full absolute -left-2 -bottom-2 cursor-sw-resize shadow-sm z-50",
          topRight: "w-4 h-4 bg-white border border-brand-primary rounded-full absolute -right-2 -top-2 cursor-ne-resize shadow-sm z-50",
          topLeft: "w-4 h-4 bg-white border border-brand-primary rounded-full absolute -left-2 -top-2 cursor-nw-resize shadow-sm z-50",
        }}
      >
        <div className="relative w-full h-full">
          <Image
            fill
            src={imageUrl}
            alt="your custom cover layout"
            className="object-cover pointer-events-none select-none"
            unoptimized
          />
        </div>
      </Rnd>
    </div>
  );
}
