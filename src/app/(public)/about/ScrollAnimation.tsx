"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function ScrollAnimation() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: h1Ref.current,
        start: "",
        end: "",
        onUpdate(st){

        }
    })
  });

  return (
    <div className="h-[200vh]">
      <h1 ref={h1Ref} className="font-bold text-7xl">
        TSMI
      </h1>
    </div>
  );
}
