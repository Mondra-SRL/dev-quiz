// announce only useful countdown milestones so screen-reader users are not
// interrupted by an update every second.
export const TIMER_ANNOUNCEMENTS = {
  300: "5 minutes remaining",
  60: "1 minute remaining",
  30: "30 seconds remaining",
  10: "10 seconds remaining",
  0: "Time is up",
};

export function formatQuizTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function getQuizProgressPercentage(secondsRemaining, totalSeconds) {
  return (secondsRemaining / totalSeconds) * 100;
}

export function getTimerAnnouncement(
  secondsRemaining,
  announcements = TIMER_ANNOUNCEMENTS,
) {
  return announcements[secondsRemaining] ?? "";
}
