import { dbConnect } from "@/lib/db";
import Configuration from "@/types/Configuration";
import ThankYou from "./ThankYou";

type PageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const configId = params.id;

  let configData = {};

  if (configId) {
    try {
      await dbConnect();
      const config = await Configuration.findById(configId).lean();
      if (config) {
        configData = {
          configId: config._id.toString(),
          imageUrl: config.imageUrl,
          color: config.color,
          phoneModel: config.phoneModel,
          materialValue: config.material,
          finishValue: config.finish,
        };
      }
    } catch (error) {
      console.error("Error fetching order configuration:", error);
    }
  }

  return <ThankYou {...configData} />;
}
