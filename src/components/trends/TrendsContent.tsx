import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import PatternCard from "./PatternCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPagination,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

interface TrendsContentProps {
  trendsData: any | null;
  recordingsCount: number;
  milestone: string | null;
  isLoading: boolean;
  hasNewRecordings?: boolean;
}

const TrendsContent = ({ 
  trendsData, 
  recordingsCount, 
  milestone, 
  isLoading,
  hasNewRecordings 
}: TrendsContentProps) => {
  if (isLoading && hasNewRecordings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <RefreshCw className="w-8 h-8 text-muted-foreground animate-spin" />
        <p className="text-muted-foreground text-center">
          Just a moment, your latest trends are on the way!
        </p>
      </div>
    );
  }

  if (recordingsCount < 3) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You need at least 3 recordings to generate trends. You currently have {recordingsCount} recording{recordingsCount !== 1 ? 's' : ''}.
        </AlertDescription>
      </Alert>
    );
  }

  if (milestone) {
    return (
      <Alert>
        <AlertDescription>
          🎉 {milestone === 'return' 
            ? "Welcome back! Here's an analysis of your recent progress." 
            : `Congratulations on reaching your ${milestone} recording milestone!`}
        </AlertDescription>
      </Alert>
    );
  }

  if (!trendsData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center text-muted-foreground">
          {recordingsCount >= 3 
            ? "No trends data available. Click the refresh button to generate new trends."
            : "Record more sessions to unlock trends analysis."}
        </div>
      </div>
    );
  }

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "center",
        containScroll: false,
        dragFree: false,
      }}
    >
      <CarouselContent>
        {trendsData.patterns?.map((pattern: any, index: number) => (
          <CarouselItem key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PatternCard pattern={pattern} />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPagination count={trendsData.patterns?.length || 0} />
    </Carousel>
  );
};

export default TrendsContent;