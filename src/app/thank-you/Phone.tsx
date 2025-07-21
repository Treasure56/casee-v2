import PhonePreview from "@/components/ui/PreviewPhone";

export default function Phone() {
  return (
    <div className="overflow-hidden rounded-xl bg-gray-900/5 ring-1 ring-gray-900/10 lg:rounded-2xl">
      <PhonePreview croppedImageUrl={"/images/user1.jpg"} color={"black"} />
    </div>
  );
}
