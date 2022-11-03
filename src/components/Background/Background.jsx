import * as styles from './Background.module.css';
const Background = ({ children }) => {
  return (
    <div className={styles.background}>
      <div className={styles.scroll}>{children}</div>
    </div>
  );
};

export default Background;
