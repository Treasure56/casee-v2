"use client";

import { colors } from "@/validators/optionValidators";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Rnd } from "react-rnd";
import { useState, useRef } from "react";
import { ImageLayer } from "@/types/designConfig";
import { LuImagePlus, LuLoader } from "react-icons/lu";

import { models } from "@/validators/optionValidators";

type DesignConfigProps = {
  images: ImageLayer[];
  setImages: React.Dispatch<React.SetStateAction<ImageLayer[]>>;
  color: (typeof colors)[number];
  model: (typeof models.options)[number];
};

export default function DesignConfig({
  images,
  setImages,
  color,
  model,
}: DesignConfigProps) {
  const [activeId, setActiveId] = useState<string | null>(images[0]?.id || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingLayer, setIsUploadingLayer] = useState(false);

  let templateSrc = "/images/phone-templates/iphone.png";
  let aspect = 896 / 1831;
  let radiusClass = "rounded-[32px]";

  if (model.brand === "Google") {
    templateSrc = "/images/phone-templates/pixel.png?v=5";
    aspect = 303 / 607;
    radiusClass = "rounded-[36px]";
  } else if (model.brand === "Samsung") {
    templateSrc = "/images/phone-templates/samsung.png?v=5";
    aspect = 214 / 437;
    radiusClass = "rounded-[16px]";
  }

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLayer(true);
    try {
      if (file.size > 25 * 1024 * 1024) {
        alert("File size cannot exceed 25MB.");
        setIsUploadingLayer(false);
        return;
      }

      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        const width = img.width;
        const height = img.height;

        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Upload failed");

          const data = await response.json();

          const newLayer: ImageLayer = {
            id: `layer-${Date.now()}`,
            url: data.imageUrl,
            width,
            height,
            x: Math.min(150 + images.length * 15, 200),
            y: Math.min(150 + images.length * 15, 200),
            renderedWidth: width / 4,
            renderedHeight: height / 4,
          };

          setImages((prev) => [...prev, newLayer]);
          setActiveId(newLayer.id);
        } catch (err) {
          alert("Failed to upload image. Please try again.");
        } finally {
          setIsUploadingLayer(false);
        }
      };
    } catch (error) {
      console.error(error);
      setIsUploadingLayer(false);
    }
  };

  return (
    <div className="relative h-[37.5rem] bg-muted/50 overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
      
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Floating Animated Add Image Button (Bottom Right Circle with Float) */}
      <div className="absolute bottom-6 right-6 z-50 animate-float hover:[animation-play-state:paused]">
        <button
          onClick={handleAddImageClick}
          disabled={isUploadingLayer}
          className="w-12 h-12 bg-zinc-950 text-zinc-50 border border-zinc-800 hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-200 dark:hover:bg-zinc-100 rounded-full flex items-center justify-center shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:border-brand-primary/60"
          title="Add custom image"
        >
          {isUploadingLayer ? (
            <LuLoader className="size-5 animate-spin text-current" />
          ) : (
             <LuImagePlus className="size-5 text-current" />
          )}
        </button>
      </div>

      {/* Phone Case Canvas Overlay */}
      <div 
        className="relative w-60 bg-opacity-50 pointer-events-none"
        style={{ aspectRatio: aspect }}
      >
        <AspectRatio
          ratio={aspect}
          className="pointer-events-none relative z-50 w-full h-full"
        >
          <img
            alt="phone image"
            src={templateSrc}
            className="pointer-events-none z-50 select-none absolute inset-0 w-full h-full"
          />
        </AspectRatio>

        {/* Clip mask */}
        <div className={cn("absolute inset-0 z-40 left-[3px] top-px right-[3px] bottom-px shadow-[0_0_0_99999px_rgba(229,231,235,0.3)] dark:shadow-[0_0_0_99999px_rgba(10,10,15,0.5)]", radiusClass)} />

        {/* Dynamic color background */}
        <div
          className={cn(
            "absolute inset-0 left-[3px] top-px right-[3px] bottom-px transition-colors duration-300",
            `bg-${color.tw}`,
            radiusClass
          )}
        />
      </div>

      {/* Render all Draggable and Resizable Image Layers */}
      {images.map((img) => {
        const isActive = activeId === img.id;
        return (
          <Rnd
            key={img.id}
            size={{
              width: img.renderedWidth,
              height: img.renderedHeight,
            }}
            position={{
              x: img.x,
              y: img.y,
            }}
            onDragStart={() => setActiveId(img.id)}
            onDragStop={(_, data) => {
              setImages((prev) =>
                prev.map((i) =>
                  i.id === img.id ? { ...i, x: data.x, y: data.y } : i
                )
              );
            }}
            onResizeStart={() => setActiveId(img.id)}
            onResizeStop={(_, __, ref, ___, position) => {
              setImages((prev) =>
                prev.map((i) =>
                  i.id === img.id
                    ? {
                        ...i,
                        renderedWidth: parseInt(ref.style.width),
                        renderedHeight: parseInt(ref.style.height),
                        x: position.x,
                        y: position.y,
                      }
                    : i
                )
              );
            }}
            onClick={() => setActiveId(img.id)}
            lockAspectRatio
            className={cn(
              "absolute z-30 pointer-events-auto cursor-grab active:cursor-grabbing border-2",
              isActive ? "border-brand-primary" : "border-transparent hover:border-brand-primary/40"
            )}
            resizeHandleClasses={
              isActive
                ? {
                    bottomRight: "w-4 h-4 bg-white border border-brand-primary rounded-full absolute -right-2 -bottom-2 cursor-se-resize shadow-sm flex items-center justify-center z-50",
                    bottomLeft: "w-4 h-4 bg-white border border-brand-primary rounded-full absolute -left-2 -bottom-2 cursor-sw-resize shadow-sm z-50",
                    topRight: "w-4 h-4 bg-white border border-brand-primary rounded-full absolute -right-2 -top-2 cursor-ne-resize shadow-sm z-50",
                    topLeft: "w-4 h-4 bg-white border border-brand-primary rounded-full absolute -left-2 -top-2 cursor-nw-resize shadow-sm z-50",
                  }
                : {}
            }
          >
            <div className="relative w-full h-full group">
              <Image
                fill
                src={img.url}
                alt="custom design layer"
                className="object-cover pointer-events-none select-none"
                unoptimized
              />
              
              {/* Sleek Delete Button on active layer */}
              {isActive && images.length > 1 && (
                <button
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    const filtered = images.filter((i) => i.id !== img.id);
                    setImages(filtered);
                    setActiveId(filtered[0]?.id || null);
                  }}
                  className="absolute -top-2 -left-2 size-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm z-50 cursor-pointer"
                  title="Remove image"
                >
                  ✕
                </button>
              )}
            </div>
          </Rnd>
        );
      })}
    </div>
  );
}
