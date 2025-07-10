import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className=" grid md:grid-cols-2 overflow-hidden">
      <div className="flex flex-col app-container justify-center items-center">
        <div className="max-w-[400px] w-full">{children}</div>
      </div>
      <div className="h-full max-md:hidden">
        <Image
          src="/images/auth-img.jpeg"
          alt="casee illustration"
          width={500}
          height={500}
          className="object-cover h-full w-full"
        />
      </div>
    </section>
  );
}
