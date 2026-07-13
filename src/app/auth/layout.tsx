import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid md:grid-cols-2 min-h-[calc(100vh-7.5rem)] overflow-hidden">
      <div className="flex flex-col app-container justify-center items-center py-12 md:py-16">
        <div className="max-w-[400px] w-full">{children}</div>
      </div>
      <div className="relative w-full h-full min-h-[500px] max-md:hidden">
        <Image
          src="/images/auth-img.jpeg"
          alt="casee illustration"
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}

