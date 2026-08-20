import logo from '../../assets/svg/logo-desktop-on-light.svg';
import styles from './LogoLink.module.css';

function LogoLink({ onNavigate, size = 'default' }) {
  function handleClick(event) {
    if (!onNavigate) return;

    event.preventDefault();
    onNavigate(event);
  }

  const logoClassName = size === 'compact'
    ? `${styles.logo} ${styles.compact}`
    : styles.logo;

  return (
    <a
      href="/"
      className={styles.link}
      aria-label="DevQuiz home"
      onClick={handleClick}
    >
      <img src={logo} alt="" className={logoClassName} />
    </a>
  );
}

export default LogoLink;
