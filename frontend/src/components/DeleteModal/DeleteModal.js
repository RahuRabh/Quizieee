import React from "react";
import styles from "./DeleteModal.module.css";
import { deleteQuizById } from "../../apis/quiz";
const DeleteModal = ({ onClose, quizId, onConfirm }) => {
  const handleConfirmDelete = async () => {
    try {
      await deleteQuizById(quizId);
      onClose();
      onConfirm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          Are you confirm you
          <br /> want to delete ?
        </h2>
        <div className={styles.buttonGroup}>
          <button
            className={styles.confirmButton}
            onClick={handleConfirmDelete}
          >
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
