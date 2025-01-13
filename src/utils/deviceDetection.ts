export const isIOSDevice = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

export const isMobileDevice = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);