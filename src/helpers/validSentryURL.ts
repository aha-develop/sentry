/**
 * Validate Sentry URL
 *
 * @param url
 * @returns
 */
export const validSentryURL = (url) => {
  const urlObj = new URL(url);
  return urlObj.origin === "https://sentry.io";
};
