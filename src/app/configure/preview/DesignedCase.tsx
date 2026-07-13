import { colors, models } from "@/validators/optionValidators";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { DesignedCaseProps } from "@/types/preview";
import Image from "next/image";

export default function DesignedCase({
  images,
  colorValue,
  modelValue,
}: DesignedCaseProps) {
  const colorObj = colors.find((c) => c.value === colorValue) || colors[0];
  const tw = colorObj.tw;

  const modelObj = models.options.find((m) => m.value === modelValue) || models.options[0];
  let templateSrc = "/images/phone-templates/iphone.png";
  let aspect = 896 / 1831;
  let radiusClass = "rounded-[32px]";

  if (modelObj.brand === "Google") {
    templateSrc = "/images/phone-templates/pixel.png?v=14";
    aspect = 303 / 607;
    radiusClass = "rounded-[36px]";
  } else if (modelObj.brand === "Samsung") {
    templateSrc = "/images/phone-templates/samsung.png?v=14";
    aspect = 214 / 437;
    radiusClass = "rounded-[6px]";
  }

  return (
    <div className="relative h-[37.5rem] w-full bg-muted/50 overflow-hidden flex items-center justify-center rounded-lg border border-border">
      
      {/* Phone Case Canvas Overlay */}
      <div 
        className="relative w-60 bg-opacity-50 pointer-events-none z-40"
        style={{ aspectRatio: aspect }}
      >
        <AspectRatio
          ratio={aspect}
          className="pointer-events-none relative z-50 w-full h-full"
        >
          <img
            alt="phone image"
            src={templateSrc}
            className="pointer-events-none z-50 select-none absolute inset-0 w-full h-full"
          />
        </AspectRatio>

        {/* Clip mask (hides parts of custom images bleeding outside the phone boundaries) */}
        <div className={cn("absolute inset-0 z-40 left-[3px] top-px right-[3px] bottom-px shadow-[0_0_0_99999px_var(--background)]", radiusClass)} />

        {/* Dynamic color background */}
        <div
          className={cn(
            "absolute inset-0 left-[3px] top-px right-[3px] bottom-px transition-colors duration-300 -z-10",
            colorObj.bgClass,
            radiusClass
          )}
        />
      </div>

      {/* Render all custom image layers positioned exactly as user configured */}
      {images.map((img) => (
        <div
          key={img.id}
          className="absolute z-30 pointer-events-none"
          style={{
            left: img.x,
            top: img.y,
            width: img.renderedWidth,
            height: img.renderedHeight,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              fill
              src={img.url}
              alt="custom design layer"
              className="object-cover pointer-events-none select-none"
              unoptimized
            />
          </div>
        </div>
      ))}
    </div>
  );
}
