import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    quote: "It's like having a golf coach who remembers everything you've ever discussed.",
    author: "Mark S.",
    title: "12 Handicap"
  },
  {
    quote: "Found swing changes I made 3 months ago that I'd completely forgotten about. Game-changer.",
    author: "Sarah T.",
    title: "Scratch Golfer"
  },
  {
    quote: "Love how it captures my thoughts right after a round. The AI finds patterns I never would have noticed myself.",
    author: "Jordan M.",
    title: "Club Champion"
  }
];

const TestimonialsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  useEffect(() => {
    if (emblaApi) {
      console.log("Carousel initialized");
    }
  }, [emblaApi]);

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] min-w-0"
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;