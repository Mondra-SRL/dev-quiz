// imports fallback questions to work from 
import htmlQuestions from './html.js';
import cssQuestions from './css.js'; 
import jsQuestions from './javascript.js'; 
import tsQuestions from './typescript.js'; 
import reactQuestions from './react.js'; 
import pythonQuestions from './python.js';

// variable to hold all questions by topic 
const fallbackQuestionsByTopic = {
    HTML: htmlQuestions,
    CSS: cssQuestions,
    JavaScript: jsQuestions,
    TypeScript: tsQuestions,
    React: reactQuestions,
    Python: pythonQuestions,
  };

  export function getFallbackQuestions(topicId){
    // return the questions for the topic or an empty array if not found
    return fallbackQuestionsByTopic[topicId] ?? [];
  }