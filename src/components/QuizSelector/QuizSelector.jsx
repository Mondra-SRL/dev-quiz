import styles from './QuizSelector.module.css';
import checkedBadge from '../../assets/checked-badge.svg';

function QuizSelector({ topics, selectedTopic, onSelectTopic }) {
  return (
    <div className={styles.grid} role="group" aria-label="Select a quiz topic">
      {topics.map((topic) => (
        <label key={topic.id} className={styles.card}>
          <input
            type="radio"
            name="topic"
            value={topic.id}
            checked={selectedTopic?.id === topic.id}
            onChange={() => onSelectTopic(topic)}
            className="visually-hidden"
          />
          <img src={topic.image} alt="" className={styles.icon} />
          <span className={styles.name}>{topic.name}</span>
          <img src={checkedBadge} alt="" className={styles.badge} aria-hidden="true" />
        </label>
      ))}
    </div>
  );
}

export default QuizSelector;
