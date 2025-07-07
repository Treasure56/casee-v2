// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-stone-400 border-stone-400
// bg-gray-100 border-gray-100
// bg-rose-300 border-rose-300
// bg-yellow-300 border-yellow-300

import { productPrice } from "@/data/product";

export const colors = [
  { label: "Black Titanium", value: "black-titanium", tw: "zinc-900" },
  { label: "Blue Titanium", value: "blue-titanium", tw: "blue-950" },
  { label: "Natural Titanium", value: "natural-titanium", tw: "stone-400" },
  { label: "White Titanium", value: "white-titanium", tw: "gray-100" },
  { label: "Pink", value: "pink", tw: "rose-300" },
  { label: "Yellow", value: "yellow", tw: "yellow-300" },
] as const;

export const models = {
  name: "Models",
  options: [
    {
      label: "iPhone 14",
      value: "iphone14",
    },
    {
      label: "iPhone 14 Pro",
      value: "iphone14pro",
    },
    {
      label: "iPhone 15",
      value: "iphone15",
    },
    {
      label: "iPhone 15 Pro",
      value: "iphone15pro",
    },
    {
      label: "iPhone 15 Pro Max",
      value: "iphone15promax",
    },
  ],
} as const;

export const material = {
  name: "Material",
  options:[
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price:productPrice.material.silicone
    },
    {
      label: "Soft polycarbonate",
      value: "polycarbonate",
      description: " Scratch-resistant coating",
      price: productPrice.material.polycarbonate
    }
  ]

} as const

export const finishes = {
  name: "Finish",
  options:[
    {
      label: "Smooth finish ",
      value: "smooth",
      description: undefined,
      price: productPrice.finish.smooth
    },
    {
      label: "Texture finish",
      value: "textured",
      description: " soft grippy texture",
      price: productPrice.finish.textured
    }
  ]

} as const

