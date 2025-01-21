import '@testing-library/jest-dom';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.URL.createObjectURL
global.URL.createObjectURL = jest.fn();

// Mock MediaRecorder
global.MediaRecorder = class MediaRecorder {
  start() {}
  stop() {}
  pause() {}
  resume() {}
  requestData() {}
  addEventListener() {}
  removeEventListener() {}
};

// Mock navigator.mediaDevices
Object.defineProperty(window.navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue({}),
  },
});

// Suppress console errors during tests
console.error = jest.fn();