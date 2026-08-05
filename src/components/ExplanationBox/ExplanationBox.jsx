import styles from './ExplanationBox.module.css';
import { InlineCodeText } from '../FormattedText';

function ExplanationBox({ explanation }) {
  return (
    <section className={styles.explanationBox}>
      <div className={styles.text}>
        <strong>Why: </strong>
        <InlineCodeText text={explanation} />
      </div>
    </section>
  );
}

export default ExplanationBox;
