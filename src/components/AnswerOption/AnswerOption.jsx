import styles from './AnswerOption.module.css';

function AnswerOption({ letter, description, status, checked, onSelect, disabled }) {
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
      <span className={styles.text}>{description}</span>
    </label>
  );
}

export default AnswerOption;
