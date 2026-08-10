import styles from './ScreenLayout.module.css';
import decorBottomLeft from '../../assets/svg/card-decor-bottom-left.svg';
import decorTopRight from '../../assets/svg/card-decor-top-right.svg';

function ScreenLayout({ children, inert = false }) {
  return (
    <div
      className={styles.canvas}
      inert={inert ? '' : undefined}
    >
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <main id="main-content" className={styles.card} tabIndex="-1">
        <img
          src={decorTopRight}
          alt=""
          aria-hidden="true"
          className={styles.decorTopRight}
        />
        <img
          src={decorBottomLeft}
          alt=""
          aria-hidden="true"
          className={styles.decorBottomLeft}
        />

        {children}
      </main>
    </div>
  );
}

export default ScreenLayout;