import { colors } from "@/validators/optionValidators";
import Phone from "@/components/phone/Phone";
import { cn } from "@/lib/utils";
import { DesignedCaseProps } from "@/types/preview";

export default function DesignedCase({
  imageUrl,
  colorValue,
}: DesignedCaseProps) {
  const colorObj = colors.find((c) => c.value === colorValue) || colors[0];
  const tw = colorObj.tw;

  return (
    <div className=" p-4 rounded-md">
      <div className="flex items-center justify-center">
        <Phone
          className={cn(`bg-${tw}`, "w-[230px] md:max-w-full")}
          imgSrc={imageUrl}
        />
      </div>
    </div>
  );
}
