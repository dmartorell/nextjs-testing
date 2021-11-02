import styles from '../../styles/Button.module.css';

const Button = ({ children, ...props }) => (
  <>
    <button type="button" className={styles.button} {...props}>
      {children}
    </button>
  </>
);

export default Button;
