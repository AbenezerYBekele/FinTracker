/**
 * Formats an ISO-like date string into a readable format (e.g., "May 20, 2025").
 * This version handles invalid or missing input gracefully and corrects for common timezone issues.
 *
 * @param {string | null | undefined} dateString The date string to format (e.g., "2025-05-20T10:00:00.000Z").
 * @returns {string} The formatted date string, or an empty string if the input is invalid.
 */
export function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
}