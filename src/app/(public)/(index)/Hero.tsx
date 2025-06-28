import Clients from "@/components/home/Clients";
import Stars from "@/components/ui/Stars";
import Image from "next/image";
import { LuBadgeCheck, LuShieldCheck, LuSparkles } from "react-icons/lu";
import HeroImgs from "./HeroImgs";
import HeroPills from "./HeroPills";
import Pill from "./Pill";

export default function Hero() {
  return (
    <section className="py-12 flex flex-col gap-8 overflow-x-clip relative">
      <Image
        height={400}
        width={400}
        src="/images/hero-bg.webp"
        alt="hero-img"
        className="absolute inset-0 size-full object-cover opacity-10 "
      />
      <div
        className="absolute inset-0 size-full object-cover bg-gradient-to-b from-white via-transparent to-white "
      />
      <div className="relative">
        <HeroPills>
          {pills.map((pill) => (
            <Pill key={pill.title} {...pill} />
          ))}
        </HeroPills>
        <div className="flex flex-col items-center justify-center gap-7 app-container mt-6">
          <h1 className="md:text-6xl sm:text-5xl text-4xl leading-[0.9] font-bold text-center max-w-[800px] text-pretty">
            Your Image on a
            <span className=" text-white bg-[url('/images/rough-bg.png')] bg-no-repeat bg-bottom [background-size:110%_100%] inline-block pb-3 md:pb-6 px-5">
              Custom
            </span>{" "}
            Phone Case
          </h1>
          <h2 className="text-gray-600 md:text-base text-sm max-w-[700px] text-center ">
            Turn your favorite memories into a one-of-a-kind phone case. With
            Casee, you&apos;re not just protecting your phone you&apos;re
            preserving what matters most.
          </h2>
          <div className="flex gap-4 items-center">
            <Clients />
            <div className="flex flex-col">
              <Stars />
              <p className="text-xs">
                <span className="font-semibold ">2k+</span>customers
              </p>
            </div>
          </div>
        </div>
        <HeroImgs />
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
