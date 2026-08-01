import styles from './QuestionCard.module.css';
import AnswerOption from '../AnswerOption/AnswerOption';

function QuestionCard({ question, answers, correctAnswer, selectedAnswer, onSelectAnswer }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.question}>{question}</h1>
      <div className={styles.answersGrid}>
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
      </div>
    </main>
  );
}

export default QuestionCard;
