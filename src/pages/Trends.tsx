import SegmentedNav from "@/components/navigation/SegmentedNav";

const Trends = () => {
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-4xl mx-auto py-6 space-y-6">
        <div className="space-y-6 px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Trends</h1>
          </div>
          <SegmentedNav />
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center text-muted-foreground">
              Trends and insights coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;