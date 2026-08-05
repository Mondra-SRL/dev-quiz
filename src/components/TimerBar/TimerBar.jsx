import styles from './TimerBar.module.css';

function TimerBar({ percentage }) {
  // Make sure the percentage never goes below 0 or above 100.
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  // Round the value so screen readers announce a simple whole number.
  const roundedPercentage = Math.round(clampedPercentage);

  return (
    <div
      className={styles.timerBar}
      role="progressbar"
      aria-label="Quiz time remaining"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={roundedPercentage}
    >
      {/* Use the exact percentage so the fill matches the time remaining. */}
      <div
        className={styles.fill}
        style={{ '--timer-progress': clampedPercentage / 100 }}
      />
    </div>
  );
}

export default TimerBar;
