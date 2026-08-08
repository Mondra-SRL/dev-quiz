import { useEffect, useRef } from 'react';
import styles from './ExitQuizModal.module.css';
import logo from '../../assets/svg/logo-mobile-on-light.svg';
import Button from '../Button';
import arrowRightIconMerino from '../../assets/svg/arrow-right-icon-merino.svg';
import arrowRightIconPurple from '../../assets/svg/arrow-right-icon-purple.svg';

function ExitQuizModal({ onContinue, onExit, returnFocusRef }) {
  const dialogRef = useRef(null);
  const continueButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = returnFocusRef?.current ?? document.activeElement;
    continueButtonRef.current?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [returnFocusRef]);

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onContinue();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = dialogRef.current?.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  return (
    <div className={styles.backdrop}>
      <section
        ref={dialogRef}
        className={styles.exitQuizModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-quiz-title"
        aria-describedby="exit-quiz-description"
        onKeyDown={handleKeyDown}
      >
        <div className={styles.resultsWrapper}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={logo} alt="devquiz" />
          </div>

          <div className={styles.modalMessage}>
            <h2 id="exit-quiz-title">Are you sure you want to quit?</h2>
            <p id="exit-quiz-description">Progress will be lost.</p>
          </div>

          <div className={styles.buttons}>
            <Button
              ref={continueButtonRef}
              className={styles.modalButton}
              variant="primary"
              onClick={onContinue}
            >
              Continue Quiz
              <img
                src={arrowRightIconMerino}
                alt=""
                aria-hidden="true" />
            </Button>
            <Button
              className={styles.modalButton}
              variant="secondary"
              onClick={onExit}
            >
              Exit Quiz
              <img
                src={arrowRightIconPurple}
                alt=""
                aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ExitQuizModal;