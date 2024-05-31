import React from "react";
import styles from "./QuizSuccess.module.css";
import cross from "../../utils/cross.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SuccessPopup({ onClose }) {
  const handleShareClick = () => {
    const quizId = localStorage.getItem("QuizId");
    const frontendUrl = process.env.REACT_APP_API_BASE_URL;
    const quizUrl = `${frontendUrl}/quiz/playQuiz/${quizId}`;
    navigator.clipboard
      .writeText(quizUrl)
      .then(() => {
        toast.success("Link copied to clipboard", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
      });
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <img
          alt="cross"
          src={cross}
          onClick={onClose}
          className={styles.closeButton}
        />
        <div className={styles.body}>
          <h2>
            Congrats your Quiz is <br />
            Published!
          </h2>
          <input
            type="text"
            className={styles.linkInput}
            value="your link is here"
            readOnly
          />
          <button className={styles.shareButton} onClick={handleShareClick}>
            Share
          </button>
        </div>
      </div>
      <ToastContainer toastContainerClassName="customToast" />
    </div>
  );
}
