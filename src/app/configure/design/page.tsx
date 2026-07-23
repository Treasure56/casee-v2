import { dbConnect } from "@/lib/db";
import Configuration from "@/types/Configuration";
import DesignWorkspace from "./DesignWorkspace";

type PageProps = {
  searchParams: Promise<{
    id?: string;
    imageUrl?: string;
    width?: string;
    height?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const configId = params.id || "";
  const imageUrl = params.imageUrl || "";
  const width = parseInt(params.width || "300");
  const height = parseInt(params.height || "600");

  let initialConfig = null;

  if (configId) {
    try {
      await dbConnect();
      const config = await Configuration.findById(configId).lean();
      if (config) {
        initialConfig = {
          id: config._id.toString(),
          imageUrl: config.imageUrl,
          width: config.width,
          height: config.height,
          color: config.color,
          model: config.phoneModel,
          material: config.material,
          finish: config.finish,
          images: config.images ? JSON.parse(JSON.stringify(config.images)) : [],
        };
      }
    } catch (err) {
      console.error("Error fetching initial configuration:", err);
    }
  }

  return (
    <DesignWorkspace
      configId={configId}
      imageUrl={imageUrl}
      width={width}
      height={height}
      initialConfig={initialConfig}
    />
  );
}
