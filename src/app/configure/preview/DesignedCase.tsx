import { colors } from "@/app/validators/optionValidators";
import Phone from "@/components/phone/Phone";
import { cn } from "@/lib/utils";

export default function DesignedCase() {
    // const { color } = configuration;
    const tw = colors.find((supportedColor) => supportedColor.value === colors[0]?.value)?.tw
    return (
        <div className=" p-4 rounded-md">
           
            <div className="flex items-center justify-center">
                <Phone className={cn(`bg-${tw}`, "w-[230px] md:max-w-full")} imgSrc={"/images/user2.png"} />
            </div>
        </div>
    );
}