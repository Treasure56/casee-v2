import { colors, models } from "@/validators/optionValidators";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { DesignedCaseProps } from "@/types/preview";
import Image from "next/image";

const toggleBackgroundRemoval = (url: string, removeBg: boolean): string => {
  if (!url || !url.includes("cloudinary")) return url;

  // Remove existing background removal transformation
  let cleanUrl = url.replace(/\/e_background_removal\//, "/");

  if (removeBg) {
    // Add Cloudinary's AI background removal effect
    cleanUrl = cleanUrl.replace("/upload/", "/upload/e_background_removal/");
    // Convert format to .png to ensure transparent alpha channel is supported
    cleanUrl = cleanUrl.replace(/\.[a-zA-Z0-9]+$/, ".png");
  }

  return cleanUrl;
};

export default function DesignedCase({
  images,
  colorValue,
  modelValue,
}: DesignedCaseProps) {
  const colorObj = colors.find((c) => c.value === colorValue) || colors[0];
  const tw = colorObj.tw;

  const modelObj =
    models.options.find((m) => m.value === modelValue) || models.options[0];
  let templateSrc = "/images/phone-templates/iphone.png";
  let aspect = 896 / 1831;
  let radiusClass = "rounded-[32px]";
  let offsetClass = "left-[3px] top-px right-[3px] bottom-px";

  if (modelObj.value === "iphone16" || modelObj.value === "iphone16pro" || modelObj.value === "iphone16promax") {
    templateSrc = "/images/phone-templates/iphone16.png?v=1";
    aspect = 172 / 357;
    radiusClass = "rounded-[24px]";
    offsetClass = "left-[3px] top-[2px] right-[3px] bottom-[2px]";
  } else if (modelObj.value === "iphone17pro") {
    templateSrc = "/images/phone-templates/iphone17pro.png?v=37";
    aspect = 196 / 404;
    radiusClass = "rounded-[24px]";
    offsetClass = "left-[4px] top-[2px] right-[4px] bottom-[3px]";
  } else if (modelObj.brand === "Google") {
    templateSrc = "/images/phone-templates/pixel.png?v=28"; // Increment version for cache busting
    aspect = 291 / 607;
    radiusClass = "rounded-[24px]";
    offsetClass = "left-[6px] top-[6px] right-[6px] bottom-[5px]";
  } else if (modelObj.brand === "Samsung") {
    templateSrc = "/images/phone-templates/samsung.png?v=14";
    aspect = 214 / 437;
    radiusClass = "rounded-[6px]";
    offsetClass = "left-[3px] top-px right-[3px] bottom-px";
  }

  return (
    <div className="relative h-[37.5rem] w-full bg-muted/50 overflow-hidden flex items-center justify-center rounded-lg border border-border">
      {/* Phone Case Canvas Overlay */}
      <div
        className="relative w-60 bg-opacity-50 pointer-events-none"
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
        <div
          className={cn(
            "absolute inset-0 z-45 shadow-[0_0_0_99999px_var(--background)]",
            offsetClass,
            radiusClass,
          )}
        />

        {/* Dynamic color background */}
        <div
          className={cn(
            "absolute transition-colors duration-300",
            (modelObj.value === "iphone16" || modelObj.value === "iphone16pro" || modelObj.value === "iphone16promax")
              ? "left-[4px] top-[3px] right-[4px] bottom-[3px] rounded-[20px]"
              : modelObj.value === "iphone17pro"
              ? "left-[5px] top-[3px] right-[5px] bottom-[4px] rounded-[20px]"
              : modelObj.brand === "Google"
                ? "left-[7px] top-[7px] right-[7px] bottom-[5px] rounded-[20px]"
                : cn("inset-0", offsetClass, radiusClass),
            colorObj.bgClass,
          )}
        />

        {/* Render all custom image layers positioned exactly as user configured */}
        {images.map((img) => (
          <div
            key={img.id}
            className="absolute z-[42] pointer-events-none"
            style={{
              left: img.x,
              top: img.y,
              width: img.renderedWidth,
              height: img.renderedHeight,
              transform: `rotate(${img.rotation}deg)`,
              opacity: img.opacity,
            }}
          >
            <div className="relative w-full h-full">
              <img
                src={toggleBackgroundRemoval(img.url, img.removeBg)}
                alt="custom design layer"
                className="object-cover pointer-events-none select-none w-full h-full absolute inset-0"
                style={{
                  transform: `scaleX(${img.flipH ? -1 : 1}) scaleY(${img.flipV ? -1 : 1})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
