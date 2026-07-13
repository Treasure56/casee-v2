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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/functions/helpers";
import FormButton from "@/components/form/FormButton";
import { basePrice } from "@/data/product";

type DesignFeaturesProps = {
  selectedColor: (typeof colors)[number];
  setSelectedColor: (color: (typeof colors)[number]) => void;
  selectedModel: (typeof models.options)[number];
  setSelectedModel: (model: (typeof models.options)[number]) => void;
  selectedMaterial: (typeof material.options)[number];
  setSelectedMaterial: (mtl: (typeof material.options)[number]) => void;
  selectedFinish: (typeof finishes.options)[number];
  setSelectedFinish: (finish: (typeof finishes.options)[number]) => void;
  onSave: () => void;
  isSaving: boolean;
};

export default function DesignFeatures({
  selectedColor,
  setSelectedColor,
  selectedModel,
  setSelectedModel,
  selectedMaterial,
  setSelectedMaterial,
  selectedFinish,
  setSelectedFinish,
  onSave,
  isSaving,
}: DesignFeaturesProps) {
  const totalPrice = basePrice + selectedMaterial.price + selectedFinish.price;

  return (
    <div className=" h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-card">
      <ScrollArea className="relative flex-1 overflow-auto">
        <div
          aria-hidden="true"
          className=" absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card pointer-events-none"
        />

        <div className=" px-8 pb-12 pt-8">
          <h2 className="tracking-tight font-bold text-3xl ">
            Customize your case
          </h2>
          <div className=" w-full h-px bg-border my-6" />
          <div className="relative mt-4 h-full flex flex-col justify-between">
            <div className=" flex flex-col gap-6">
              <RadioGroup
                value={selectedColor.value}
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
                        selectedColor.value === color.value ? color.borderClass : ""
                      )}
                    >
                      <RadioGroupItem
                        value={color.value}
                        id={color.value}
                        className={cn(color.bgClass, "size-8")}
                      />
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
                  <SelectContent className="border-border bg-card">
                    {(["Apple", "Samsung", "Google"] as const).map((brand) => (
                      <SelectGroup key={brand}>
                        <SelectLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/20">
                          {brand}
                        </SelectLabel>
                        {models.options
                          .filter((model) => model.brand === brand)
                          .map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                              {model.label}
                            </SelectItem>
                          ))}
                      </SelectGroup>
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
                          "relative block cursor-pointer rounded-lg bg-card px-6 py-4 shadow-sm border border-border sm:flex sm:justify-between w-full",
                          {
                            "border-brand-primary":
                              selectedMaterial.value === mtl.value,
                          },
                        )}
                      >
                        <div className="flex flex-col text-sm">
                          <span className="font-medium text-foreground">
                            {mtl.label}
                          </span>
                          {mtl.description && (
                            <span className="text-muted-foreground">
                              {mtl.description}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-foreground">
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
                    const finish = finishes.options.find(
                      (c) => c.value === val,
                    );
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
                          "relative block cursor-pointer rounded-lg bg-card px-6 py-4 shadow-sm border border-border sm:flex sm:justify-between w-full",
                          {
                            "border-brand-primary":
                              selectedFinish.value === finish.value,
                          },
                        )}
                      >
                        <div className="flex flex-col text-sm">
                          <span className="font-medium text-foreground">
                            {finish.label}
                          </span>
                          {finish.description && (
                            <span className="text-muted-foreground">
                              {finish.description}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {formatPrice(finish.price)}
                        </span>
                        <RadioGroupItem
                          value={finish.value}
                          id={finish.value}
                          className=" sr-only"
                        />
                      </Label>
                    ))}
                    <Label className="text-start">
                      {" "}
                      Total price:{" "}
                      {formatPrice(totalPrice)}
                    </Label>
                    <FormButton
                      onClick={onSave}
                      disabled={isSaving}
                      className="w-full btn btn-primary !py-3 !rounded-md"
                    >
                      {isSaving ? "Saving design..." : "Continue"}
                    </FormButton>
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
