"use client";

import SlideIn from "@/components/animation/SlideIn";
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
      start: "top 20%",
      end: "bottom top",
      markers: true,
      //   scrub: 3000,
      onUpdate(st) {
        const y = st.progress * 500;
        // console.log(st.progress, y);

        gsap.to(h1Ref.current, {
          y: y,
          //   y: 1 * (st.progress * 500),
        });
      },
    });

    ScrollTrigger.create({
      trigger: "#BlackBox",
      start: "top 80%",
      // end: "bottom top",
      markers: true,
      onEnter() {
        gsap.to("#BlackBox", {
          backgroundColor: "red",
          opacity: 1,
          scale: 1.5,
        });
      },
      onLeaveBack() {
        gsap.to("#BlackBox", {
          backgroundColor: "black",
          opacity: 0,
          scale: 1,
        });
      },
    });
  });

  return (
    <div className="h-[200vh]">
      <h1 ref={h1Ref} className="font-bold text-7xl">
        TSMI
      </h1>

      <div className="h-100"></div>

      <div id="BlackBox" className="rounded bg-black size-20 opacity-0"></div>
      <SlideIn>
        <p>hello</p>
      </SlideIn>
    </div>
  );
}
