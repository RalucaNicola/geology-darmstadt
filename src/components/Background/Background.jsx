import * as styles from './Background.module.css';
import { Title } from '../index';
const Background = ({ title, size, children }) => {
  return (
    <div className={styles.background}>
      <Title text={title} size={size}></Title>
      <div className={styles.scroll}>{children}</div>
    </div>
  );
};

export default Background;
