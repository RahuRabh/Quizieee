import React from 'react';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ onClose, onConfirm }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Are you confirm you<br /> want to delete ?</h2>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirm Delete
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
