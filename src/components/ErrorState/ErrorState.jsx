import ScreenLayout from "../ScreenLayout";
import Button from "../Button";
import styles from "./ErrorState.module.css";

function ErrorState({ error, onCancel }) {
  return (
    <ScreenLayout>
      <section className={styles.statusState} role="alert">
        <div className={styles.statusCopy}>
          <p className={styles.errorLabel}>Unable to start quiz</p>
          <h1 className={styles.statusTitle}>Something went wrong</h1>
          <p className={styles.statusMessage}>{error}</p>
        </div>
        <Button variant="primary" onClick={onCancel}>
          Return Home
        </Button>
      </section>
    </ScreenLayout>
  );
}

export default ErrorState;
