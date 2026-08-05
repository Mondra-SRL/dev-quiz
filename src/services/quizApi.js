const API_BASE_URL = '/api/quiz';
const explanationNotAvailable = "No explanation available for this question.";
const ANSWERS_PER_QUESTION = 4;
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

  if (
    answers.length !== ANSWERS_PER_QUESTION ||
    answers.length !== rawAnswers.length ||
    new Set(answers).size !== answers.length ||
    correctAnswers.length !== 1
  ) {
    return null;
  }

  const explanation = apiQuestion.explanation;

  return {
    id: apiQuestion.id,
    question: apiQuestion.text,
    answers,
    correctAnswer: correctAnswers[0].text,
    explanation:
      typeof explanation === 'string' && explanation.trim() !== ''
        ? explanation
        : explanationNotAvailable,
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

  const questions = apiQuestions
    .map(normalizeQuestion)
    .filter((question) => question !== null);

  if (questions.length < MIN_QUESTIONS) {
    throw new Error(
      `Quiz proxy returned ${questions.length} usable questions for "${topic.name}", needs ${MIN_QUESTIONS}.`
    );
  }

  return questions;
}
