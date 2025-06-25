/* eslint-disable @next/next/no-img-element */
export type TestimonialCardProps = {
    name: string;
    review: string
    image: string
    className: string
};
export default function TestimonialCard({image, name, review, className}: TestimonialCardProps) {
  return (
   <div className={className}>
     <div className="flex flex-col gap-4 bg-white border border-gray-100  p-4 rounded-2xl aspect-square max-w-[320px] min-w-[280px]">
      <img
        src={image}
        alt=" user1"
        className="h-12 w-12 rounded-full object-cover"
      />
      <p className="md:text-base text-sm font-semibold text-neutral-700 ">{name}</p>
      <p className="text-gray-700">
        <q>{review}</q>
      </p>
    </div>
   </div>
  );
}
