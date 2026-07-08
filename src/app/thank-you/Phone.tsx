import PhonePreview from "@/components/ui/PreviewPhone";

export default function Phone() {
  return (
    <div className="overflow-hidden rounded-xl bg-muted/50 ring-1 ring-border lg:rounded-2xl">
      <PhonePreview croppedImageUrl={"/images/user1.jpg"} color={"black"} />
    </div>
  );
}
