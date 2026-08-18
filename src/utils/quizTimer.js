import { TIMER_ANNOUNCEMENTS } from "../config/quiz.js";

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
