import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import eye from "../../utils/eye.png";
import { useParams } from "react-router-dom";
import { getQuizByUser } from '../../apis/quiz'
export default function Dashboard() {
  const [quizData, setquizData] = useState([])

  const userId = localStorage.getItem('userId')
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizByUser(userId);
        setquizData(response.dashboardData)
        // Increment impressions
        // await axios.post(`/api/quiz/${id}/impression`);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [userId]);
    
  return (
      <div className={styles.main}>
        <div className={styles.heading}>
          <div className={styles.quiz}>
            <p className={styles.no}>{quizData.totalQuizzes}</p>
            <p className={styles.title}>Quiz</p>
            <p className={styles.text}>Created</p>
          </div>
          <div className={styles.questions}>
            <p className={styles.no}>{quizData.totalQuestions}</p>
            <p className={styles.title}>questions</p>
            <p className={styles.text}>Created</p>
          </div>
          <div className={styles.impressions}>
            <p className={styles.no}>1.4k</p>
            <p className={styles.title}>Total</p>
            <p className={styles.text}>Impressions</p>
          </div>
        </div>
        <div className={styles.content}>
          <h2>Trending Quizes</h2>
          <div className={styles.quizList}>
            <div className={styles.tquiz}>
              <p className={styles.name}>Quiz 1</p>
              <p className={styles.eye}>
                600 <img alt="eye" src={eye} />
              </p>
              <p className={styles.date}>Created on: 04 Sep, 2023</p>
            </div>
          </div>
        </div>
      </div>
  );
}
