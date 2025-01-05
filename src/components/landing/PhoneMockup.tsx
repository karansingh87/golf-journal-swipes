import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
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
    image: "/lovable-uploads/ff6ca37a-ddc1-42ff-a2ac-1199d6b7099b.png",
    title: "Detailed Transcripts",
    description: "Review your session notes with clear, organized transcripts of your recordings."
  },
  {
    image: "/lovable-uploads/bb2a5651-bb9d-4849-bcac-67aeecd2f025.png",
    title: "Detailed Analysis",
    description: "Get comprehensive insights about your game, including session stories and mindset analysis."
  },
  {
    image: "/lovable-uploads/7c4e6f30-82be-4721-a3f9-a7b87858823a.png",
    title: "Session Insights",
    description: "Deep dive into your performance with detailed breakdowns of mindset, breakthroughs, and opportunities."
  },
  {
    image: "/lovable-uploads/0ffb7065-6622-4b6d-8945-9c03333d7f97.png",
    title: "Progress Tracking",
    description: "Track your improvements and breakthroughs with personalized insights and trend analysis."
  }
];

const PhoneMockup = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
    }, 
    [AutoPlay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section 
      className="relative py-24 overflow-hidden"
      aria-label="App screenshots showcase"
    >
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
          ref={emblaRef}
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            AutoPlay({
              delay: 4000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full max-w-[280px] mx-auto"
          aria-label="Screenshot carousel"
        >
          <CarouselContent>
            {screenshots.map((screenshot, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-[220px] aspect-[9/19] mx-auto">
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="object-cover w-full h-full rounded-xl"
                      loading="lazy"
                    />
                  </div>
                  <div className="bg-zinc-50/80 backdrop-blur-sm rounded-lg p-3.5 w-[270px] -mt-16 relative z-10 shadow-md ring-1 ring-zinc-900/5">
                    <h3 className="text-base font-medium mb-1 text-zinc-900 tracking-tight">
                      {screenshot.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-snug">
                      {screenshot.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default PhoneMockup;