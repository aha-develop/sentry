/**
 * Sentry API EndPoint
 */
const EU_API_URL = "https://de.sentry.io/api/0";
const US_API_URL = "https://sentry.io/api/0";

export const DEFAULT_REGION = "us";

export const API_URL_MAPPING = {
  eu: EU_API_URL,
  us: US_API_URL,
};

/**
 * Pagination Limit
 */
export const MAX_RESULTS = 50;

/**
 * Auth Retry Max Count
 *
 */
export const MAX_RETRY_COUNT = 3;

/**
 * Aha Extension Identifier
 *
 */
export const IDENTIFIER = "aha-develop.sentry";
