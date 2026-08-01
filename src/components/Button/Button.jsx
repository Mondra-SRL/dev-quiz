import styles from './Button.module.css';

function Button({ children, onClick, disabled, variant = 'primary' }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
