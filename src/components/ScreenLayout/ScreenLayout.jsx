import styles from './ScreenLayout.module.css';
import decorBottomLeft from '../../assets/card-decor-bottom-left.svg';
import decorTopRight from '../../assets/card-decor-top-right.svg';

function ScreenLayout({ children }) {
  return (
    <div className={styles.canvas}>
      <div className={styles.card}>
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
      </div>
    </div>
  );
}

export default ScreenLayout;
