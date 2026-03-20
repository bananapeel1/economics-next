/**
 * Simple in-memory rate limiter for API routes.
 * Note: In serverless environments, this resets per instance.
 * For production, consider Upstash Redis or Vercel KV.
 */

const limiters = new Map();

/**
 * Rate limit a user action.
 * @param {string} key - Unique identifier (e.g. userId + endpoint)
 * @param {number} maxRequests - Maximum requests allowed in the window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {{ allowed: boolean, remaining: number, resetAt: number }}
 */
export function rateLimit(key, maxRequests = 30, windowMs = 24 * 60 * 60 * 1000) {
  const now = Date.now();
  let entry = limiters.get(key);

  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs };
    limiters.set(key, entry);
  }

  entry.count++;

  // Clean up old entries periodically (every 100 checks)
  if (Math.random() < 0.01) {
    for (const [k, v] of limiters) {
      if (now > v.resetAt) limiters.delete(k);
    }
  }

  return {
    allowed: entry.count <= maxRequests,
    remaining: Math.max(0, maxRequests - entry.count),
    resetAt: entry.resetAt,
  };
}
