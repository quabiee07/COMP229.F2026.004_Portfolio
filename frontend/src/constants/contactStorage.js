/** Shared key for contact form payloads stored before redirecting home. */
export const CONTACT_STORAGE_KEY = "portfolioContactSubmission";

/**
 * Safely read a contact form submission from sessionStorage.
 * Returns null when missing or unreadable so callers never crash.
 */
export function readContactSubmission() {
  try {
    if (typeof sessionStorage === "undefined") {
      return null;
    }

    const rawPayload = sessionStorage.getItem(CONTACT_STORAGE_KEY);
    if (!rawPayload) {
      return null;
    }

    const parsedPayload = JSON.parse(rawPayload);
    if (!parsedPayload || typeof parsedPayload !== "object") {
      return null;
    }

    return parsedPayload;
  } catch (readError) {
    console.error("Could not read contact submission:", readError);
    return null;
  }
}

/**
 * Persist a contact submission. Returns false if storage is unavailable.
 */
export function saveContactSubmission(submissionPayload) {
  try {
    if (typeof sessionStorage === "undefined") {
      return false;
    }

    sessionStorage.setItem(
      CONTACT_STORAGE_KEY,
      JSON.stringify(submissionPayload)
    );
    return true;
  } catch (saveError) {
    console.error("Could not save contact submission:", saveError);
    return false;
  }
}

/**
 * Clear a stored contact submission without throwing.
 */
export function clearContactSubmission() {
  try {
    if (typeof sessionStorage === "undefined") {
      return;
    }
    sessionStorage.removeItem(CONTACT_STORAGE_KEY);
  } catch (clearError) {
    console.error("Could not clear contact submission:", clearError);
  }
}
