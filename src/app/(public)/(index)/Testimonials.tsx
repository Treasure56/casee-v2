import TestimonialCard from "@/components/home/TestimonialCard";

const testimonials = [
  {
    name: "Alta Chambers",
    image: "/images/user3.jpg",
    review:
      "The case was very easy to use. I can't recommend it more. I would definitely recommend it to anyone. I can't wait to use it again. Happy with the service. I will definitely be using it again.",
    className: "z-10",
  },
  {
    name: "Lou Massey",
    image: "/images/user2.jpg",
    review:
      "I like how it fits my phone. I can't wait to use it again. I would recommend it to anyone. The image was very clear and the case was very durable. I would recommend it to anyone.",
    className: "z-20 md:rotate-6",
  },
  {
    name: "Derek Shelton",
    image: "/images/user1.jpg",
    review:
      "I like how it fits my phone. I can't wait to use it again. I would recommend it to anyone. The image was very clear and the case was very durable. I would recommend it to anyone.",
    className: "z-10",
  },
];

export default function Testimonials() {
  return (
    <section className="flex flex-col gap-4  py-12 justify-center relative bg-brand-primary/1">
        <h2 className="text-center text-3xl md:text-4xl mb-8 font-bold">
          What our customers say
        </h2>
      <div className="relative flex max-md:overflow-x-auto md:justify-center flex-1 max-md:gap-4 app-container">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            className={testimonial.className}
            name={testimonial.name}
            image={testimonial.image}
            review={testimonial.review}
          />
        ))}
      </div>
    </section>
  );
}
