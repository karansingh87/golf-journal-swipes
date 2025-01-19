import ReactGA from "react-ga4";

// Authentication Events
export const trackUserSignup = () => {
  ReactGA.event({
    category: "User",
    action: "Signed Up"
  });
};

export const trackUserLogin = () => {
  ReactGA.event({
    category: "User",
    action: "Logged In"
  });
};

// Recording Events
export const trackRecordingCreated = (type: 'voice' | 'text', duration?: number) => {
  ReactGA.event({
    category: "Recording",
    action: "Created Recording",
    label: type,
    value: duration // Only included for voice recordings
  });
};

// Playbook Events
export const trackLessonPrepGenerated = (recordingCount: number) => {
  ReactGA.event({
    category: "Playbook",
    action: "Generated Lesson Prep",
    value: recordingCount
  });
};

export const trackPepTalkGenerated = (recordingCount: number) => {
  ReactGA.event({
    category: "Playbook",
    action: "Generated Pep Talk",
    value: recordingCount
  });
};

export const trackTrendsViewed = () => {
  ReactGA.event({
    category: "Playbook",
    action: "Viewed Trends"
  });
};

export const trackCoachNotesCreated = () => {
  ReactGA.event({
    category: "Playbook",
    action: "Created Coach Notes"
  });
};

// Feature Engagement Events
export const trackAnalysisTimeSpent = (timeInSeconds: number) => {
  ReactGA.event({
    category: "Engagement",
    action: "Analysis Time Spent",
    value: timeInSeconds
  });
};

export const trackRecordingShared = (type: 'recording' | 'coach_notes') => {
  ReactGA.event({
    category: "Engagement",
    action: "Shared Content",
    label: type
  });
};

// Initialize GA (call this in your App.tsx)
export const initializeGA = (measurementId: string) => {
  ReactGA.initialize(measurementId);
};

// Track page views (call this on route changes)
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};