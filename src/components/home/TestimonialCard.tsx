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
     <div className="flex flex-col gap-4 bg-card border border-border  p-4 rounded-2xl aspect-square max-w-[320px] min-w-[280px]">
      <img
        src={image}
        alt=" user1"
        className="h-12 w-12 rounded-full object-cover"
      />
      <p className="md:text-base text-sm font-semibold text-foreground ">{name}</p>
      <p className="text-muted-foreground">
        <q>{review}</q>
      </p>
    </div>
   </div>
  );
}
