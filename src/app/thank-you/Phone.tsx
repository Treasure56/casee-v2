import PhonePreview from "@/components/ui/PreviewPhone";

export default function Phone({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-muted/20 ring-1 ring-border lg:rounded-2xl shadow-xl shadow-black/10">
      <PhonePreview croppedImageUrl={croppedImageUrl} color={color} />
    </div>
  );
}
