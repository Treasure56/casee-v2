"use client";

import { useState, useEffect, ReactNode } from "react";

// Counter to generate unique keyframe animation names
let marqueeCounter = 0;

interface AnimationProps {
  axis?: "X" | "Y";
  reverse?: boolean;
  offset: number;
  id: number;
}

const AnimationComponent = ({ axis, reverse, offset, id }: AnimationProps) => {
  const translateAxis = axis || "X";
  const startVal = offset * 100;
  const endVal = (reverse ? -100 : 100) + 100 * offset;

  const keyframes = `
    @keyframes m${id}slide${offset} {
      from {
        transform: translate${translateAxis}(${startVal}%);
      }
      to {
        transform: translate${translateAxis}(${endVal}%);
      }
    }

    @-webkit-keyframes m${id}slide${offset} {
      from {
        transform: -webkit-translate${translateAxis}(${startVal}%);
      }
      to {
        transform: -webkit-translate${translateAxis}(${endVal}%);
      }
    }

    @media (prefers-reduced-motion) {
      .m${id}-span-${offset} {
        animation: none !important;
        -webkit-animation: none !important;
      }
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: keyframes }} />;
};

interface MarqueeProps {
  axis?: "X" | "Y";
  reverse?: boolean;
  align?: "start" | "center" | "end";
  background?: string;
  duration?: number;
  height?: string;
  pauseOnHover?: boolean;
  width?: string;
  className?: string;
  children: ReactNode;
}

export default function Marquee({
  axis = "X",
  reverse = false,
  align = "center",
  background = "transparent",
  duration = 5000,
  height = "5rem",
  pauseOnHover = false,
  width = "100%",
  className,
  children,
}: MarqueeProps) {
  const [animate, setAnimate] = useState<"running" | "paused">("running");
  const [id, setId] = useState(0);

  useEffect(() => {
    setId(marqueeCounter);
    marqueeCounter++;
  }, []);

  const offsetValues = [-1, 0, 1];

  return (
    <div
      className={className}
      onMouseEnter={() => pauseOnHover && setAnimate("paused")}
      onMouseLeave={() => pauseOnHover && setAnimate("running")}
      style={{
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        position: "relative",
        backgroundColor: background,
        height: height,
        width: width,
      }}
    >
      {offsetValues.map((offset) => (
        <span
          key={offset}
          className={`m${id}-span-${offset}`}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            position: "absolute",
            animationName: `m${id}slide${offset}`,
            animationDuration: `${duration}ms`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: animate,
            minWidth: "100%",
          }}
        >
          <AnimationComponent reverse={reverse} offset={offset} axis={axis} id={id} />
          <div
            style={{
              width: "100%",
              height: "100%",
              whiteSpace: "nowrap",
              display: "flex",
              overflow: "hidden",
              justifyContent: "space-around",
              flexDirection:
                axis === "X"
                  ? reverse
                    ? "row-reverse"
                    : "row"
                  : axis === "Y"
                  ? reverse
                    ? "column-reverse"
                    : "column"
                  : "row",
              alignItems: align === "center" ? "center" : `flex-${align}`,
            }}
          >
            {children}
          </div>
        </span>
      ))}
    </div>
  );
}
