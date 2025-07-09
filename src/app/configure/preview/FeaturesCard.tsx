import { ReactNode } from "react";
import { LuCheck } from "react-icons/lu";

export type FeaturesCardProps = {
    title: string;
    features: string[];
    icon: ReactNode ;
}
export default function FeaturesCard({ title, features, icon }: FeaturesCardProps) {
    return (
        <div className="border border-gray-200 rounded-md flex flex-col gap-3 p-4 h-full">
            <div className="flex items-center gap-2">
                {icon}
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <div className="flex gap-2 flex-col">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <LuCheck className="h-4 w-4 text-brand-primary" />
                        <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                ))}
            </div>
            
        </div>
    );
}