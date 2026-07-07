declare module "react-easy-marquee" {
  import { ReactNode, ComponentType } from "react";

  export type Axis = "X" | "Y";
  export type Align = "start" | "center" | "end";

  export interface MarqueeProps {
    axis?: Axis;
    reverse?: boolean;
    align?: Align;
    background?: string;
    duration?: number;
    height?: string;
    pauseOnHover?: boolean;
    width?: string;
    className?: string;
    children?: ReactNode;
  }

  const Marquee: ComponentType<MarqueeProps>;
  export default Marquee;
}
