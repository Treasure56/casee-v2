"use client";

import { paths } from "@/utils/paths";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const steps: Record<string, number> = {
  [paths.upload]: 1,
  [paths.design]: 2,
  [paths.preview]: 3,
};
export default function Step() {
  const pathName = usePathname();
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(steps[pathName] ?? 0);
  }, [pathName]);

  return (
    <div className=" app-container py-12 flex md:flex-col md:gap-4 md:justify-center items-stretch w-full h-full flex-row-reverse">
      <div className="grid md:grid-cols-3 md:gap-4 gap-8 flex-1 justify-center md:pl-8">
        {stepContents.map((i) => (
          <div key={i.name} className="flex flex-col text-start">
            <p className="text-base text-neutral-800 font-medium">{i.name}</p>
            <p className="text-base text-neutral-500">{i.description}</p>
          </div>
        ))}
      </div>
      <div className="md:w-full w-1 max-md:max-w-1.5 md:max-w-full relative rounded-md max-md:flex-1 md:h-1 bg-gray-200 flex-shrink-0 overflow-hidden">
        <div
          className="bg-brand-secondary md:min-h-full absolute rounded-md max-md:min-w-full transition-all duration-300 ease-in-out"
          style={{
            width: `${(step - 1 / stepContents.length) * 100}%`,
            height: `${(step - 1 / stepContents.length) * 100}%`,
          }}
        />
        <div
          className="bg-brand-primary md:min-h-full relative rounded-md max-md:min-w-full transition-all duration-300 ease-in-out"
          style={{
            width: `${(step / stepContents.length) * 100}%`,
            height: `${(step / stepContents.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

const stepContents = [
  {
    name: " Add image",
    description: "choose an image to your case",
    url: "/upload",
  },
  {
    name: " Customize design",
    description: "Make the case fit your needs",
    url: "/design",
  },
  { name: " Summary", description: "Review your design", url: "/preview" },
];
