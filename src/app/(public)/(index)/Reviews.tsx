"use client";

import WhiteBgPhone from "@/components/phone/WhiteBgPhone";
import Marquee from "react-easy-marquee";

export default function Reviews() {
  return (
    <div className="[--glob-color:black] bg-[var(--glob-color)] ">
      <section className="app-container flex flex-col gap-4 justify-center py-12 md:py-16 max-w-[1000px] mx-auto ">
        <h2 className="text-center text-white text-3xl md:text-4xl mb-8 font-bold">
          Satisfied Customers Bought These
        </h2>
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 overflow-clip mt-5">
            {marqueeData.map((marquee, index) => (
              <div
                key={index}
                className={`h-[70vh] flex items-center flex-col ${marquee.className}`}
              >
                <Marquee
                  height="100%"
                  axis="Y"
                  duration={marquee.duration}
                  reverse
                >
                  {marquee.images.map((src, idx) => (
                    <WhiteBgPhone
                      key={idx}
                      className="w-[80%] mx-auto my-1"
                      src={src}
                    />
                  ))}
                </Marquee>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-b from-[var(--glob-color)] to-[#00000000] absolute top-0 left-0 w-full h-25"></div>
          <div className="bg-gradient-to-t from-[var(--glob-color)] to-[#00000000] absolute bottom-0 right-0 w-full h-25"></div>
        </div>
      </section>
    </div>
  );
}

const marqueeData = [
  {
    duration: 20000,
    images: [
      "/images/case1.jpeg",
      "/images/case2.jpeg",
      "/images/case3.jpeg",
      "/images/case4.jpeg",
    ],
  },
  {
    duration: 25000,
    images: [
      "/images/case5.jpeg",
      "/images/case6.jpeg",
      "/images/case7.jpeg",
      "/images/case8.jpeg",
    ],
  },
  {
    duration: 18000,
    className: "max-md:hidden",
    images: [
      "/images/case9.jpeg",
      "/images/case10.jpeg",
      "/images/case11.jpeg",
      "/images/case12.jpg",
    ],
  },
];
