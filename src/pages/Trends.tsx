import { useEffect } from "react";
import SegmentedNav from "@/components/navigation/SegmentedNav";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PatternCard from "@/components/trends/PatternCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPagination,
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useTrends } from "@/hooks/useTrends";

const Trends = () => {
  const session = useSession();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  if (!session) {
    navigate('/login');
    return null;
  }

  const {
    isLoading,
    trendsData,
    recordingsCount,
    milestone,
    fetchLatestTrends,
    fetchRecordingsCount,
    generateTrends
  } = useTrends(session.user.id);

  useEffect(() => {
    fetchLatestTrends();
    fetchRecordingsCount();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-7xl mx-auto py-6 space-y-4">
        <div className="space-y-4 px-4 sm:px-6 md:px-8">
          {/* Header section */}
          <h1 className="text-2xl font-semibold text-foreground">Trends</h1>
          
          <SegmentedNav />

          {/* Generate Trends Button - Repositioned and Compact */}
          <div className="flex justify-end -mt-2">
            <Button 
              onClick={generateTrends} 
              disabled={isLoading || recordingsCount < 3}
              size="sm"
              className="text-xs h-7 px-3"
            >
              {isLoading && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              Generate Trends
            </Button>
          </div>
          
          {recordingsCount < 3 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You need at least 3 recordings to generate trends. You currently have {recordingsCount} recording{recordingsCount !== 1 ? 's' : ''}.
              </AlertDescription>
            </Alert>
          )}
          
          {milestone && (
            <Alert>
              <AlertDescription>
                🎉 {milestone === 'return' 
                  ? "Welcome back! Here's an analysis of your recent progress." 
                  : `Congratulations on reaching your ${milestone} recording milestone!`}
              </AlertDescription>
            </Alert>
          )}
          
          {trendsData ? (
            <div className="flex flex-col gap-4">
              <Carousel
                className="w-full"
                opts={{
                  align: "center",
                  containScroll: false,
                  dragFree: false,
                }}
              >
                <CarouselContent>
                  <AnimatePresence mode="wait">
                    {trendsData.patterns?.map((pattern: any, index: number) => (
                      <CarouselItem key={index}>
                        <PatternCard pattern={pattern} />
                      </CarouselItem>
                    ))}
                  </AnimatePresence>
                </CarouselContent>
              </Carousel>
              <CarouselPagination count={trendsData.patterns?.length || 0} />
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center text-muted-foreground">
                {recordingsCount >= 3 
                  ? "No trends data available. Click \"Generate Trends\" to create new trends."
                  : "Record more sessions to unlock trends analysis."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;