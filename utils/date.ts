// Format a date string as "Mon DD" (e.g., "Aug 28")
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    return "Invalid Date";
  }
};
