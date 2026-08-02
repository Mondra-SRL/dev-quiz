// api to get fetch questions from quizapi.io 
// module constants

import { getValidQuizQuestions } from '../utils/normalizeQuizQuestion';

const API_BASE_URL = 'https://quizapi.io/api/v1/questions';
const API_KEY = import.meta.env.VITE_QUIZ_API_KEY;
export const MIN_QUESTIONS = 10; // export this for quizScreen to use


const buildUrl = (baseUrl, params) => {
  const url = new URL(baseUrl);
  url.search = new URLSearchParams(params).toString();
  return url.toString();
};

// normalize questions helper to return the internal shape or null when a question is unusable 
const normalizeQuestion = (apiQuestion) => {
  // phase 1 - guard the raw input 
  if (typeof apiQuestion?.text !== 'string' || apiQuestion.text.trim() === '') {
    return null;
  }
  // variable to hold raw answer data 
  const rawAnswers = Array.isArray(apiQuestion.answers) ? apiQuestion.answers : [];

  // phase 2 - derive 
  const answers = rawAnswers 
    .map((answer) => answer?.text)
    .filter((text) => typeof text === 'string' && text.trim() !== '');
  
  // variable to hold the correct answers 
  const correctAnswers = rawAnswers.filter((answer) => answer?.isCorrect); 

  // Phase 3 - Validate values that are specific to the API response.
  if (answers.length !== rawAnswers.length || correctAnswers.length !== 1) {
    return null; 
  }

  // Phase 4 - return the internal shape 
  // explanation variable 
  const explanation = apiQuestion.explanation; 

  return {
    id: apiQuestion.id,
    question: apiQuestion.text,
    answers,
    correctAnswer: correctAnswers[0].text,
    explanation,
  };
}; 

// export the async function to fetch questions 
export async function fetchQuizQuestions(topic, { signal} = {}){
  // guard check to make sure an api key is present
  if (!API_KEY){
    throw new Error("Missing VITE_QUIZ_API_KEY. Add it to your .env file.");
  }
  // validation to check that apiQuizId is present, otherwise throw an error 
  if(!topic?.apiQuizId){
    throw new Error(`Missing apiQuizId for topic "${topic?.name ?? 'unknown'}".`);
  }
  // variable to hold params 
  const params = { quiz_id: topic.apiQuizId, include_answers: true };
  
  // await response 
  const response = await fetch(buildUrl(API_BASE_URL, params), {
    headers: {Authorization: `Bearer ${API_KEY}`},
    signal,
  }); 

  // if the response is not okay, throw an error 
  if(!response.ok){
    throw new Error(`QuizAPI request failed with status ${response.status}`);
  }

  // grab the payload and 
  const payload = await response.json(); // convert to json
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
