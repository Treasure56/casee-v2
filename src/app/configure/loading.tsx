import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6 app-container">
      <Skeleton className="h-[45rem] col-span-1 lg:col-span-2 w-full rounded-lg" />
      <Skeleton className="h-[37.5rem] col-span-1 w-full rounded-lg" />
    </div>
  );
}
