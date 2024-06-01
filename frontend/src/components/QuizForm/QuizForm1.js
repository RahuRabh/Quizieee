import React, { useState } from "react";
import styles from "./QuizForm1.module.css";

export default function QuizForm1({ onSubmit, onCancel }) {
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("");
  const [selectedQuizType, setSelectedQuizType] = useState("");

  const handleSubmit = () => {
    onSubmit(quizName, quizType);
  };
  const handleQuizTypeClick = (type) => {
    setQuizType(type);
    setSelectedQuizType(type);
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <input
              type="text"
              id="quiz-name"
              className={styles.input}
              placeholder="Quiz name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.label}>Quiz Type</div>
            <div
              className={`${styles.quizType} ${
                selectedQuizType === "Q&A" ? styles.selected : ""
              }`}
              onClick={() => handleQuizTypeClick("Q&A")}
            >
              Q & A
            </div>
            <div
              className={`${styles.quizType} ${
                selectedQuizType === "Poll" ? styles.selected : ""
              }`}
              onClick={() => handleQuizTypeClick("Poll")}
            >
              Poll Type
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.continueButton}
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
