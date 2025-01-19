import ReactGA from "react-ga4";

// User Events
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
export const trackRecordingCreated = (type: 'voice' | 'text') => {
  ReactGA.event({
    category: "Recording",
    action: "Created Recording",
    label: type
  });
};

export const trackRecordingShared = () => {
  ReactGA.event({
    category: "Recording",
    action: "Shared Recording"
  });
};

// Playbook Events
export const trackPlaybookAccess = () => {
  ReactGA.event({
    category: "Playbook",
    action: "Accessed Playbook"
  });
};

export const trackNotesGenerated = () => {
  ReactGA.event({
    category: "Playbook",
    action: "Generated Notes"
  });
};

// Subscription Events
export const trackSubscriptionStarted = (tier: string) => {
  ReactGA.event({
    category: "Subscription",
    action: "Started Subscription",
    label: tier
  });
};

export const trackSubscriptionCancelled = () => {
  ReactGA.event({
    category: "Subscription",
    action: "Cancelled Subscription"
  });
};