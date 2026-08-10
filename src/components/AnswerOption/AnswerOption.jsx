import { forwardRef } from 'react';
import styles from './AnswerOption.module.css';
import { InlineCodeText } from '../FormattedText';

const AnswerOption = forwardRef(function AnswerOption({
  letter,
  description,
  status,
  checked,
  onSelect,
  disabled,
  onKeyDown,
}, ref) {
  const statusMessage = status === 'incorrect'
    ? 'Your answer, incorrect.'
    : status
      ? 'Correct answer.'
      : '';
  const statusSymbol = status === 'incorrect' ? '\u00D7' : status ? '\u2713' : '';

  return (
    <button
      ref={ref}
      type="button"
      className={styles.answerOption}
      data-state={status}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      disabled={disabled}
      role="radio"
      aria-checked={checked}
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
});

export default AnswerOption;
