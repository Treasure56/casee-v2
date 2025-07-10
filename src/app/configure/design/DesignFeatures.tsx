"use client";
import {
  colors,
  finishes,
  material,
  models,
} from "@/validators/optionValidators";
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
import { formatPrice } from "@/functions/helpers";
import FormButton from "@/components/form/FormButton";
import { basePrice } from "@/data/product";

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
  const [selectedFinish, setSelectedFinish] = useState<
    (typeof finishes.options)[number]
  >(finishes.options[0]);

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
                <RadioGroup
                  onValueChange={(val) => {
                    const mtl = material.options.find((c) => c.value === val);
                    if (mtl) setSelectedMaterial(mtl);
                  }}
                  value={selectedMaterial.value}
                >
                  <Label>{material.name}</Label>
                  <div className="mt-3 flex flex-col items-center space-y-5 w-full">
                    {material.options.map((mtl) => (
                      <Label
                        key={mtl.label}
                        htmlFor={mtl.value}
                        className={cn(
                          "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border border-zinc-200 sm:flex sm:justify-between w-full",
                          {
                            "border-brand-primary":
                              selectedMaterial.value === mtl.value,
                          }
                        )}
                      >
                        <div className="flex flex-col text-sm">
                          <span className="font-medium text-gray-900">
                            {mtl.label}
                          </span>
                          {mtl.description && (
                            <span className="text-gray-500">
                              {mtl.description}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {formatPrice(mtl.price)}
                        </span>
                        <RadioGroupItem 
                          value={mtl.value}
                          id={mtl.value}
                          className=" sr-only"
                        />
                      </Label>
                    ))}
                  </div>
                </RadioGroup>

                <RadioGroup
                  onValueChange={(val) => {
                    const finish = finishes.options.find((c) => c.value === val);
                    if (finish) setSelectedFinish(finish);
                  }}
                  value={selectedFinish.value}
                >
                  <Label>{finishes.name}</Label>
                  <div className="mt-3 flex flex-col items-center space-y-5 w-full">
                    {finishes.options.map((finish) => (
                      <Label
                        key={finish.label}
                        htmlFor={finish.value}
                        className={cn(
                          "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border border-zinc-200 sm:flex sm:justify-between w-full",
                          {
                            "border-brand-primary":
                              selectedFinish.value === finish.value,
                          }
                        )}
                      >
                        <div className="flex flex-col text-sm">
                          <span className="font-medium text-gray-900">
                            {finish.label}
                          </span>
                          {finish.description && (
                            <span className="text-gray-500">
                              {finish.description}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {formatPrice(finish.price)}
                        </span>
                        <RadioGroupItem
                          value={finish.value}
                          id={finish.value}
                          className=" sr-only"
                        />
                      </Label>
                    ))}
                    <Label className="text-start"> Total price: {formatPrice(basePrice + selectedMaterial.price + selectedFinish.price)}</Label>
                    <FormButton className="w-full btn btn-primary !py-3 !rounded-md">Continue</FormButton>
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
