import { MIN_QUESTIONS } from "../config/quiz.js";
import { getValidQuizQuestions } from "../utils/normalizeQuizQuestion.js";

const API_BASE_URL = "/api/quiz";

const buildUrl = (baseUrl, params) => {
  const search = new URLSearchParams(params).toString();
  return `${baseUrl}?${search}`;
};

const normalizeQuestion = (apiQuestion) => {
  if (typeof apiQuestion?.text !== "string" || apiQuestion.text.trim() === "") {
    return null;
  }

  const rawAnswers = Array.isArray(apiQuestion.answers)
    ? apiQuestion.answers
    : [];

  const answers = rawAnswers
    .map((answer) => answer?.text)
    .filter((text) => typeof text === "string" && text.trim() !== "");

  const correctAnswers = rawAnswers.filter(
    (answer) => answer?.isCorrect === true,
  );

  // Phase 3 - Validate values that are specific to the API response.
  if (answers.length !== rawAnswers.length || correctAnswers.length !== 1) {
    return null;
  }

  const explanation = apiQuestion.explanation;

  return {
    id: apiQuestion.id,
    question: apiQuestion.text,
    answers,
    correctAnswer: correctAnswers[0].text,
    explanation,
  };
};

export async function fetchQuizQuestions(topic, { signal } = {}) {
  if (!topic?.apiQuizId) {
    throw new Error(
      `Missing apiQuizId for topic "${topic?.name ?? "unknown"}".`,
    );
  }

  const response = await fetch(
    buildUrl(API_BASE_URL, { quiz_id: topic.apiQuizId }),
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Quiz proxy request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const apiQuestions = Array.isArray(payload?.data) ? payload.data : [];

  // keep invalid mapped values so the shared validator can reject the whole set.
  const mappedQuestions = apiQuestions.map(normalizeQuestion);
  const questions = getValidQuizQuestions(mappedQuestions);

  if (questions.length < MIN_QUESTIONS) {
    throw new RangeError(
      `Expected at least ${MIN_QUESTIONS} questions, but received ${questions.length}.`,
    );
  }

  return questions;
}
