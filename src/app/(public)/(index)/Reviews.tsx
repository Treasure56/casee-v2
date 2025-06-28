"use client";

import WhiteBgPhone from "@/components/phone/WhiteBgPhone";
import Marquee from "react-easy-marquee";



export default function Reviews() {
  return (
    <section className="app-container flex flex-col gap-4 justify-center py-12 max-w-[1000px] mx-auto">
        <h2 className="text-center text-3xl md:text-4xl mb-8 font-bold">
        In High Demand
      </h2>
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-3 overflow-clip mt-5">
        {marqueeData.map((marquee, index) => (
          <div key={index} className={`h-[70vh] flex items-center flex-col ${marquee.className}`} >
            <Marquee height="100%" axis="Y" duration={marquee.duration} reverse>
              {marquee.images.map((src, idx) => (
                <WhiteBgPhone key={idx} className="w-[80%] mx-auto my-1" src={src} />
              ))}
            </Marquee>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-b from-white to-transparent absolute top-0 left-0 w-full h-25"></div>
      <div className="bg-gradient-to-t from-white to-transparent absolute bottom-0 right-0 w-full h-25"></div>
      </div>
    </section>
  );
}

const marqueeData = [
  {
    duration: 20000,
    images: [
      "https://images.pexels.com/photos/18331820/pexels-photo-18331820.jpeg",
      "https://images.pexels.com/photos/13833164/pexels-photo-13833164.jpeg",
      "https://images.pexels.com/photos/2100553/pexels-photo-2100553.jpeg",
      "https://images.pexels.com/photos/18331820/pexels-photo-18331820.jpeg"
    ],
  },
  {
    duration: 25000,
    images: [
      "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg",
      "https://images.pexels.com/photos/3617843/pexels-photo-3617843.jpeg",
      "https://images.pexels.com/photos/6667766/pexels-photo-6667766.jpeg",
      "https://images.pexels.com/photos/7944365/pexels-photo-7944365.jpeg"
    ],
  },
  {
    duration: 18000,
    className: "max-md:hidden",
    images: [
      "https://images.pexels.com/photos/1927219/pexels-photo-1927219.jpeg",
      "https://images.pexels.com/photos/4099127/pexels-photo-4099127.jpeg",
      "https://images.pexels.com/photos/58572/pexels-photo-58572.jpeg",
      "https://images.pexels.com/photos/3365555/pexels-photo-3365555.jpeg"
    ],
  },
];