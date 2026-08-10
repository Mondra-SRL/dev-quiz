import { useState, useEffect } from 'react';
import styles from './ResultsCard.module.css';
import { getPerformanceBand } from '../../data/resultsMessages';

function ResultsCard({ score, totalQuestions }) {
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  // use state for animated percentage ring
  const [animatedPercentage, setAnimatedPercentage] = useState(0); 
  // on mount , update the state to the real percentage , using requestAnimationFrame , so browser paints 0% first 
  // and then animates to the real percentage
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setAnimatedPercentage(percentage);
    });
    return () => cancelAnimationFrame(animationFrame);
  }, [percentage]);

    // get result title and description based on the percentage
  const band = getPerformanceBand(percentage);
  const [resultMessage] = useState(
    () => band.messages[Math.floor(Math.random() * band.messages.length)]
  )
  
  return (
    <div className={styles.resultsCard}>
            <div className={styles.scoreCard}>
                <div className={styles.scoreRing}  style={{ '--_score-pct': `${Math.min(animatedPercentage, 100)}%` }}/>
                <div className={styles.scoreRingMask} />
                <div className={styles.scoreEllipseOutsideBorder} />
                <div className={styles.scoreEllipseInsideBorder} />
                <div className={styles.scoreText}>
                  <span className={styles.scoreNumbers}>{score}/{totalQuestions}</span>
                  <span className={styles.scoreLabel}>Score</span>
                </div>
              </div>
    
              <div className={styles.resultsCopy} aria-live="polite">
                <h2>{band.title}</h2>
                <p>{resultMessage}</p>
              </div>
    </div>
  )
}

export default ResultsCard;