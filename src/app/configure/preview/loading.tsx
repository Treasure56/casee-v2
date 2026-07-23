import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="app-container py-12 flex flex-col gap-6">
      <Skeleton className="size-10 rounded-full" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <Skeleton className="h-[37.5rem] md:col-span-4 w-full rounded-lg" />
        <Skeleton className="h-[37.5rem] md:col-span-8 w-full rounded-lg" />
      </div>
    </div>
  );
}
