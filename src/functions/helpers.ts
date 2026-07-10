export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

import crypto from "crypto";

// Generate a cryptographically secure 6-digit OTP.
export function generateOtp(): string {
  return crypto.randomInt(100_000, 999_999).toString();
}

// Extract and format Zod validation errors into a field error map.
export function extractFieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  issues.forEach((issue) => {
    if (issue.path[0] !== undefined) {
      const key = issue.path[0].toString();
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
  });
  return fieldErrors;
}
