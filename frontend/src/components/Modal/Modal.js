import React from 'react';
import styles from './Modal.module.css';

export default function Modal({ children, onClose }) {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
