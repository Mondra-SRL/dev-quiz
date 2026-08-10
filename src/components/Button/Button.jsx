import { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = forwardRef(function Button(
  {
    children,
    className,
    onClick,
    disabled,
    variant = 'primary',
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={[styles.button, className].filter(Boolean).join(' ')}
      data-variant={variant}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;