import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import eye from "../../utils/eye.png";
import { getQuizByUser } from '../../apis/quiz';

export default function Dashboard() {
  const [quizData, setQuizData] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizByUser(userId);
        setQuizData(response);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [userId]);

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const option = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", option);
  };

  if (!quizData) return <div>Loading...</div>;

  const { dashboardData, quizAnalytics } = quizData;

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <div className={styles.quiz}>
          <p className={styles.no}>{dashboardData.totalQuizzes}</p>
          <p className={styles.title}>Quiz</p>
          <p className={styles.text}>Created</p>
        </div>
        <div className={styles.questions}>
          <p className={styles.no}>{dashboardData.totalQuestions}</p>
          <p className={styles.title}>questions</p>
          <p className={styles.text}>Created</p>
        </div>
        <div className={styles.impressions}>
          <p className={styles.no}>{dashboardData.totalImpression}</p>
          <p className={styles.title}>Total</p>
          <p className={styles.text}>Impressions</p>
        </div>
      </div>
      <div className={styles.content}>
        <h2>Trending Quizzes</h2>
        <div className={styles.quizList}>
          {quizAnalytics.map((quiz, index) => (
            <div key={index} className={styles.tquiz}>
            <div className={styles.container}>
              <p className={styles.name}>{quiz.name}</p>
              <p className={styles.eye}>
                {quiz.impression}
              </p>
              <img className={styles.eyeIcon} alt="eye" src={eye} />
              </div>
              <div>
              <p className={styles.date}>{convertDate(quiz.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}