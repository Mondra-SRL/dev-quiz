export const QUIZ_DURATION_SECONDS = 10 * 60;
export const MIN_LOADING_DISPLAY_MS = 1000;
export const QUESTIONS_PER_QUIZ = 10;
export const QUIZ_LOAD_ERROR_MESSAGE =
  "We couldn't load enough valid questions for this quiz. Please return home and try again.";

// Announce only useful countdown milestones so screen-reader users are not
// interrupted by an update every second.
export const TIMER_ANNOUNCEMENTS = {
  300: "5 minutes remaining",
  60: "1 minute remaining",
  30: "30 seconds remaining",
  10: "10 seconds remaining",
  0: "Time is up",
};