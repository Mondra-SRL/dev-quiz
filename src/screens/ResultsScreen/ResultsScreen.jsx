import styles from './ResultsScreen.module.css';
import logo from '../../assets/logo-desktop-on-light.svg';
import Button from '../../components/Button';
import ResultsCard from '../../components/ResultsCard';
import ScreenLayout from '../../components/ScreenLayout';
import arrowRightIconMerino from '../../assets/arrow-right-icon-merino.svg';
import arrowRightIconPurple from '../../assets/arrow-right-icon-purple.svg';
import { QUIZ_STATUS_MESSAGES } from '../../data/resultsMessages'; 

function ResultsScreen({ score, totalQuestions, quizStatus, onReturnHome, onRetakeQuiz}) {
  
  return (
    <ScreenLayout>
      <header className={styles.header}>
      <img src={logo} alt="devquiz" className={styles.logo} />
      </header>

      <section className={styles.quizContent} aria-labelledby="results-heading">
        <h1 id="results-heading" className={styles.headerTitle}>{QUIZ_STATUS_MESSAGES[quizStatus] ?? 'Quiz Complete'}</h1>
        <ResultsCard score={score} totalQuestions={totalQuestions} />
        <div className={styles.actions}>
          <Button variant="primary" onClick={onRetakeQuiz}>
            Retake Quiz
            <img src={arrowRightIconMerino} alt="" aria-hidden="true" />
          </Button>
          <Button variant="secondary" onClick={onReturnHome}>
            Return Home
            <img src={arrowRightIconPurple} alt="" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </ScreenLayout>
  );
}

export default ResultsScreen;
