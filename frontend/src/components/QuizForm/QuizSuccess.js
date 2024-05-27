import React from 'react';
import styles from './QuizSuccess.module.css';
import cross from '../../utils/cross.png'
export default function SuccessPopup({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <img alt='cross' src={cross} onClick={onClose} className={styles.closeButton}  />
        <div className={styles.body}>
          <h2>Congrats your Quiz is <br />Published!</h2>
          <input type="text" className={styles.linkInput} value="your link is here" readOnly />
        <button className={styles.shareButton}>Share</button>
        </div>
      </div>
    </div>
  );
}
