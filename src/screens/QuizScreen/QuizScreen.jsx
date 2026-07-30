import { useEffect, useState, useRef } from 'react';
import ScreenLayout from '../../components/ScreenLayout';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import FeedbackMessage from '../../components/FeedbackMessage/FeedbackMessage';
import ExplanationBox from '../../components/ExplanationBox/ExplanationBox';
import logo from '../../assets/logo-desktop-on-light.svg';
import styles from './QuizScreen.module.css';
import TimerBar from '../../components/TimerBar';
import clockIcon from '../../assets/clock-icon.svg';
import Button from '../../components/Button';
import ArrowRightIcon from '../../components/ArrowRightIcon';
import { fetchQuizQuestions, MIN_QUESTIONS } from '../../services/quizApi';
import { getFallbackQuestions } from '../../data/fallbackQuestions'; 
import { shuffleArray } from '../../utils/shuffleArray';

// module level constant for questions per quiz
const QUESTIONS_PER_QUIZ = MIN_QUESTIONS;

function QuizScreen({
  selectedTopic,
  totalQuestions,
  onSetTotalQuestions,
  onCancel,
  onFinish,
  onIncrementScore
}) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const nextButtonRef = useRef(null);
  const currentQuestion = questions[currentQuestionIndex];

  // useEffect to fetch questions from API 
  // keyed on selectedTopic
  useEffect(() => {
    const abortController = new AbortController(); // to cancel the request

    async function loadQuestions() {
      // variable to get resolvedQuestions 
      let resolvedQuestions; 
      // try, catch and finally goes here with await 
      try {
        resolvedQuestions = await fetchQuizQuestions(selectedTopic, {
          signal: abortController.signal,
        });
        } catch (err){
          if (err.name === 'AbortError') return; // our own cleanup , not a failure
          // log the error
          console.warn(err); 
          // fallback questions 
          const fallback = getFallbackQuestions(selectedTopic.id); 
          // validation for fallback questions 
          if (fallback.length < QUESTIONS_PER_QUIZ){
            setError(err.message); 
            setIsLoading(false);
            return; 
          }
          resolvedQuestions = fallback; 
        }
        const sessionQuestions = shuffleArray(resolvedQuestions)
          .slice(0, QUESTIONS_PER_QUIZ)
          .map((question) => ({
            ...question, 
            answers: shuffleArray(question.answers)
          })); 

          setQuestions(sessionQuestions);
          onSetTotalQuestions(sessionQuestions.length);
          setIsLoading(false);
    }

    loadQuestions();

    return () => abortController.abort();
  }, [selectedTopic, onSetTotalQuestions]);


  useEffect(() => {
    if (isValidated && nextButtonRef.current) {
      nextButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isValidated]);

  const handleAnswerSelect = (answer) => {
    if (isValidated) return;

    setSelectedAnswer(answer);
    setIsValidated(true);

    if (answer === currentQuestion.correctAnswer) {
      onIncrementScore();
    }
  };

  // set questions , loading branch and an error branch 
  if (isLoading) {
    return (
      <ScreenLayout>
        <p>Loading...</p>
        <Button onClick={onCancel}>Cancel</Button>
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout>
        <p>{error}</p>
        <Button onClick={onCancel}>Cancel</Button>
      </ScreenLayout>
    );
  }

  const handleNextQuestion = () => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      onFinish('completed');
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer(null);
    setIsValidated(false);
  };

  return (
    <ScreenLayout>
      <header className={styles.header}>
        <div className={styles.rowTop}>
          <img src={logo} alt="devquiz" className={styles.logo} />
          <div className={styles.timerMeta}>
            <img src={clockIcon} alt="Clock icon" className={styles.clockIcon} />
            <p className={styles.timerText}>17:45</p>
          </div>
        </div>

        <div className={styles.timerRow}>
          <TimerBar />
        </div>

        <div className={styles.rowSecondary}>
          <p className={styles.questionCounter}>Question {currentQuestionIndex + 1} of {totalQuestions}</p>
          <Button variant="tertiary" onClick={onCancel}>
            EXIT QUIZ <span aria-hidden="true">        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg></span>
          </Button>
        </div>

        <div className={styles.topicSummary}>
          <img src={selectedTopic.image} alt="Topic icon" className={styles.topicIcon} />
          <div className={styles.topicText}>
            <p className={styles.topicDescription}><span className={styles.topicName}>{selectedTopic.name}</span> &gt; {selectedTopic.description}</p>
          </div>
        </div>
      </header>
      <QuestionCard
        question={currentQuestion.question}
        answers={currentQuestion.answers}
        correctAnswer={currentQuestion.correctAnswer}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleAnswerSelect}
      />
      {isValidated && (
        <div className={styles.feedbackSection}>
          <FeedbackMessage isCorrect={selectedAnswer === currentQuestion.correctAnswer} />
          <ExplanationBox explanation={currentQuestion.explanation} />
        </div>
      )}
      <div ref={nextButtonRef}>
        <Button variant="primary" disabled={!selectedAnswer} onClick={handleNextQuestion}>
          Next Question <ArrowRightIcon />
        </Button>
      </div>
    </ScreenLayout>
  );
}

export default QuizScreen;
