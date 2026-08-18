import { QUESTIONS_PER_QUIZ } from "../config/quiz.js";
import { shuffleArray } from "./shuffleArray.js";

export function prepareQuizQuestions(questions) {
  return shuffleArray(questions)
    .slice(0, QUESTIONS_PER_QUIZ)
    .map((question) => ({
      ...question,
      answers: shuffleArray(question.answers),
    }));
}
