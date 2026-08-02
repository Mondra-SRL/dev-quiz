import { useEffect, useState, useRef } from 'react';
import ScreenLayout from '../../components/ScreenLayout';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import FeedbackMessage from '../../components/FeedbackMessage/FeedbackMessage';
import ExplanationBox from '../../components/ExplanationBox/ExplanationBox';
import TimerBar from '../../components/TimerBar';
import Button from '../../components/Button';
import ArrowRightIcon from '../../components/ArrowRightIcon';
import styles from "./QuizScreen.module.css";
import logo from "../../assets/logo-desktop-on-light.svg";
import clockIcon from "../../assets/clock-icon.svg";
import { fetchQuizQuestions, MIN_QUESTIONS } from '../../services/quizApi';
import { getFallbackQuestions } from '../../data/fallbackQuestions'; 
import { shuffleArray } from '../../utils/shuffleArray';
import { getValidQuizQuestions } from '../../utils/normalizeQuizQuestion';

// module level constant for questions per quiz
const QUESTIONS_PER_QUIZ = MIN_QUESTIONS;
// module level constant for the timer countdown
const QUIZ_DURATION_SECONDS = 10 * 60; //10 minutes
const LOAD_ERROR_MESSAGE =
  "We couldn't load enough valid questions for this quiz. Please return home and try again.";

// announce only useful countdown milestones so screen-reader users are not
// interrupted by an update every second.
const TIMER_ANNOUNCEMENTS = {
  300: "5 minutes remaining",
  60: "1 minute remaining",
  30: "30 seconds remaining",
  10: "10 seconds remaining",
  0: "Time is up",
};

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
  const [secondsRemaining, setSecondsRemaining] = useState(
    QUIZ_DURATION_SECONDS,
  );

  // useEffect to fetch questions from API
  // keyed on selectedTopic
  useEffect(() => {
    const abortController = new AbortController(); // to cancel the request

    async function loadQuestions() {
      setIsLoading(true);
      setError(null);
      setQuestions([]);
      setSecondsRemaining(QUIZ_DURATION_SECONDS);
      onSetTotalQuestions(0);

      // variable to get resolvedQuestions
      let resolvedQuestions;
      // try, catch and finally goes here with await
      try {
        resolvedQuestions = await fetchQuizQuestions(selectedTopic, {
          signal: abortController.signal,
        });
      } catch (err) {
        if (err.name === "AbortError") return; // our own cleanup , not a failure
        // log the error
        console.warn(err);
        // fallback questions
        const fallback = getValidQuizQuestions(
          getFallbackQuestions(selectedTopic?.id),
        );
        // validation for fallback questions
        if (fallback.length < QUESTIONS_PER_QUIZ) {
          setError(LOAD_ERROR_MESSAGE);
          setIsLoading(false);
          return;
        }
        resolvedQuestions = fallback;
      }
      const sessionQuestions = shuffleArray(resolvedQuestions)
        .slice(0, QUESTIONS_PER_QUIZ)
        .map((question) => ({
          ...question,
          answers: shuffleArray(question.answers),
        }));

      setQuestions(sessionQuestions);
      onSetTotalQuestions(sessionQuestions.length);
      setIsLoading(false);
    }

    loadQuestions();

    return () => abortController.abort();
  }, [selectedTopic, onSetTotalQuestions]);

  // start the countdown once questions are ready. 
  // clear the interval if readiness changes or QuizScreen unmounts.
  useEffect(() => {
    const quizIsReady = !isLoading && !error && questions.length > 0;

    if (!quizIsReady) return undefined;

    const intervalId = window.setInterval(() => {
      setSecondsRemaining((previousSeconds) =>
        Math.max(previousSeconds - 1, 0),
      );
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isLoading, error, questions.length]);

  // keep expiration separate from the interval so state updates stay free of
  // navigation side effects.
  useEffect(() => {
    const quizIsReady = !isLoading && !error && questions.length > 0;

    if (quizIsReady && secondsRemaining === 0) {
      onFinish("expired");
    }
  }, [isLoading, error, questions.length, secondsRemaining, onFinish]);

  useEffect(() => {
    if (isValidated && nextButtonRef.current) {
      nextButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
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
        <section
          className={styles.statusState}
          role="status"
          aria-live="polite"
        >
          <div className={styles.spinner} aria-hidden="true" />
          <h1 className={styles.statusTitle}>Loading questions…</h1>
          <p className={styles.statusMessage}>
            We’re getting your quiz ready. This should only take a moment.
          </p>
          <Button variant="secondary" onClick={onCancel}>
            Return Home
          </Button>
        </section>
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout>
        <section className={styles.statusState} role="alert">
          <p className={styles.errorLabel}>Unable to start quiz</p>
          <h1 className={styles.statusTitle}>Something went wrong</h1>
          <p className={styles.statusMessage}>{error}</p>
          <Button variant="primary" onClick={onCancel}>
            Return Home
          </Button>
        </section>
      </ScreenLayout>
    );
  }

  const handleNextQuestion = () => {
    // question progression is allowed only after the current answer has been
    // validated. This also protects the handler if it is called another way.
    if (!isValidated) return;

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    // finish only when the user clicks Next Question, so feedback and the
    // explanation for the final answer remain visible until this point.
    if (isLastQuestion) {
      onFinish("completed");
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer(null);
    setIsValidated(false);
  };

  // format seconds as MM:SS

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`;
  // keep the live region mounted, but give it content only on milestone
  // seconds so screen readers do not announce every countdown update.
  const progressPercentage = (secondsRemaining / QUIZ_DURATION_SECONDS) * 100;

  const timerAnnouncement = TIMER_ANNOUNCEMENTS[secondsRemaining] ?? "";

  return (
    <ScreenLayout>
      <header className={styles.header}>
        <div className={styles.rowTop}>
          <img src={logo} alt="devquiz" className={styles.logo} />
          <div className={styles.timerMeta}>
            <img
              src={clockIcon}
              alt="Clock icon"
              className={styles.clockIcon}
            />
            <p className={styles.timerText}>{formattedTime}</p>
            <p
              className={styles.srOnly}
              aria-live="polite"
              aria-atomic="true"
            >
              {timerAnnouncement}
            </p>
          </div>
        </div>

        <div className={styles.timerRow}>
          <TimerBar percentage={progressPercentage} />
        </div>

        <div className={styles.rowSecondary}>
          <p className={styles.questionCounter}>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
          <Button variant="tertiary" onClick={onCancel}>
            EXIT QUIZ{" "}
            <span aria-hidden="true">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </span>
          </Button>
        </div>

        <div className={styles.topicSummary}>
          <img
            src={selectedTopic.image}
            alt="Topic icon"
            className={styles.topicIcon}
          />
          <div className={styles.topicText}>
            <p className={styles.topicDescription}>
              <span className={styles.topicName}>{selectedTopic.name}</span>{" "}
              &gt; {selectedTopic.description}
            </p>
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
          <FeedbackMessage
            isCorrect={selectedAnswer === currentQuestion.correctAnswer}
          />
          <ExplanationBox explanation={currentQuestion.explanation} />
        </div>
      )}
      <div ref={nextButtonRef}>
        <Button
          variant="primary"
          disabled={!isValidated}
          onClick={handleNextQuestion}
        >
          Next Question <ArrowRightIcon />
        </Button>
      </div>
    </ScreenLayout>
  );
}

export default QuizScreen;
