"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode } from "react";

export default function SlideIn({ children }: { children: ReactNode }) {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: "#child",
      start: "top 70%",
      markers: true,
      onEnter() {
        gsap.fromTo(
          "#child",
          {
            scale: 0,
            y: 100,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1
          }
        );
      },
    });
  });

  return (
    <div id="child" className=" opacity-0 scale-0">
      {children}
    </div>
  );
}
