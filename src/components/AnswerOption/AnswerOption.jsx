import styles from './AnswerOption.module.css';
import { InlineCodeText } from '../FormattedText';

function AnswerOption({ letter, description, status, checked, onSelect, disabled }) {
  const statusMessage = status === 'incorrect'
    ? 'Your answer, incorrect.'
    : status
      ? 'Correct answer.'
      : '';
  const statusSymbol = status === 'incorrect' ? '×' : status ? '✓' : '';

  return (
    <label className={styles.answerOption} data-state={status}>
      <input
        type="radio"
        name="answer"
        value={description}
        checked={checked}
        onChange={onSelect}
        disabled={disabled}
        className="visually-hidden"
      />
      <span className={styles.letter} aria-hidden="true">{letter}</span>
      <span className={styles.text}>
        <InlineCodeText text={description} />
      </span>
      {statusMessage && <span className="visually-hidden">{statusMessage}</span>}
      {statusSymbol && (
        <span className={styles.statusIndicator} aria-hidden="true">
          {statusSymbol}
        </span>
      )}
    </label>
  );
}

export default AnswerOption;
