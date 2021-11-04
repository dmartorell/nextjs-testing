import React from 'react';
import styles from '../../styles/LoadingProgressBar.module.css';

const LoadingProgressBar = ({ width }) => (

  <section
    className={width > 0 ? `${styles.container}` : `${styles.invisibleContainer}`}
  >
    <div
      className={styles.progressBar}
      style={{ width: `${width}%` }}
    />
  </section>
);

export default LoadingProgressBar;
