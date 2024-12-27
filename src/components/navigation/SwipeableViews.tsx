import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Notes from "@/pages/Notes";
import Trends from "@/pages/Trends";
import type { CarouselApi } from "@/components/ui/carousel";

const SwipeableViews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(location.pathname === "/trends" ? 1 : 0);

  // Handle carousel changes
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrentIndex(selectedIndex);
      
      // Update route based on selected index
      if (selectedIndex === 0 && location.pathname !== "/notes") {
        navigate("/notes");
      } else if (selectedIndex === 1 && location.pathname !== "/trends") {
        navigate("/trends");
      }
    });
  }, [api, navigate, location.pathname]);

  // Sync carousel with route changes
  useEffect(() => {
    if (!api) return;
    
    const targetIndex = location.pathname === "/trends" ? 1 : 0;
    if (currentIndex !== targetIndex) {
      api.scrollTo(targetIndex);
    }
  }, [api, location.pathname, currentIndex]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        dragFree: false,
        containScroll: "trimSnaps",
      }}
      className="w-full"
    >
      <CarouselContent>
        <CarouselItem className="basis-full">
          <Notes />
        </CarouselItem>
        <CarouselItem className="basis-full">
          <Trends />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default SwipeableViews;