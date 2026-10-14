/** Shared key for contact form payloads stored before redirecting home. */
export const CONTACT_STORAGE_KEY = "portfolioContactSubmission";

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

