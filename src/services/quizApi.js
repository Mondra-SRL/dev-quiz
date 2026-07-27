// api to get fetch questions from quizapi.io 
// module constants

const API_BASE_URL = 'https://quizapi.io/api/v1/questions';
const API_KEY = import.meta.env.VITE_QUIZ_API_KEY;
const POOL_SIZE = 50; 
const explanationNotAvailable = "No explanation available for this question."; 

// html quiz url specifically from quizapi.io 
/* 
const res = await fetch("https://quizapi.io/api/v1/questions?quiz_id=cms3a30pt0lesfbut0jx2p576&include_answers=true", {
  headers: { "X-API-Key": "YOUR_API_KEY" }
});
const questions = await res.json();
*/

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

  // Phase 3 - Validate the derived valued 
  if (
    answers.length < 2 ||
    answers.length !== rawAnswers.length ||
    new Set(answers).size !== answers.length ||
    correctAnswers.length !== 1
  ){
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
    explanation: 
      typeof explanation === 'string' && explanation.trim() !== ''
      ? explanation
      : explanationNotAvailable
  };
}; 

// export the async function to fetch questions 
export async function fetchQuizQuestions(topic, { signal} = {}){
  // guard check if an api key is available
  if (!API_KEY){
    throw new Error("Missing VITE_QUIZ_API_KEY. Add it to your .env file.");
  }
  // variable to hold params 
  const params = { limit: POOL_SIZE, include_answers: true }; 
  
  // validation to make sure topic is the api Category 
  // check if the topic has an apiQuizId or apiCategory or apiTags
  if (topic?.apiQuizId){
    params.quiz_id = topic.apiQuizId
  } else if (topic?.apiCategory){
    params.category = topic.apiCategory
  } else if (topic?.apiTags){
    params.tags = topic.apiTags
  }

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

  // grab queesions and normalize them 
  const questions = apiQuestions
    .map(normalizeQuestion)
    .filter((question) => question !== null); 

  // validate the questions array length 
  if (questions.length === 0){
    throw new Error(`QuizAPI returned no usable questions for this topic.`)
  }

  return questions; 
}
