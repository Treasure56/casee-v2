"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { ImageLayer } from "@/types/designConfig";
import {
  LuImagePlus,
  LuLoader,
  LuChevronUp,
  LuChevronDown,
  LuTrash2,
  LuSparkles,
} from "react-icons/lu";
import ImageToolbar from "./ImageToolbar";
import Moveable from "react-moveable";
import {
  useDesignStore,
  calculateInitialDimensions,
} from "@/store/useDesignStore";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const toggleBackgroundRemoval = (url: string, removeBg: boolean): string => {
  if (!url || !url.includes("cloudinary")) return url;

  // Remove existing background removal transformation
  let cleanUrl = url.replace(/\/e_background_removal\//, "/");

  if (removeBg) {
    // Add Cloudinary's AI background removal effect
    cleanUrl = cleanUrl.replace("/upload/", "/upload/e_background_removal/");
    // Convert format to .png to ensure transparent alpha channel is supported
    cleanUrl = cleanUrl.replace(/\.[a-zA-Z0-9]+$/, ".png");
  }

  return cleanUrl;
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function DesignConfig() {
  // ── Zustand store (granular selectors for performance) ──
  const images = useDesignStore((s) => s.images);
  const color = useDesignStore((s) => s.selectedColor);
  const model = useDesignStore((s) => s.selectedModel);
  const setImages = useDesignStore((s) => s.setImages);
  const addLayer = useDesignStore((s) => s.addLayer);
  const updateLayer = useDesignStore((s) => s.updateLayer);
  const removeLayer = useDesignStore((s) => s.removeLayer);
  const reorderLayer = useDesignStore((s) => s.reorderLayer);
  const resetLayerTransforms = useDesignStore((s) => s.resetLayerTransforms);

  // ── Local UI state (not persisted — transient) ──
  const [activeId, setActiveId] = useState<string | null>(
    images[0]?.id || null,
  );
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const moveableRef = useRef<any>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    layerId: string;
  } | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingLayer, setIsUploadingLayer] = useState(false);

  // ── Long-press gesture handlers ──

  const startLongPress = (
    e: React.MouseEvent | React.TouchEvent,
    layerId: string,
  ) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    longPressTimer.current = setTimeout(() => {
      setContextMenu({
        x: clientX,
        y: clientY,
        layerId,
      });
      setActiveId(layerId);
    }, 600);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  // Close context menu on any click
  useEffect(() => {
    const handleClose = () => setContextMenu(null);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, []);

  // Sync Moveable handles when state changes externally (e.g. Reset Transforms)
  useEffect(() => {
    if (target) {
      const handle = requestAnimationFrame(() => {
        moveableRef.current?.updateRect();
      });
      return () => cancelAnimationFrame(handle);
    }
  }, [images, target]);

  // ── Phone template config derived from model ──

  let templateSrc = "/images/phone-templates/iphone.png";
  let aspect = 896 / 1831;
  let radiusClass = "rounded-[30px] sm:rounded-[34px] lg:rounded-[36px]";
  let offsetStyle = { left: "0.8%", top: "0.1%", right: "0.8%", bottom: "0.1%" };

  if (
    model.value === "iphone16" ||
    model.value === "iphone16plus" ||
    model.value === "iphone17"
  ) {
    templateSrc = "/images/phone-templates/iphone16.png?v=999";
    aspect = 307 / 653;
    radiusClass = "rounded-[28px] sm:rounded-[32px] lg:rounded-[34px]";
    offsetStyle = { left: "1.4%", top: "0.5%", right: "1.4%", bottom: "0.5%" };
  } else if (
    model.value === "iphone17pro" ||
    model.value === "iphone17promax"
  ) {
    templateSrc = "/images/phone-templates/iphone17pro.png?v=999";
    aspect = 896 / 1754;
    radiusClass = "rounded-[30px] sm:rounded-[34px] lg:rounded-[36px]";
    offsetStyle = { left: "5.3%", top: "3.9%", right: "6.5%", bottom: "4.7%" };
  } else if (model.brand === "Google") {
    templateSrc = "/images/phone-templates/pixel.png?v=999";
    aspect = 925 / 1700;
    radiusClass = "rounded-[34px] sm:rounded-[38px] lg:rounded-[42px]";
    offsetStyle = { left: "9.0%", top: "2.7%", right: "10.1%", bottom: "4.7%" };
  } else if (model.brand === "Samsung") {
    templateSrc = "/images/phone-templates/samsun_altra.png?v=999";
    aspect = 940 / 1672;
    radiusClass = "rounded-[10px] sm:rounded-[12px] lg:rounded-[14px]";
    offsetStyle = { left: "10.0%", top: "3.9%", right: "10.7%", bottom: "3.1%" };
  }

  // ── Upload handlers ──

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const [isDragOverCanvas, setIsDragOverCanvas] = useState(false);

  const processAndUploadFile = async (file: File) => {
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

          const finalWidth = data.width || width;
          const finalHeight = data.height || height;

          const { renderedWidth, renderedHeight } = calculateInitialDimensions(
            finalWidth,
            finalHeight,
          );
          const newLayer: ImageLayer = {
            id: `layer-${Date.now()}`,
            url: data.imageUrl,
            width: finalWidth,
            height: finalHeight,
            x:
              Math.max(10, Math.round((240 - renderedWidth) / 2)) +
              ((images.length * 10) % 50),
            y:
              Math.max(10, Math.round((490 - renderedHeight) / 2)) +
              ((images.length * 10) % 50),
            renderedWidth,
            renderedHeight,
            rotation: 0,
            flipH: false,
            flipV: false,
            opacity: 1,
            removeBg: false,
          };

          addLayer(newLayer);
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

  const processAndUploadUrl = async (url: string) => {
    setIsUploadingLayer(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      const width = data.width || 300;
      const height = data.height || 300;

      const { renderedWidth, renderedHeight } = calculateInitialDimensions(
        width,
        height,
      );
      const newLayer: ImageLayer = {
        id: `layer-${Date.now()}`,
        url: data.imageUrl,
        width,
        height,
        x:
          Math.max(10, Math.round((240 - renderedWidth) / 2)) +
          ((images.length * 10) % 50),
        y:
          Math.max(10, Math.round((490 - renderedHeight) / 2)) +
          ((images.length * 10) % 50),
        renderedWidth,
        renderedHeight,
        rotation: 0,
        flipH: false,
        flipV: false,
        opacity: 1,
        removeBg: false,
      };

      addLayer(newLayer);
      setActiveId(newLayer.id);
    } catch (err) {
      alert("Failed to import external image. Please try again.");
    } finally {
      setIsUploadingLayer(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processAndUploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCanvas(true);
  };

  const handleDragLeave = () => {
    setIsDragOverCanvas(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCanvas(false);

    // 1. Handle local file drops (or browser-downloaded files)
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const isImage =
        file.type.startsWith("image/") ||
        /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(file.name);
      if (!isImage) return;
      await processAndUploadFile(file);
      return;
    }

    // 2. Handle external web image drops (e.g. from Pinterest or Google Images)
    let url = "";
    const html = e.dataTransfer.getData("text/html");
    if (html) {
      const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (match && match[1]) {
        url = match[1].replace(/&amp;/g, "&");
      }
    }

    if (!url) {
      url =
        e.dataTransfer.getData("text/uri-list") ||
        e.dataTransfer.getData("URL");
    }

    if (url) {
      await processAndUploadUrl(url);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => {
        setActiveId(null);
        setTarget(null);
      }}
      className={cn(
        "relative h-[28rem] sm:h-[36rem] lg:h-[45rem] overflow-hidden col-span-1 lg:col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed p-4 sm:p-8 lg:p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300",
        isDragOverCanvas
          ? "border-brand-primary bg-brand-primary/10 scale-[1.01] shadow-lg shadow-brand-primary/5"
          : "border-border bg-muted/50",
      )}
    >
      {/* Floating Toolbar fixed at the top of the canvas, not rotating with the image */}
      {activeId && (
        <div className="absolute top-6 right-6 z-[60]">
          {images.map((img, index) => {
            if (img.id !== activeId) return null;
            return (
              <ImageToolbar
                key={img.id}
                layer={img}
                layerCount={images.length}
                layerIndex={index}
                onUpdate={(updates) => updateLayer(img.id, updates)}
                onReorder={(dir) => reorderLayer(img.id, dir)}
                onDelete={() => {
                  removeLayer(img.id);
                  const remaining = images.filter((i) => i.id !== img.id);
                  setActiveId(remaining[0]?.id || null);
                }}
                onReset={() => resetLayerTransforms(img.id)}
              />
            );
          })}
        </div>
      )}

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
        className={cn(
          "relative bg-opacity-50 pointer-events-none transition-all duration-300",
          model.value === "iphone17pro" || model.value === "iphone17promax"
            ? "w-[12rem] sm:w-[14.5rem] lg:w-[16.4rem]"
            : model.brand === "Samsung"
              ? "w-[13rem] sm:w-[15.5rem] lg:w-[18.1rem]"
              : model.brand === "Google"
                ? "w-[13rem] sm:w-[15.5rem] lg:w-[18rem]"
                : "w-[11rem] sm:w-[14rem] lg:w-60",
        )}
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

        {/* Dynamic color background — clipped strictly inside the phone frame */}
        <div
          className={cn(
            "absolute z-[10] overflow-hidden pointer-events-none transition-colors duration-300",
            radiusClass,
            color.bgClass,
          )}
          style={offsetStyle}
        />

        {/* Render all Draggable and Resizable Image Layers */}
        {images.map((img) => {
          const isActive = activeId === img.id;
          return (
            <div
              key={img.id}
              ref={(el) => {
                if (isActive) {
                  setTarget(el);
                }
              }}
              className={cn(
                "absolute pointer-events-auto cursor-grab active:cursor-grabbing border-2",
                isActive
                  ? "border-brand-primary z-[47]"
                  : "border-transparent hover:border-brand-primary/40 z-[46]",
              )}
              style={{
                left: `${img.x}px`,
                top: `${img.y}px`,
                width: `${img.renderedWidth}px`,
                height: `${img.renderedHeight}px`,
                transform: `rotate(${img.rotation}deg)`,
                opacity: img.opacity,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveId(img.id);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextMenu({
                  x: e.clientX,
                  y: e.clientY,
                  layerId: img.id,
                });
                setActiveId(img.id);
              }}
              onMouseDown={(e) => {
                if (e.button === 0) startLongPress(e, img.id);
              }}
              onTouchStart={(e) => startLongPress(e, img.id)}
              onMouseUp={cancelLongPress}
              onMouseMove={cancelLongPress}
              onTouchEnd={cancelLongPress}
              onTouchMove={cancelLongPress}
            >
              <div className="relative w-full h-full group overflow-hidden">
                <img
                  src={toggleBackgroundRemoval(img.url, img.removeBg)}
                  alt="custom design layer"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                  style={{
                    transform: `scaleX(${img.flipH ? -1 : 1}) scaleY(${img.flipV ? -1 : 1})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Moveable overlay handles for high-performance canvas manipulation */}
      {target && activeId && (
        <Moveable
          ref={moveableRef}
          target={target}
          draggable={true}
          resizable={true}
          rotatable={true}
          keepRatio={true}
          throttleResize={1}
          throttleDrag={1}
          throttleRotate={1}
          onDrag={({ target, left, top }) => {
            target.style.left = `${left}px`;
            target.style.top = `${top}px`;
          }}
          onDragEnd={({ target }) => {
            updateLayer(activeId, {
              x: parseFloat(target.style.left) || 0,
              y: parseFloat(target.style.top) || 0,
            });
          }}
          onResize={({ target, width, height, drag }) => {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.left = `${drag.left}px`;
            target.style.top = `${drag.top}px`;
          }}
          onResizeEnd={({ target }) => {
            updateLayer(activeId, {
              renderedWidth: parseFloat(target.style.width) || 0,
              renderedHeight: parseFloat(target.style.height) || 0,
              x: parseFloat(target.style.left) || 0,
              y: parseFloat(target.style.top) || 0,
            });
          }}
          onRotate={({ target, transform }) => {
            target.style.transform = transform;
          }}
          onRotateEnd={({ target }) => {
            const transformStr = target.style.transform;
            const match = transformStr.match(/rotate\(([-\d.]+)deg\)/);
            const rotation = match ? parseFloat(match[1]) : 0;
            updateLayer(activeId, {
              rotation: (rotation + 360) % 360,
            });
          }}
        />
      )}

      {/* Sleek context menu overlay on right-click / long-press */}
      {contextMenu && (
        <div
          className="fixed z-[999] bg-zinc-950/95 dark:bg-zinc-900/95 backdrop-blur border border-zinc-800 rounded-md shadow-2xl py-1.5 w-48 text-left transition-all select-none"
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              reorderLayer(contextMenu.layerId, "up");
              setContextMenu(null);
            }}
            className="w-full px-3.5 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
          >
            <LuChevronUp className="size-4" /> Bring to Front
          </button>
          <button
            onClick={() => {
              reorderLayer(contextMenu.layerId, "down");
              setContextMenu(null);
            }}
            className="w-full px-3.5 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
          >
            <LuChevronDown className="size-4" /> Send to Back
          </button>
          <div className="border-t border-zinc-800 my-1" />
          <button
            onClick={() => {
              removeLayer(contextMenu.layerId);
              const remaining = images.filter(
                (i) => i.id !== contextMenu.layerId,
              );
              setActiveId(remaining[0]?.id || null);
              setContextMenu(null);
            }}
            className="w-full px-3.5 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <LuTrash2 className="size-4" /> Delete Layer
          </button>
        </div>
      )}
    </div>
  );
}
