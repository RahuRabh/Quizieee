import React, { useEffect, useState } from "react";
import styles from "./QuestionAnalysis.module.css";
import { useLocation } from "react-router-dom";

import Loader from "../../components/Loader/Loader"
import Navbar from "../../components/Navbar/Navbar";

import { questionWiseAnalysis } from "../../apis/quiz";

import {convertDate} from '../../utils/convertDate'
import { formatNumber } from "../../utils/formatNumber";


export default function QuestionAnalysis() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quizId = searchParams.get("quizId");
  const [quizAnalysisData, setquizAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(true);
        const response = await questionWiseAnalysis(quizId);
        setquizAnalysisData(response);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (isLoading) return <div><Loader /></div>;
  if (!quizAnalysisData) return <div>No data found.</div>;

  const { quizName, quizType, createdAt, impression, questionAnalysis } =
    quizAnalysisData;
  return (
    <div className={styles.homepage}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{quizName} Question Analysis</h1>
          <div className={styles.info}>
            <p>{convertDate(createdAt)}</p>
            <p>Impressions: {formatNumber(impression)}</p>
          </div>
        </div>
        <div className={styles.qscroll}>
          <div className={styles.questionsContainer}>
            {questionAnalysis.map((question, index) => (
              <div key={index} className={styles.questions}>
                <h2 className={styles.questionTitle}>
                  Q{index + 1} {question.questionName}?
                </h2>
                {quizType === "Poll" ? (
                  <div className={styles.grid}>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className={styles.statBox}>
                      <p className={styles.statNumber}>{option.clicks}</p>
                      <p className={styles.statLabel}>{option.text}</p>
                    </div>
                  ))}
                </div>
                ): (
                  <div className={styles.grid}>
                    <div className={styles.statBox}>
                       <p className={styles.statNumber}>{question.attempts}</p>
                       <p className={styles.statLabel}>people Attempted question</p>
                     </div>
                    <div className={styles.statBox}>
                       <p className={styles.statNumber}>{question.correct}</p>
                       <p className={styles.statLabel}>people Answered Correctly</p>
                     </div>
                     <div className={styles.statBox}>
                       <p className={styles.statNumber}>{question.incorrect}</p>
                       <p className={styles.statLabel}>people Answered Incorrectly</p>
                     </div>
                 </div>
                )}
                   <hr className={styles.Hrline} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
