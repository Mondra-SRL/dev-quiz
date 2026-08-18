import test from "node:test";
import assert from "node:assert/strict";
import {
  formatQuizTime,
  getQuizProgressPercentage,
  getTimerAnnouncement,
} from "./quizTimer.js";

test("formats quiz time as minutes and zero-padded seconds", () => {
  assert.equal(formatQuizTime(300), "5:00");
  assert.equal(formatQuizTime(65), "1:05");
});

test("calculates quiz timer progress as a percentage", () => {
  assert.equal(getQuizProgressPercentage(300, 600), 50);
});

test("returns announcements only for configured timer milestones", () => {
  assert.equal(getTimerAnnouncement(60), "1 minute remaining");
  assert.equal(getTimerAnnouncement(59), "");
});
