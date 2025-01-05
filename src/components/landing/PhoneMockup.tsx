import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselPagination,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

interface ScreenshotData {
  image: string;
  title: string;
  description: string;
}

const screenshots: ScreenshotData[] = [
  {
    image: "/lovable-uploads/5b5a8acd-ebd3-4b28-aa6f-e580187f2173.png",
    title: "Record Your Thoughts",
    description: "Easily capture your golf sessions with voice recordings - quick, simple, and hands-free."
  },
  {
    image: "/lovable-uploads/bb2a5651-bb9d-4849-bcac-67aeecd2f025.png",
    title: "Detailed Analysis",
    description: "Get comprehensive insights about your game, including session stories and mindset analysis."
  }
];

const PhoneMockup = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoPlay({ delay: 4000 })]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut"
            }
          }
        }}
        className="container px-4 mx-auto"
      >
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            AutoPlay({
              delay: 4000,
            }),
          ]}
          className="w-full max-w-[400px] mx-auto"
        >
          <CarouselContent>
            {screenshots.map((screenshot, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative w-full aspect-[9/19] rounded-[2.5rem] overflow-hidden shadow-lg">
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-center max-w-[80%]">
                    <h3 className="text-xl font-semibold mb-2">{screenshot.title}</h3>
                    <p className="text-muted-foreground">{screenshot.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex items-center justify-center mt-8 space-x-4">
            <CarouselPrevious className="relative static translate-y-0" />
            <CarouselPagination />
            <CarouselNext className="relative static translate-y-0" />
          </div>
        </Carousel>

        {/* Decorative Elements */}
        <div className="absolute -z-10 blur-3xl opacity-20 -inset-x-20 -top-20 -bottom-20 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 animate-pulse"></div>
      </motion.div>
    </section>
  );
};

export default PhoneMockup;