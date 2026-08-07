import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getValidQuizQuestions,
  normalizeQuizQuestion,
} from './normalizeQuizQuestion.js';

const validQuestion = {
  id: 'question-1',
  question: 'What does CSS stand for?',
  answers: [
    'Cascading Style Sheets',
    'Computer Style Sheets',
    'Creative Style Syntax',
    'Coded Styling System',
  ],
  correctAnswer: 'Cascading Style Sheets',
  explanation: 'CSS stands for Cascading Style Sheets.',
};

const makeValidQuestions = (count = 10) =>
  Array.from({ length: count }, (_, index) => ({
    ...validQuestion,
    id: `question-${index + 1}`,
    answers: [...validQuestion.answers],
  }));

test('normalizes a complete quiz question', () => {
  assert.deepEqual(normalizeQuizQuestion(validQuestion), validQuestion);
});

test('rejects incomplete and inconsistent quiz questions', () => {
  const invalidQuestions = [
    { ...validQuestion, id: '' },
    { ...validQuestion, question: ' ' },
    { ...validQuestion, answers: validQuestion.answers.slice(0, 3) },
    { ...validQuestion, answers: [...validQuestion.answers.slice(0, 3), ''] },
    { ...validQuestion, answers: Array(4).fill('Duplicate') },
    { ...validQuestion, correctAnswer: 'Not in answers' },
  ];

  invalidQuestions.forEach((question) => {
    assert.equal(normalizeQuizQuestion(question), null);
  });
});

test('uses safe explanation copy when an explanation is missing', () => {
  const normalized = normalizeQuizQuestion({
    ...validQuestion,
    explanation: '',
  });

  assert.equal(
    normalized.explanation,
    'No explanation available for this question.',
  );
});

test('returns a completely valid question array', () => {
  const questions = makeValidQuestions(2);

  assert.deepEqual(getValidQuizQuestions(questions), questions);
});

test('rejects non-array input', () => {
  assert.throws(
    () => getValidQuizQuestions(null),
    /Expected an array of questions/,
  );
});

test('rejects a 10-question array containing one invalid question', () => {
  const questions = makeValidQuestions();
  questions[4] = { ...questions[4], correctAnswer: 'Not in answers' };

  assert.throws(
    () => getValidQuizQuestions(questions),
    /One or more questions are invalid/,
  );
});

test('applies the default explanation to a question set', () => {
  const questions = makeValidQuestions();
  questions[0] = { ...questions[0], explanation: '' };

  const normalizedQuestions = getValidQuizQuestions(questions);

  assert.equal(
    normalizedQuestions[0].explanation,
    'No explanation available for this question.',
  );
});

test('does not mutate the original question array', () => {
  const questions = makeValidQuestions().map((question) => ({
    ...question,
    question: `  ${question.question}  `,
    answers: question.answers.map((answer) => `  ${answer}  `),
    correctAnswer: `  ${question.correctAnswer}  `,
  }));
  const originalQuestions = structuredClone(questions);

  const normalizedQuestions = getValidQuizQuestions(questions);

  assert.deepEqual(questions, originalQuestions);
  assert.notStrictEqual(normalizedQuestions, questions);
  assert.notStrictEqual(normalizedQuestions[0], questions[0]);
  assert.notStrictEqual(normalizedQuestions[0].answers, questions[0].answers);
  assert.equal(normalizedQuestions[0].question, validQuestion.question);
  assert.deepEqual(
    normalizedQuestions[0].answers,
    validQuestion.answers,
  );
});
