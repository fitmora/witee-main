/**
 * Tracks user events.
 * Currently logs to console, but can be extended to connect with GA/Mixpanel.
 */
export const trackEvent = (eventName: string, params: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Event: ${eventName}`, params);
  }
  // Integration point for real analytics tools
};
