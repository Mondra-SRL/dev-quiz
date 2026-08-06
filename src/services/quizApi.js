// api to get fetch questions from quizapi.io 
// module constants

import { getValidQuizQuestions } from '../utils/normalizeQuizQuestion';

const API_BASE_URL = '/api/quiz';
export const MIN_QUESTIONS = 10;

const buildUrl = (baseUrl, params) => {
  const search = new URLSearchParams(params).toString();
  return `${baseUrl}?${search}`;
};

const normalizeQuestion = (apiQuestion) => {
  if (typeof apiQuestion?.text !== 'string' || apiQuestion.text.trim() === '') {
    return null;
  }

  const rawAnswers = Array.isArray(apiQuestion.answers) ? apiQuestion.answers : [];

  const answers = rawAnswers
    .map((answer) => answer?.text)
    .filter((text) => typeof text === 'string' && text.trim() !== '');

  const correctAnswers = rawAnswers.filter((answer) => answer?.isCorrect);

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
    throw new Error(`Missing apiQuizId for topic "${topic?.name ?? 'unknown'}".`);
  }

  const response = await fetch(
    buildUrl(API_BASE_URL, { quiz_id: topic.apiQuizId }),
    { signal }
  );

  if (!response.ok) {
    throw new Error(`Quiz proxy request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const apiQuestions = Array.isArray(payload?.data) ? payload.data : [];

  // grab questions and normalize them 
  const questions = getValidQuizQuestions(
    apiQuestions
      .map(normalizeQuestion)
      .filter((question) => question !== null),
  );

  // validate the questions array length 
  if (questions.length < MIN_QUESTIONS){
    throw new Error(`QuizAPI returned ${questions.length} usable questions for "${topic.name}", needs ${MIN_QUESTIONS}.`);
  }

  return questions;
}
