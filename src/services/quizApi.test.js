import test from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS_PER_QUIZ } from "../config/quiz.js";
import { fetchQuizQuestions } from "./quizApi.js";

const topic = {
  name: "HTML",
  apiQuizId: "html-quiz",
};

const makeApiQuestions = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: `question-${index + 1}`,
    text: `Question ${index + 1}`,
    answers: [
      { text: "Answer A", isCorrect: true },
      { text: "Answer B", isCorrect: false },
      { text: "Answer C", isCorrect: false },
      { text: "Answer D", isCorrect: false },
    ],
    explanation: `Explanation ${index + 1}`,
  }));

const mockSuccessfulResponse = (testContext, questions) => {
  testContext.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    json: async () => ({ data: questions }),
  }));
};

test("rejects an API source with fewer than the minimum questions", async (t) => {
  mockSuccessfulResponse(t, makeApiQuestions(QUESTIONS_PER_QUIZ - 1));

  await assert.rejects(
    () => fetchQuizQuestions(topic),
    new RegExp(
      `Expected at least ${QUESTIONS_PER_QUIZ} questions, but received ${QUESTIONS_PER_QUIZ - 1}`,
    ),
  );
});

test("accepts an API source with the minimum number of questions", async (t) => {
  mockSuccessfulResponse(t, makeApiQuestions(QUESTIONS_PER_QUIZ));

  const questions = await fetchQuizQuestions(topic);

  assert.equal(questions.length, QUESTIONS_PER_QUIZ);
});

test("accepts an API source with more than the minimum questions", async (t) => {
  mockSuccessfulResponse(t, makeApiQuestions(QUESTIONS_PER_QUIZ + 1));

  const questions = await fetchQuizQuestions(topic);

  assert.equal(questions.length, QUESTIONS_PER_QUIZ + 1);
});
