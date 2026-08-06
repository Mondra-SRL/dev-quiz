import { useEffect, useState, useRef } from "react";
import { Bars } from "react-loader-spinner";
import ScreenLayout from "../../components/ScreenLayout";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import FeedbackMessage from "../../components/FeedbackMessage/FeedbackMessage";
import ExplanationBox from "../../components/ExplanationBox/ExplanationBox";
import TimerBar from "../../components/TimerBar";
import Button from "../../components/Button";
import ArrowRightIcon from "../../components/ArrowRightIcon";
import ExitQuizModal from "../../components/ExitQuizModal";
import styles from "./QuizScreen.module.css";
import logo from "../../assets/svg/logo-desktop-on-light.svg";
import clockIcon from "../../assets/svg/clock-icon.svg";
import exitQuizIcon from "../../assets/svg/exit-quiz-icon.svg";
import { fetchQuizQuestions } from "../../services/quizApi";
import { getFallbackQuestions } from "../../data/fallbackQuestions";
import { shuffleArray } from "../../utils/shuffleArray";
import { QUESTIONS_PER_QUIZ } from "../../config/quiz.js";
import { MIN_LOADING_DISPLAY_MS } from "

// module level constant for the timer countdown
const QUIZ_DURATION_SECONDS = 10 * 60; //10 minutes
const MIN_LOADING_DISPLAY_MS = 1000;
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
  onIncrementScore,
}) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const nextButtonRef = useRef(null);
  const exitButtonRef = useRef(null);
  const currentQuestion = questions[currentQuestionIndex];
  const [secondsRemaining, setSecondsRemaining] = useState(
    QUIZ_DURATION_SECONDS,
  );
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // useEffect to fetch questions from API
  // keyed on selectedTopic
  useEffect(() => {
    const abortController = new AbortController(); // to cancel the request

    async function loadQuestions() {
      const loadingStartedAt = Date.now();
      
      setIsLoading(true);
      setError(null);
      setQuestions([]);
      setSecondsRemaining(QUIZ_DURATION_SECONDS);
      onSetTotalQuestions(0);

      let resolvedQuestions;

      try {
        resolvedQuestions = await fetchQuizQuestions(selectedTopic, {
          signal: abortController.signal,
        });
      } catch (apiError) {
        // An aborted request is expected when the screen unmounts.
        if (apiError.name === "AbortError") return;

        console.warn(apiError);

        try {
          // The fallback module returns questions that are already validated.
          resolvedQuestions = getFallbackQuestions(selectedTopic?.id);
        } catch (fallbackError) {
          console.warn(fallbackError);
          setError(LOAD_ERROR_MESSAGE);
          setIsLoading(false);
          return;
        }
      }

      const sessionQuestions = shuffleArray(resolvedQuestions)
        .slice(0, QUESTIONS_PER_QUIZ)
        .map((question) => ({
          ...question,
          answers: shuffleArray(question.answers),
        }));

      // keep the loading state visible long enough for users to notice it when
      // the API fails quickly and local fallback questions load immediately.
      const loadingTimeRemaining = Math.max(
        MIN_LOADING_DISPLAY_MS - (Date.now() - loadingStartedAt),
        0,
      );

      if (loadingTimeRemaining > 0) {
        await new Promise((resolve) =>
          window.setTimeout(resolve, loadingTimeRemaining),
        );
      }

      // The user may have left the screen while the short delay was running.
      if (abortController.signal.aborted) return;

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
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      nextButtonRef.current.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
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
          <Bars
            height="80"
            width="80"
            color="var(--color-olive-deep)"
            ariaLabel="Loading quiz questions"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <div className={styles.statusCopy}>
            <h1 className={styles.statusTitle}>Loading questions…</h1>
            <p className={styles.statusMessage}>
              We’re getting your quiz ready. This should only take a moment.
            </p>
          </div>
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
          <div className={styles.statusCopy}>
            <p className={styles.errorLabel}>Unable to start quiz</p>
            <h1 className={styles.statusTitle}>Something went wrong</h1>
            <p className={styles.statusMessage}>{error}</p>
          </div>
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

  function handleOpenExitModal() {
    setIsExitModalOpen(true);
  }

  function handleContinueQuiz() {
    setIsExitModalOpen(false);
  }

  function handleConfirmExit() {
    setIsExitModalOpen(false);
    onCancel();
  }

  return (
    <>
      <ScreenLayout inert={isExitModalOpen}>
      <header className={styles.header}>
        <div className={styles.rowTop}>
          <img src={logo} alt="devquiz" className={styles.logo} />
          <div className={styles.timerMeta}>
            <img
              src={clockIcon}
              alt=""
              aria-hidden="true"
              className={styles.clockIcon}
            />
            <p className={styles.timerText}>{formattedTime}</p>
            <p
              className="visually-hidden"
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
          <Button
            ref={exitButtonRef}
            variant="tertiary"
            onClick={handleOpenExitModal}
          >
            EXIT QUIZ
            <img
              src={exitQuizIcon}
              className={styles.exitQuizIcon}
              alt=""
              aria-hidden="true"
            />
          </Button>
        </div>

        <div className={styles.topicSummary}>
          <img
            src={selectedTopic.image}
            alt=""
            aria-hidden="true"
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
          Next Question
          <ArrowRightIcon disabled={!isValidated} />
        </Button>
      </div>
      </ScreenLayout>

      {isExitModalOpen && (
        <ExitQuizModal
          onContinue={handleContinueQuiz}
          onExit={handleConfirmExit}
          returnFocusRef={exitButtonRef}
        />
      )}
    </>
  );
}

export default QuizScreen;
