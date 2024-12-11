interface RecordingTimerProps {
  recordingTime: number;
}

const RecordingTimer = ({ recordingTime }: RecordingTimerProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-mono text-4xl font-bold text-green-400 tracking-wider">
      {formatTime(recordingTime)}
    </div>
  );
};

export default RecordingTimer;