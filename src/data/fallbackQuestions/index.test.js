import test from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS_PER_QUIZ } from "../../config/quiz.js";
import { getFallbackQuestions } from "./index.js";

const SUPPORTED_TOPICS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Python",
];

test("returns enough valid questions for every supported topic", () => {
  SUPPORTED_TOPICS.forEach((topicId) => {
    const questions = getFallbackQuestions(topicId);

    assert.ok(
      questions.length >= QUESTIONS_PER_QUIZ,
      `${topicId} should have at least ${QUESTIONS_PER_QUIZ} valid questions`,
    );

    questions.forEach((question) => {
      assert.ok(question.id !== null && question.id !== undefined);
      assert.equal(typeof question.question, "string");
      assert.equal(question.answers.length, 4);
      assert.ok(question.answers.includes(question.correctAnswer));
      assert.equal(typeof question.explanation, "string");
    });
  });
});

test("rejects an unknown fallback topic", () => {
  assert.throws(
    () => getFallbackQuestions("Unknown"),
    /Expected at least 10 fallback questions for topic "Unknown", but received 0/,
  );
});

test("rejects a missing fallback topic", () => {
  assert.throws(
    () => getFallbackQuestions(),
    /Expected at least 10 fallback questions for topic "undefined", but received 0/,
  );
});
