import { useEffect, useState, useRef } from "react";
import ScreenLayout from "../../components/ScreenLayout";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import QuizHeader from "../../components/QuizHeader";
import QuizQuestionPanel from "../../components/QuizQuestionPanel";
import ExitQuizModal from "../../components/ExitQuizModal";
import { fetchQuizQuestions } from "../../services/quizApi";
import { getFallbackQuestions } from "../../data/fallbackQuestions";
import { prepareQuizQuestions } from "../../utils/quizQuestionSession";
import {
  formatQuizTime,
  getQuizProgressPercentage,
  getTimerAnnouncement,
} from "../../utils/quizTimer";
import {
  QUIZ_LOAD_ERROR_MESSAGE,
  MIN_LOADING_DISPLAY_MS,
  QUIZ_DURATION_SECONDS,
} from "../../config/quiz.js";



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
          setError(QUIZ_LOAD_ERROR_MESSAGE);
          setIsLoading(false);
          return;
        }
      }

      const sessionQuestions = prepareQuizQuestions(resolvedQuestions);

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
    return <LoadingState onCancel={onCancel} />;
  }

  if (error) {
    return <ErrorState error={error} onCancel={onCancel} />;
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

  const formattedTime = formatQuizTime(secondsRemaining);
  // keep the live region mounted, but give it content only on milestone
  // seconds so screen readers do not announce every countdown update.
  const progressPercentage = getQuizProgressPercentage(
    secondsRemaining,
    QUIZ_DURATION_SECONDS,
  );
  const timerAnnouncement = getTimerAnnouncement(secondsRemaining);

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
      <QuizHeader
        selectedTopic={selectedTopic}
        totalQuestions={totalQuestions}
        currentQuestionIndex={currentQuestionIndex}
        formattedTime={formattedTime}
        timerAnnouncement={timerAnnouncement}
        progressPercentage={progressPercentage}
        onOpenExitModal={handleOpenExitModal}
        exitButtonRef={exitButtonRef}
      />
      <QuizQuestionPanel
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        isValidated={isValidated}
        onSelectAnswer={handleAnswerSelect}
        onNextQuestion={handleNextQuestion}
        nextButtonRef={nextButtonRef}
      />
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
