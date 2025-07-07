"use client";
import { colors, finishes, material, models } from "@/app/validators/optionValidators";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DesignFeatures() {
  const [selectedColor, setSelectedColor] = useState<(typeof colors)[number]>(
    colors[0]
  );
  const [selectedModel, setSelectedModel] = useState<
    (typeof models.options)[number]
  >(models.options[0]);

  const [selectedMaterial, setSelectedMaterial] = useState<
    (typeof material.options)[number]
  >(material.options[0]);
  const [selectedFinish, setSelectedFinish] = useState<(typeof finishes)[number]>(
    finishes.options[0]
  )

  return (
    <div className=" h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
      <ScrollArea className="relative flex-1 overflow-auto">
        <div
          aria-hidden="true"
          className=" absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
        />

        <div className=" px-8 pb-12 pt-8">
          <h2 className="tracking-tight font-bold text-3xl ">
            Customize your case
          </h2>
          <div className=" w-full h-px bg-zinc-200 my-6" />
          <div className="relative mt-4 h-full flex flex-col justify-between">
            <div className=" flex flex-col gap-6">
              <RadioGroup
                onValueChange={(val) => {
                  const color = colors.find((c) => c.value === val);
                  if (color) setSelectedColor(color);
                }}
              >
                <Label>Color: {selectedColor.label}</Label>
                <div className="mt-3 flex items-center space-x-5">
                  {colors.map((color) => (
                    <Label
                      key={color.label}
                      htmlFor={color.value}
                      className={cn(
                        "relative -m-0.5 mx-1 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-separate border-transparent",
                        {
                          [`border-${color.tw}`]:
                            selectedColor.value === color.value,
                        }
                      )}
                    >
                      <RadioGroupItem
                        value={color.value}
                        id={color.value}
                        className={cn(`bg-${color.tw} size-8`)}
                      ></RadioGroupItem>
                    </Label>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex flex-col gap-3 w-full">
                <Label>{models.name}</Label>
                <Select
                  value={selectedModel.value}
                  onValueChange={(val) => {
                    const model = models.options.find((m) => m.value === val);
                    if (model) setSelectedModel(model);
                  }}
                >
                  <SelectTrigger className="w-full rounded-md !py-5">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="border-white bg-white">
                    {models.options.map((model) => (
                      <SelectItem
                        key={model.value}
                        value={model.value}
                        onClick={() => setSelectedModel(model)}
                      >
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3 w-full">
                 <Label>
                        {material.name}
                      </Label>
                <RadioGroup value={selectedMaterial.value} onValueChange={(val) => {
                  const materialOption = material.options.find((m) => m.value === val);
                  if (materialOption) setSelectedMaterial(materialOption);
                }}>
                  <div className="mt-3 space-x-4">
                  {
                    material.options.map(mat =>(
                      <RadioGroupItem key={mat.value} value={mat}>

                      </RadioGroupItem>
                    ))
                  }
                  </div>
                 
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
