import styles from './AnswerOption.module.css';
import { InlineCodeText } from '../FormattedText';

function AnswerOption({ letter, description, status, checked, onSelect, disabled }) {
  const statusMessage = status === 'incorrect'
    ? 'Your answer, incorrect.'
    : status
      ? 'Correct answer.'
      : '';
  const statusSymbol = status === 'incorrect' ? '\u00D7' : status ? '\u2713' : '';

  return (
    <button
      type="button"
      className={styles.answerOption}
      data-state={status}
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={checked}
    >
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
    </button>
  );
}

export default AnswerOption;
