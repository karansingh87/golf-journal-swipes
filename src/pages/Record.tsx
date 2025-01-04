import VoiceRecorderContainer from "@/components/VoiceRecorderContainer";

const Record = () => {
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="max-w-7xl mx-auto pt-14">
        <div className="px-4 sm:px-6 lg:px-8">
          <VoiceRecorderContainer />
        </div>
      </div>
    </div>
  );
};

export default Record;