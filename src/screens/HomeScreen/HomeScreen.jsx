import { useRef, useEffect } from 'react';
import styles from './HomeScreen.module.css';
import logo from '../../assets/logo-desktop-on-light.svg';
import QuizSelector from '../../components/QuizSelector';
import ScreenLayout from '../../components/ScreenLayout';
import Button from '../../components/Button';
import quizTopics from '../../data/quizTopics';
import ArrowRightIcon from '../../components/ArrowRightIcon';

function HomeScreen({ selectedTopic, onSelectTopic, onStart }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (selectedTopic && buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedTopic]);
  return (
    <ScreenLayout>
      <header className={styles.header}>
        <img src={logo} alt="devquiz" className={styles.logo} />
        <div className={styles.headerCopy}>
          <h1>Sharpen your code skills,<br />one quiz at a time</h1>
          <p>Pick a topic and take a quick timed quiz.</p>
        </div>
      </header>

      <QuizSelector
        topics={quizTopics}
        selectedTopic={selectedTopic}
        onSelectTopic={onSelectTopic}
      />

      <div ref={buttonRef}>
        <Button variant="primary" onClick={onStart} disabled={!selectedTopic}>
          Start Quiz <ArrowRightIcon />
        </Button>
      </div>
    </ScreenLayout>
  );
}

export default HomeScreen;
