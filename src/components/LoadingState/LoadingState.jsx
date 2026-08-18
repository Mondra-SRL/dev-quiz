import { Bars } from "react-loader-spinner";
import ScreenLayout from "../ScreenLayout";
import Button from "../Button";
import styles from "./LoadingState.module.css";

function LoadingState({ onCancel }) {
  return (
    <ScreenLayout>
      <section
        className={styles.statusState}
        role="status"
        aria-live="polite"
      >
        <Bars
          height="80"
          width="80"
          color="var(--color-olive-deep)"
          ariaLabel="Loading quiz questions"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <div className={styles.statusCopy}>
          <h1 className={styles.statusTitle}>Loading questions&#8230;</h1>
          <p className={styles.statusMessage}>
            We&#8217;re getting your quiz ready. This should only take a moment.
          </p>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          Return Home
        </Button>
      </section>
    </ScreenLayout>
  );
}

export default LoadingState;