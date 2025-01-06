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
}

const screenshots: ScreenshotData[] = [
  {
    image: "/lovable-uploads/5b5a8acd-ebd3-4b28-aa6f-e580187f2173.png",
    title: "Press record and talk",
  },
  {
    image: "/lovable-uploads/ff6ca37a-ddc1-42ff-a2ac-1199d6b7099b.png",
    title: "Watch your words flow live",
  },
  {
    image: "/lovable-uploads/bb2a5651-bb9d-4849-bcac-67aeecd2f025.png",
    title: "AI analyzes your golf mind",
  },
  {
    image: "/lovable-uploads/7c4e6f30-82be-4721-a3f9-a7b87858823a.png",
    title: "Uncover your deep insights",
  },
  {
    image: "/lovable-uploads/0ffb7065-6622-4b6d-8945-9c03333d7f97.png",
    title: "See patterns across time",
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
      duration: 50,
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
      className="relative py-12 overflow-hidden"
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
            duration: 50,
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
                  <p className="font-poppins font-[400] text-base text-center">
                    {screenshot.title}
                  </p>
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