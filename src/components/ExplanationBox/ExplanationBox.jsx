import styles from './ExplanationBox.module.css';

function ExplanationBox({ explanation }) {
  return (
    <section className={styles.explanationBox}>
      <div className={styles.text}> <strong>Why: </strong>{explanation}</div>
    </section>
  );
}

export default ExplanationBox;
