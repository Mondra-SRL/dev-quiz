import styles from './QuestionCard.module.css';
import AnswerOption from '../AnswerOption/AnswerOption';
import { FormattedQuestion } from '../FormattedText';

function QuestionCard({ question, answers, correctAnswer, selectedAnswer, onSelectAnswer }) {
  return (
    <section className={styles.main} aria-labelledby="question-heading">
      <FormattedQuestion
        text={question}
        id="question-heading"
        className={styles.question}
      />
      <fieldset className={styles.answersGrid}>
        <legend className="visually-hidden">Choose one answer</legend>
        {answers.map((answer, idx) => {
          const letter = String.fromCharCode(65 + idx);
          let status;

          if (selectedAnswer) {
            if (answer === selectedAnswer) {
              status = answer === correctAnswer ? 'correct' : 'incorrect';
            } else if (answer === correctAnswer) {
              status = 'reveal';
            }
          }

          return (
            <AnswerOption
              key={letter}
              letter={letter}
              description={answer}
              status={status}
              checked={selectedAnswer === answer}
              onSelect={() => onSelectAnswer(answer)}
              disabled={Boolean(selectedAnswer)}
            />
          );
        })}
      </fieldset>
    </section>
  );
}

export default QuestionCard;
