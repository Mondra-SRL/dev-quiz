import { getValidQuizQuestions } from "../../utils/normalizeQuizQuestion.js";
import { QUESTIONS_PER_QUIZ } from "../../config/quiz.js";
import htmlQuestions from "./html.js";
import cssQuestions from "./css.js";
import jsQuestions from "./javascript.js";
import tsQuestions from "./typescript.js";
import reactQuestions from "./react.js";
import pythonQuestions from "./python.js";

const fallbackQuestionsByTopic = {
  HTML: htmlQuestions,
  CSS: cssQuestions,
  JavaScript: jsQuestions,
  TypeScript: tsQuestions,
  React: reactQuestions,
  Python: pythonQuestions,
};

export function getFallbackQuestions(topicId) {
  const rawQuestions = fallbackQuestionsByTopic[topicId] ?? [];

  // Normalize and validate the fallback data before checking its size.
  const questions = getValidQuizQuestions(rawQuestions);

  if (questions.length < QUESTIONS_PER_QUIZ) {
    throw new RangeError(
      `Expected at least ${QUESTIONS_PER_QUIZ} fallback questions for topic "${topicId}", but received ${questions.length}.`,
    );
  }

  return questions;
}
