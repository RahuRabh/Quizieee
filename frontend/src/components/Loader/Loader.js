import React from 'react';
import styles from './Loader.module.css';

const LoadingLogo = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingLogo}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default LoadingLogo;