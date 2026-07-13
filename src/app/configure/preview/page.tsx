import { dbConnect } from "@/lib/db";
import Configuration from "@/types/Configuration";
import CaseDetails from "./CaseDetails";
import DesignedCase from "./DesignedCase";
import { notFound } from "next/navigation";
import { ImageLayer } from "@/types/designConfig";

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
      }))
    : [
        {
          id: "base",
          url: config.imageUrl,
          width: config.width,
          height: config.height,
          x: config.x || 40,
          y: config.y || 120,
          renderedWidth: config.renderedWidth || 150,
          renderedHeight: config.renderedHeight || 300,
        },
      ];

  return (
    <div className="app-container py-12 grid grid-cols-12 gap-6 items-center">
      <div className="flex flex-col md:col-span-4">
        <DesignedCase
          images={images}
          colorValue={config.color || "black-titanium"}
          modelValue={config.phoneModel || "iphone15"}
        />
      </div>
      <div className="md:col-span-8">
        <CaseDetails
          colorValue={config.color || "black-titanium"}
          modelValue={config.phoneModel || "iphone15"}
          materialValue={config.material || "silicone"}
          finishValue={config.finish || "smooth"}
        />
      </div>
    </div>
  );
}
