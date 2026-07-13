import { productPrice } from "@/data/product";

export const colors = [
  { 
    label: "Black Titanium", 
    value: "black-titanium", 
    tw: "zinc-900",
    bgClass: "!bg-zinc-900 dark:!bg-zinc-900",
    borderClass: "border-zinc-900"
  },
  { 
    label: "Blue Titanium", 
    value: "blue-titanium", 
    tw: "blue-950",
    bgClass: "!bg-blue-950 dark:!bg-blue-950",
    borderClass: "border-blue-950"
  },
  { 
    label: "Natural Titanium", 
    value: "natural-titanium", 
    tw: "stone-400",
    bgClass: "!bg-stone-400 dark:!bg-stone-400",
    borderClass: "border-stone-400"
  },
  { 
    label: "White Titanium", 
    value: "white-titanium", 
    tw: "gray-100",
    bgClass: "!bg-gray-100 dark:!bg-gray-100",
    borderClass: "border-gray-100"
  },
  { 
    label: "Pink", 
    value: "pink", 
    tw: "rose-300",
    bgClass: "!bg-rose-300 dark:!bg-rose-300",
    borderClass: "border-rose-300"
  },
  { 
    label: "Yellow", 
    value: "yellow", 
    tw: "yellow-300",
    bgClass: "!bg-yellow-300 dark:!bg-yellow-300",
    borderClass: "border-yellow-300"
  },
] as const;

export const models = {
  name: "Models",
  options: [
    // Apple Group
    { label: "iPhone 14", value: "iphone14", brand: "Apple" },
    { label: "iPhone 14 Pro", value: "iphone14pro", brand: "Apple" },
    { label: "iPhone 14 Pro Max", value: "iphone14promax", brand: "Apple" },
    { label: "iPhone 15", value: "iphone15", brand: "Apple" },
    { label: "iPhone 15 Pro", value: "iphone15pro", brand: "Apple" },
    { label: "iPhone 15 Pro Max", value: "iphone15promax", brand: "Apple" },
    { label: "iPhone 16", value: "iphone16", brand: "Apple" },
    { label: "iPhone 16 Pro", value: "iphone16pro", brand: "Apple" },
    { label: "iPhone 16 Pro Max", value: "iphone16promax", brand: "Apple" },
    { label: "iPhone 17", value: "iphone17", brand: "Apple" },
    { label: "iPhone 17 Pro", value: "iphone17pro", brand: "Apple" },
    { label: "iPhone 17 Pro Max", value: "iphone17promax", brand: "Apple" },
    
    // Samsung Group
    { label: "Galaxy S24", value: "samsung-s24", brand: "Samsung" },
    { label: "Galaxy S24 Plus", value: "samsung-s24plus", brand: "Samsung" },
    { label: "Galaxy S24 Ultra", value: "samsung-s24ultra", brand: "Samsung" },
    { label: "Galaxy S25", value: "samsung-s25", brand: "Samsung" },
    { label: "Galaxy S25 Plus", value: "samsung-s25plus", brand: "Samsung" },
    { label: "Galaxy S25 Ultra", value: "samsung-s25ultra", brand: "Samsung" },

    // Google Group
    { label: "Pixel 8", value: "google-pixel8", brand: "Google" },
    { label: "Pixel 8 Pro", value: "google-pixel8pro", brand: "Google" },
    { label: "Pixel 9", value: "google-pixel9", brand: "Google" },
    { label: "Pixel 9 Pro", value: "google-pixel9pro", brand: "Google" },
    { label: "Pixel 9 Pro XL", value: "google-pixel9proxl", brand: "Google" },
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

} as const;

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

} as const;
