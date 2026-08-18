import QuestionCard from "../QuestionCard/QuestionCard";
import FeedbackMessage from "../FeedbackMessage/FeedbackMessage";
import ExplanationBox from "../ExplanationBox/ExplanationBox";
import Button from "../Button";
import ArrowRightIcon from "../ArrowRightIcon";
import styles from "./QuizQuestionPanel.module.css";

function QuizQuestionPanel({
  question,
  selectedAnswer,
  isValidated,
  onSelectAnswer,
  onNextQuestion,
  nextButtonRef,
}) {
  return (
    <>
      <QuestionCard
        question={question.question}
        answers={question.answers}
        correctAnswer={question.correctAnswer}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={onSelectAnswer}
      />
      {isValidated && (
        <div className={styles.feedbackSection}>
          <FeedbackMessage
            isCorrect={selectedAnswer === question.correctAnswer}
          />
          <ExplanationBox explanation={question.explanation} />
        </div>
      )}
      <div ref={nextButtonRef}>
        <Button
          variant="primary"
          disabled={!isValidated}
          onClick={onNextQuestion}
        >
          Next Question
          <ArrowRightIcon disabled={!isValidated} />
        </Button>
      </div>
    </>
  );
}

export default QuizQuestionPanel;
