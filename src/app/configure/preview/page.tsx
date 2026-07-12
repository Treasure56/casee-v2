import { dbConnect } from "@/lib/db";
import Configuration from "@/types/Configuration";
import CaseDetails from "./CaseDetails";
import DesignedCase from "./DesignedCase";
import { notFound } from "next/navigation";

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

  return (
    <div className="app-container py-12 grid grid-cols-12 gap-6 items-center">
      <div className="flex flex-col md:col-span-4">
        <DesignedCase
          imageUrl={config.imageUrl}
          colorValue={config.color || "black-titanium"}
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
