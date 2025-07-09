import { LuZap } from "react-icons/lu";
import FeaturesCard, { FeaturesCardProps } from "./FeaturesCard";
import { ShieldCheck } from "lucide-react";

export default function CaseFeatures() {
  return (
    <div className="grid grid-cols-2 gap-4 items-center">
      {features.map((feature, index) => (
        <FeaturesCard key={index} {...feature} />
      ))}
    </div>
  );
}

const features: FeaturesCardProps[] = [
  {
    title: "Highlights",
    features: [
      "Wireless charging compatible",
      "TPU shock absorption",
      "Recycled materials packaging",
      "5 years print warranty",
    ],
    icon: <LuZap className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Materials",
    features: [
      "High quality, durable material",
      "Scratch and fingerprint resistant coating",
      "Eco-friendly materials",
    ],
    icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
  },
];
