import { useState } from 'react';  
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState("home"); 
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [score, setScore] = useState(0); 
  const [totalQuestions, setTotalQuestions] = useState(0); 
  const [quizStatus, setQuizStatus] = useState(null); // solely to track the final outcome, (completed or expired), initial value should be null

  function startQuiz() {
    if (!selectedTopic) return;
 
    setScore(0);
    setTotalQuestions(0);
    setCurrentScreen('quiz');
  }

  function handleSelectTopic(topic) {
    setSelectedTopic(topic);
  }

  function incrementScore() { 
    setScore((previousScore) => previousScore + 1);
  } 

  function finishQuiz(status) {
    setQuizStatus(status);
    setCurrentScreen('results');
  }

  function resetQuiz() {
    setSelectedTopic(null);
    setScore(0);
    setTotalQuestions(0);
    setCurrentScreen('home');
  }

  function retakeQuiz() {
    setScore(0);
    setTotalQuestions(0);
    setQuizStatus(null); // solely to track the final outcome, (completed or expired), initial value should be nulll
    setCurrentScreen('quiz');
  }

  if (currentScreen === 'quiz') {
    return (
      <QuizScreen
        selectedTopic={selectedTopic}
        totalQuestions={totalQuestions}
        quizStatus={quizStatus}
        onIncrementScore={incrementScore}
        onSetTotalQuestions={setTotalQuestions}
        onFinish={finishQuiz}
        onCancel={resetQuiz}
      />
    );
  }

  if (currentScreen === 'results') {
    return (
      <ResultsScreen
        score={score}
        totalQuestions={totalQuestions}
        quizStatus={quizStatus}
        onReturnHome={resetQuiz}
        onRetakeQuiz={retakeQuiz}
      />
    );
  }

  return (
    <HomeScreen
      selectedTopic={selectedTopic}
      onSelectTopic={handleSelectTopic}
      onStart={startQuiz}
    />
  );
}

export default App;