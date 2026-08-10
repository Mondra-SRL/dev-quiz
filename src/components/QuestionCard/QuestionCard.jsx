import { useRef } from 'react';
import styles from './QuestionCard.module.css';
import AnswerOption from '../AnswerOption/AnswerOption';
import { FormattedQuestion } from '../FormattedText';

function QuestionCard({ question, answers, correctAnswer, selectedAnswer, onSelectAnswer }) {
  const optionRefs = useRef([]);

  const focusOption = (index) => {
    optionRefs.current[index]?.focus();
  };

  const handleOptionKeyDown = (event, index) => {
    if (selectedAnswer) {
      return;
    }

    const lastIndex = answers.length - 1;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        focusOption(index === lastIndex ? 0 : index + 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        focusOption(index === 0 ? lastIndex : index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusOption(0);
        break;
      case 'End':
        event.preventDefault();
        focusOption(lastIndex);
        break;
      default:
        break;
    }
  };

  return (
    <section className={styles.main} aria-labelledby="question-heading">
      <FormattedQuestion
        text={question}
        id="question-heading"
        className={styles.question}
      />
      <div className={styles.answersGrid} role="radiogroup" aria-labelledby="question-heading">
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
              onKeyDown={(event) => handleOptionKeyDown(event, idx)}
              disabled={Boolean(selectedAnswer)}
              ref={(element) => {
                optionRefs.current[idx] = element;
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

export default QuestionCard;
