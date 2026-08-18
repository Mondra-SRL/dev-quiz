import test from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS_PER_QUIZ } from "../config/quiz.js";
import { prepareQuizQuestions } from "./quizQuestionSession.js";

function createQuestion(index) {
  return {
    id: index,
    question: `Question ${index}`,
    answers: [`Answer ${index}A`, `Answer ${index}B`],
    correctAnswer: `Answer ${index}A`,
  };
}

test("limits the session to the configured number of questions", () => {
  const questions = Array.from(
    { length: QUESTIONS_PER_QUIZ + 2 },
    (_, index) => createQuestion(index),
  );

  assert.equal(prepareQuizQuestions(questions).length, QUESTIONS_PER_QUIZ);
});

test("does not mutate the source questions or their answers", () => {
  const questions = [createQuestion(1), createQuestion(2)];
  const originalQuestions = structuredClone(questions);

  prepareQuizQuestions(questions);

  assert.deepEqual(questions, originalQuestions);
});
