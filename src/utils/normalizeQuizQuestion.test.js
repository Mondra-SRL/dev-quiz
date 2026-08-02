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

test('filters invalid questions and handles non-array responses', () => {
  assert.deepEqual(getValidQuizQuestions(null), []);
  assert.deepEqual(
    getValidQuizQuestions([validQuestion, { ...validQuestion, id: null }]),
    [validQuestion],
  );
});