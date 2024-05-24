import React, { useState } from "react";
import styles from "./QuizForm1.module.css";

export default function QuizForm1({
  onSubmit,
  onCancel,
}) {
  const [quizName, setQuizName] = useState('')
  const [quizType, setQuizType] = useState('')

  const handleSubmit = () => {
    onSubmit(quizName, quizType)
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <form className={styles.form}>
            <input
              type="text"
              id="quiz-name"
              className={styles.input}
              placeholder="Quiz name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          <div className={styles.formGroup}>
            <label className={styles.label}>Quiz Type</label>
            <div className={styles.buttonGroup}>
              <div
                className={styles.quizType} 
                onClick={() => setQuizType("Q&A")}
              >
                Q & A
              </div>
              <div
                className={styles.quizType}
                onClick={() => setQuizType("Poll")}
              >
                Poll Type
              </div>
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
        </form>
      </div>
    </div>
  );
}
