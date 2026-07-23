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
  let radiusClass = "rounded-[30px] sm:rounded-[34px] md:rounded-[36px]";
  let offsetStyle = { left: "0.8%", top: "0.1%", right: "0.8%", bottom: "0.1%" };

  if (
    modelObj.value === "iphone16" ||
    modelObj.value === "iphone16plus" ||
    modelObj.value === "iphone17"
  ) {
    templateSrc = "/images/phone-templates/iphone16.png?v=999";
    aspect = 307 / 653;
    radiusClass = "rounded-[28px] sm:rounded-[32px] md:rounded-[34px]";
    offsetStyle = { left: "1.4%", top: "0.5%", right: "1.4%", bottom: "0.5%" };
  } else if (
    modelObj.value === "iphone17pro" ||
    modelObj.value === "iphone17promax"
  ) {
    templateSrc = "/images/phone-templates/iphone17pro.png?v=999";
    aspect = 896 / 1754;
    radiusClass = "rounded-[30px] sm:rounded-[34px] md:rounded-[36px]";
    offsetStyle = { left: "5.3%", top: "3.9%", right: "6.5%", bottom: "4.7%" };
  } else if (modelObj.brand === "Google") {
    templateSrc = "/images/phone-templates/pixel.png?v=999";
    aspect = 925 / 1700;
    radiusClass = "rounded-[34px] sm:rounded-[38px] md:rounded-[42px]";
    offsetStyle = { left: "9.0%", top: "2.7%", right: "10.1%", bottom: "4.7%" };
  } else if (modelObj.brand === "Samsung") {
    templateSrc = "/images/phone-templates/samsun_altra.png?v=999";
    aspect = 940 / 1672;
    radiusClass = "rounded-[10px] sm:rounded-[12px] md:rounded-[14px]";
    offsetStyle = { left: "10.0%", top: "3.9%", right: "10.7%", bottom: "3.1%" };
  }

  return (
    <div className="relative h-[24rem] sm:h-[30rem] md:h-[37.5rem] w-full bg-muted/50 overflow-hidden flex items-center justify-center rounded-lg border border-border p-4">
      {/* Phone Case Canvas Overlay */}
      <div
        className={cn(
          "relative bg-opacity-50 pointer-events-none transition-all duration-300",
          modelObj.value === "iphone17pro" ||
            modelObj.value === "iphone17promax"
            ? "w-[12rem] sm:w-[14.5rem] md:w-[16.4rem]"
            : modelObj.brand === "Samsung"
              ? "w-[13rem] sm:w-[15.5rem] md:w-[18.1rem]"
              : modelObj.brand === "Google"
                ? "w-[13rem] sm:w-[15.5rem] md:w-[18rem]"
                : "w-[11rem] sm:w-[14rem] md:w-60",
        )}
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

        {/* Dynamic color background + custom image layers — clipped strictly inside phone frame */}
        <div
          className={cn(
            "absolute z-[10] overflow-hidden pointer-events-none transition-colors duration-300",
            radiusClass,
            colorObj.bgClass,
          )}
          style={offsetStyle}
        >
          {images.map((img) => (
            <div
              key={img.id}
              className="absolute pointer-events-none"
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
    </div>
  );
}
