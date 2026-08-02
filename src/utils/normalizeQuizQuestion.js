const ANSWERS_PER_QUESTION = 4;
const DEFAULT_EXPLANATION = 'No explanation available for this question.';

const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim() !== '';

export function normalizeQuizQuestion(question) {
  if (
    (typeof question?.id !== 'string' && typeof question?.id !== 'number') ||
    String(question.id).trim() === '' ||
    !isNonEmptyString(question.question) ||
    !Array.isArray(question.answers)
  ) {
    return null;
  }

  const answers = question.answers.map((answer) =>
    isNonEmptyString(answer) ? answer.trim() : answer,
  );

  if (
    answers.length !== ANSWERS_PER_QUESTION ||
    !answers.every(isNonEmptyString) ||
    new Set(answers).size !== answers.length ||
    !isNonEmptyString(question.correctAnswer)
  ) {
    return null;
  }

  const correctAnswer = question.correctAnswer.trim();

  if (!answers.includes(correctAnswer)) {
    return null;
  }

  return {
    id: question.id,
    question: question.question.trim(),
    answers,
    correctAnswer,
    explanation: isNonEmptyString(question.explanation)
      ? question.explanation.trim()
      : DEFAULT_EXPLANATION,
  };
}

export function getValidQuizQuestions(questions) {
  if (!Array.isArray(questions)) return [];

  return questions
    .map(normalizeQuizQuestion)
    .filter((question) => question !== null);
}
