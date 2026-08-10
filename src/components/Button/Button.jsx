import { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = forwardRef(function Button(
  { children, onClick, disabled, variant = 'primary', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
