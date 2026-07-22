import { dbConnect } from "@/lib/db";
import Configuration from "@/types/Configuration";
import CaseDetails from "./CaseDetails";
import DesignedCase from "./DesignedCase";
import { notFound } from "next/navigation";
import { ImageLayer } from "@/types/designConfig";
import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";

type PageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const configId = params.id;

  if (!configId) {
    return notFound();
  }

  await dbConnect();
  const config = await Configuration.findById(configId).lean();

  if (!config) {
    return notFound();
  }

  const hasValidBaseImage =
    Boolean(config.imageUrl) &&
    config.imageUrl !== "/images/clearphone.png" &&
    config.imageUrl.trim() !== "";

  // Parse images list with legacy fallback formatting
  const images: ImageLayer[] = (config.images && config.images.length > 0)
    ? JSON.parse(JSON.stringify(config.images)).map((img: any) => ({
        id: img.id,
        url: img.url,
        width: img.width,
        height: img.height,
        x: img.x,
        y: img.y,
        renderedWidth: img.renderedWidth,
        renderedHeight: img.renderedHeight,
        rotation: img.rotation || 0,
        flipH: img.flipH || false,
        flipV: img.flipV || false,
        opacity: img.opacity !== undefined ? img.opacity : 1,
        removeBg: img.removeBg || false,
      }))
    : hasValidBaseImage
    ? [
        {
          id: "base",
          url: config.imageUrl,
          width: config.width,
          height: config.height,
          x: config.x || 40,
          y: config.y || 120,
          renderedWidth: config.renderedWidth || 150,
          renderedHeight: config.renderedHeight || 300,
          rotation: 0,
          flipH: false,
          flipV: false,
          opacity: 1,
          removeBg: false,
        },
      ]
    : [];

  return (
    <div className="app-container py-12 flex flex-col gap-6">
      {/* Back Icon Button */}
      <div className="self-start">
        <Link
          href={`/configure/design?id=${configId}`}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-foreground hover:bg-secondary cursor-pointer hover:border-brand-primary/60 transition-all duration-300 shadow-sm"
          title="Back to design"
        >
          <LuChevronLeft className="size-5" />
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="flex flex-col md:col-span-4">
          <DesignedCase
            images={images}
            colorValue={config.color || "black-titanium"}
            modelValue={config.phoneModel || "iphone15"}
          />
        </div>
        <div className="md:col-span-8">
          <CaseDetails
            configId={configId}
            colorValue={config.color || "black-titanium"}
            modelValue={config.phoneModel || "iphone15"}
            materialValue={config.material || "silicone"}
            finishValue={config.finish || "smooth"}
          />
        </div>
      </div>
    </div>
  );
}
