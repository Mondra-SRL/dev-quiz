import styles from './FeedbackMessage.module.css';
import starIcon from '../../assets/svg/star-icon.svg';
import badgeIcon from '../../assets/svg/badge-icon.svg';

function FeedbackMessage({ isCorrect = false }) {
  const icon = isCorrect ? starIcon : badgeIcon;
  const label = isCorrect ? 'Correct!' : 'Not quite!';
  const stateClass = isCorrect ? styles.correct : styles.incorrect;

  return (
    <div className={`${styles.feedbackMessage} ${stateClass}`} role="status">
      <img src={icon} alt="" className={styles.icon} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default FeedbackMessage;
