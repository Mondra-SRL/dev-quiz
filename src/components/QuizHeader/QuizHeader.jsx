import Button from "../Button";
import TimerBar from "../TimerBar";
import styles from "./QuizHeader.module.css";
import logo from "../../assets/svg/logo-desktop-on-light.svg";
import clockIcon from "../../assets/svg/clock-icon.svg";
import exitQuizIcon from "../../assets/svg/exit-quiz-icon.svg";

function QuizHeader({
  selectedTopic,
  totalQuestions,
  currentQuestionIndex,
  formattedTime,
  timerAnnouncement,
  progressPercentage,
  onOpenExitModal,
  exitButtonRef,
}) {
  return (
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
          onClick={onOpenExitModal}
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
  );
}

export default QuizHeader;
