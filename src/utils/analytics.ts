import ReactGA from "react-ga4";

// Authentication Events
export const trackSignUp = () => {
  ReactGA.event({
    category: "Authentication",
    action: "Sign Up",
  });
};

export const trackLogin = () => {
  ReactGA.event({
    category: "Authentication",
    action: "Login",
  });
};

// Recording Events
export const trackRecordingCreation = (type: 'voice' | 'text', durationSeconds?: number) => {
  ReactGA.event({
    category: "Recording",
    action: "Create Recording",
    label: type,
    value: durationSeconds,
  });
};

// Playbook Feature Usage
export const trackLessonPrepGeneration = (numRecordings: number) => {
  ReactGA.event({
    category: "Playbook",
    action: "Generate Lesson Prep",
    value: numRecordings,
  });
};

export const trackPepTalkGeneration = (numRecordings: number) => {
  ReactGA.event({
    category: "Playbook",
    action: "Generate Pep Talk",
    value: numRecordings,
  });
};

export const trackTrendsView = () => {
  ReactGA.event({
    category: "Playbook",
    action: "View Trends",
  });
};

export const trackCoachNotesCreation = () => {
  ReactGA.event({
    category: "Playbook",
    action: "Create Coach Notes",
  });
};

// Feature Engagement
export const trackAnalysisTimeSpent = (durationSeconds: number) => {
  ReactGA.event({
    category: "Engagement",
    action: "Analysis Time Spent",
    value: Math.round(durationSeconds),
  });
};

export const trackPublicSharing = (type: 'recording' | 'coach_notes') => {
  ReactGA.event({
    category: "Engagement",
    action: "Public Share",
    label: type,
  });
};

// Initialize GA (if not already initialized)
export const initGA = () => {
  ReactGA.initialize("G-3VEFQ2RGDH");
};