/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const IMAGES = [
  "/images/user1.jpg",
  "/images/user2.jpg",
  "/images/user3.jpg",
  "/images/user4.jpg",
  "/images/user5.jpg",
  "/images/man-and-dog.jpg",
];

export default function HeroImgs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  // Slide controls
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % IMAGES.length);
  };

  // Touch & Mouse Swiping Gestures
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const diffX = e.clientX - dragStartX;
    const threshold = 40;
    if (diffX < -threshold) {
      handleNext();
    } else if (diffX > threshold) {
      handlePrev();
    }
    setDragStartX(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diffX = e.changedTouches[0].clientX - dragStartX;
    const threshold = 40;
    if (diffX < -threshold) {
      handleNext();
    } else if (diffX > threshold) {
      handlePrev();
    }
    setDragStartX(null);
  };

  const prevIndex = (activeIndex - 1 + IMAGES.length) % IMAGES.length;
  const nextIndex = (activeIndex + 1) % IMAGES.length;

  const getCardStyles = (index: number) => {
    let diff = index - activeIndex;

    // Adjust for circular wrap-around layout
    if (diff < -2) diff += IMAGES.length;
    if (diff > 2) diff -= IMAGES.length;

    const isActive = diff === 0;
    const isNearLeft = diff === -1;
    const isNearRight = diff === 1;
    const isFarLeft = diff === -2;
    const isFarRight = diff === 2;

    let x = "0%";
    let scale = 0.5;
    let rotateY = 0;
    let rotateZ = 0;
    let opacity = 0;
    let zIndex = 0;

    if (isActive) {
      x = "0%";
      scale = 1.0;
      rotateY = 0;
      rotateZ = 0;
      opacity = 1;
      zIndex = 10;
    } else if (isNearLeft) {
      x = "-91%";
      scale = 0.84;
      rotateY = -12; // Reduced 3D slant from -16
      rotateZ = -3;  // Reduced plane slant from -4
      opacity = 0.75;
      zIndex = 5;
    } else if (isNearRight) {
      x = "91%";
      scale = 0.84;
      rotateY = 12;  // Reduced 3D slant from 16
      rotateZ = 3;   // Reduced plane slant from 4
      opacity = 0.75;
      zIndex = 5;
    } else if (isFarLeft) {
      x = "-162%";
      scale = 0.72;
      rotateY = -22; // Reduced 3D slant from -28
      rotateZ = -6;  // Reduced plane slant from -8
      opacity = 0.35;
      zIndex = 2;
    } else if (isFarRight) {
      x = "162%";
      scale = 0.72;
      rotateY = 22;  // Reduced 3D slant from 28
      rotateZ = 6;   // Reduced plane slant from 8
      opacity = 0.35;
      zIndex = 2;
    } else {
      x = diff < 0 ? "-230%" : "230%";
    }

    return {
      x,
      scale,
      rotateY,
      rotate: rotateZ,
      opacity,
      zIndex,
      width: isActive ? "var(--active-w)" : "var(--inactive-w)",
      height: isActive ? "var(--active-h)" : "var(--inactive-h)",
      borderTopRightRadius: isActive ? "12% 10%" : "20px",
      borderTopLeftRadius: isActive ? "12% 10%" : "20px",
      borderBottomRightRadius: isActive ? "12% 10%" : "20px",
      borderBottomLeftRadius: isActive ? "14% 10%" : "20px",
    };
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 overflow-visible select-none mt-4">
      {/* 3D Track Container with expanded size variables */}
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-[24rem] sm:h-[30rem] md:h-[34rem] w-full max-w-4xl flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing
                   [--active-w:135px] [--active-h:276px] [--inactive-w:125px] [--inactive-h:200px]
                   sm:[--active-w:180px] sm:[--active-h:368px] sm:[--inactive-w:170px] sm:[--inactive-h:272px]
                   md:[--active-w:220px] md:[--active-h:450px] md:[--inactive-w:210px] md:[--inactive-h:336px]"
        style={{
          perspective: 1200,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Left Chevron Button (Desktop/Tablet Only) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute hidden sm:flex left-[-20px] md:left-[-50px] lg:left-[-80px] z-40 w-10 h-10 rounded-full bg-card/90 hover:bg-card border border-border shadow-md items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-105 active:scale-95 backdrop-blur-sm cursor-pointer"
          aria-label="Previous slide"
        >
          <LuChevronLeft className="w-6 h-6" />
        </button>

        {/* Render card frames (pure image full-bleed, borderless) */}
        {IMAGES.map((img, index) => {
          const isActive = index === activeIndex;
          const isNearLeft = index === prevIndex;
          const isNearRight = index === nextIndex;
          const isFarLeft = index === (activeIndex - 2 + IMAGES.length) % IMAGES.length;
          const isFarRight = index === (activeIndex + 2) % IMAGES.length;

          const isVisible = isActive || isNearLeft || isNearRight || isFarLeft || isFarRight;

          return (
            <motion.div
              key={img}
              initial={false}
              animate={getCardStyles(index)}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 22,
              }}
              onClick={() => {
                if (!isActive) {
                  setActiveIndex(index);
                }
              }}
              className="absolute overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-0 p-0 bg-transparent"
              style={{
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              <img
                src={img}
                alt="Case design preview"
                className="w-full h-full object-cover pointer-events-none"
                style={{
                  borderRadius: "inherit",
                }}
              />
            </motion.div>
          );
        })}

        {/* Static Bezel Template sitting exactly over the Active Center Card */}
        <div
          className="absolute w-[var(--active-w)] h-[var(--active-h)] z-20 pointer-events-none"
          style={{
            filter: "drop-shadow(0 18px 20px rgba(0,0,0,0.18))",
          }}
        >
          <div
            className="w-full h-full absolute inset-[2px] overflow-hidden"
            style={{
               borderTopRightRadius: "12% 10%",
               borderTopLeftRadius: "12% 10%",
               borderBottomRightRadius: "12% 10%",
               borderBottomLeftRadius: "14% 10%",
            }}
          >
            <img
              src="/images/phone-template-white-edges.png"
              alt="Phone bezel"
              className="w-full h-full absolute inset-0 pointer-events-none select-none"
            />
          </div>
        </div>


        {/* Right Chevron Button (Desktop/Tablet Only) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute hidden sm:flex right-[-20px] md:right-[-50px] lg:right-[-80px] z-40 w-10 h-10 rounded-full bg-card/90 hover:bg-card border border-border shadow-md items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-105 active:scale-95 backdrop-blur-sm cursor-pointer"
          aria-label="Next slide"
        >
          <LuChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Swipe/Tap Controls (Visible only on screens under sm) */}
      <div className="flex gap-4 justify-center mt-6 sm:hidden z-20 relative">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground active:scale-95 cursor-pointer"
          aria-label="Previous slide"
        >
          <LuChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center text-zinc-700 hover:text-zinc-900 active:scale-95 cursor-pointer"
          aria-label="Next slide"
        >
          <LuChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
