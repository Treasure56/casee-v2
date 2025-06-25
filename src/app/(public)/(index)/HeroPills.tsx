"use client";

import Marquee from "react-fast-marquee";
import { useWindowSize } from "react-use";

export default function HeroPills({ children }: { children: React.ReactNode }) {
  const { width: vw } = useWindowSize();

  if (vw <= 768)
    return (
      <Marquee autoFill pauseOnHover speed={30}>
        {children}
      </Marquee>
    );
  return <div className="flex items-center justify-center">{children}</div>;
}
