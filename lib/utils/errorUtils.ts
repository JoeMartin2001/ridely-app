/**
 * Resolves error messages from various error object shapes
 * @param error - The error object to resolve
 * @param fallback - Fallback message if error cannot be resolved
 * @returns The resolved error message or fallback
 */
export const resolveErrorMessage = (
  error: unknown,
  fallback: string | null
): string | null => {
  if (!error) return null;

  if (typeof error === "object") {
    if ("data" in (error as Record<string, unknown>)) {
      const data = (error as { data?: unknown }).data;

      if (
        data &&
        typeof data === "object" &&
        "message" in (data as Record<string, unknown>)
      ) {
        const message = (data as { message?: unknown }).message;
        if (typeof message === "string" && message.trim().length > 0) {
          return message;
        }
      }
    }

    if ("message" in (error as Record<string, unknown>)) {
      const message = (error as { message?: unknown }).message;
      if (typeof message === "string" && message.trim().length > 0) {
        return message;
      }
    }
  }

  return fallback;
};

