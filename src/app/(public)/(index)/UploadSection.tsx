/* eslint-disable @next/next/no-img-element */
import WhiteBgPhone from "@/components/phone/WhiteBgPhone";
import { paths } from "@/utils/paths";
import Link from "next/link";
import { LuCheck } from "react-icons/lu";

export default function UploadSection() {
  return (
    <section className="flex max-md:flex-col-reverse app-container py-16 gap-12">
      <div className="flex flex-col space-y-8 w-full md:w-4/12">
        <div className="space-y-4">
          <h3 className="md:text-4xl text-3xl font-bold leading-0.9">
            Your Photo. <br />Your Phone Case.
          </h3>

          <p className=" text-sm md:text-base  text-neutral-700 leading-relaxed">
            Transform your favorite memories into a stunning, protective phone
            case. Our advanced printing technology ensures vibrant colors and
            lasting quality.
          </p>
        </div>

        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start group text-sm">
              <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-4 rounded-full bg-brand-primary/10 ">
                <LuCheck className="w-3 h-3 text-brand-primary" />
              </div>
              <span className=" text-neutral-700 group-hover:text-neutral-900 transition-colors">
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <Link href={paths.upload} className="btn btn-primary !px-6 !py-3">
            Get Started Now
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <div className="relative  items-center grid grid-cols-2 gap-20 md:gap-40">
          <img
            src="/images/arrow.png"
            alt=""
            className="absolute top-1/2 translate-y-1/2 z-10 left-1/2 -translate-x-1/2  rotate-0"
          />
          <div className="relative h-full md:justify-self-end max-w-sm rounded-xl bg-neutral-900 ring-inset ring-neutral-900/10 lg:rounded-2xl">
            <img
              src="/images/user5.jpg"
              alt=""
              className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-nueutral-900/10 h-full w-full"
            />
          </div>

          <WhiteBgPhone className=" md:w-48 w-30 " src="/images/user5.jpg" />
        </div>
      </div>

    </section>
  );
}

const benefits = [
  "High-quality, durable material",
  "Scratch- and fingerprint resistant coating",
  "Wireless charging compatible",
  "5years print warranty",
];
