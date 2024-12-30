import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    quote: "Found swing changes I made 3 months ago that I'd completely forgotten about. Game-changer for my progress.",
    author: "Sarah Thompson",
    title: "Scratch Golfer"
  },
  {
    quote: "It's like having a golf coach who remembers everything you've ever discussed. The insights are incredible.",
    author: "Mark Stevens",
    title: "12 Handicap"
  },
  {
    quote: "Love how it captures my thoughts right after a round. The AI finds patterns I never would have noticed.",
    author: "Jordan Mitchell",
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
    <section className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-zinc-800/50 backdrop-blur-sm mb-4">
            <span className="text-sm font-medium text-white/80">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white">
            What <span className="font-serif italic">others</span> are saying.
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Trusted by golfers who value simplicity and results.
          </p>
        </div>

        {/* Carousel */}
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