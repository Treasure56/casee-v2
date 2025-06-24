import { LuBadgeCheck, LuShieldCheck, LuSparkles } from "react-icons/lu";
import Pill from "./Pill";

export default function Hero() {
  return (
    <section className="app-container py-12 flex flex-col gap-4">
      <div className="flex gap-4 items-center justify-center">
        {pills.map((pill) => (
          <Pill key={pill.title} {...pill} />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl leading-[0.9] font-bold text-center max-w-[800px] text-pretty">
          Your Image on a
          <span className=" text-white bg-[url('/images/rough-bg.png')] bg-no-repeat bg-bottom [background-size:110%_100%] inline-block pb-6 px-5">
            Custom
          </span>{" "}
          Phone Case
        </h1>
        <p>
          Turn your favorite memories into a one-of-a-kind phone case. With
          Casee, you&apos;re not just protecting your phone — you&apos;re
          preserving what matters most.
        </p>
      </div>
    </section>
  );
}

const pills = [
  {
    title: "High-quality",
    icon: <LuSparkles className="text-brand-secondary" />,
  },
  {
    title: "durable material",
    icon: <LuShieldCheck className="text-brand-secondary" />,
  },
  {
    title: "5 years print guarantee",
    icon: <LuBadgeCheck className="text-brand-secondary" />,
  },
];
