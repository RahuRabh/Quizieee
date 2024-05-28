import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./QuestionAnalysis.module.css";
import { questionWiseAnalysis } from "../../apis/quiz"

import { useLocation } from "react-router-dom";
export default function QuestionAnalysis() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quizId = searchParams.get('quizId');
  const [quizAnalysisData, setquizAnalysisData] = useState([])
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await questionWiseAnalysis(quizId);
        setquizAnalysisData(response)
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);
  const convertDate = (dateString) => {
    const date = new Date(dateString)
    const option = {day: 'numeric', month: 'long', year: 'numeric'}
    return date.toLocaleDateString('en-Us', option)
  }
  return (
    <div className={styles.homepage}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{quizAnalysisData.quizName} Question Analysis</h1>
          <div className={styles.info}>
            {/* {quiz.createdOn} */}
            <p>{convertDate(quizAnalysisData.createdAt)}</p>
            {/* {quiz.impressions} */}
            <p>Impressions: 600</p>
          </div>
        </div>
        <div className={styles.qscroll}>
        <div className={styles.questionsContainer}>
          {/* {quiz.questions.map((question, index) => ( */}
          {/* key={index} */}
          <div className={styles.questions}>
            {/* {question.text} */}
            <h2 className={styles.questionTitle}>
              Q1. Question place holder for Analysis?
            </h2>
            <div className={styles.grid}>
              <div className={styles.statBox}>
                {/* {question.attempted} */}
                <p className={styles.statNumber}>60</p>
                <p className={styles.statLabel}>
                  people Attempted the question
                </p>
              </div>
              <div className={styles.statBox}>
                {/* {question.correct} */}
                <p className={styles.statNumber}>38</p>
                <p className={styles.statLabel}>people Answered Correctly</p>
              </div>
              <div className={styles.statBox}>
                {/* {question.incorrect} */}
                <p className={styles.statNumber}>22</p>
                <p className={styles.statLabel}>people Answered Incorrectly</p>
              </div>
            </div>
          </div>
          <hr className={styles.Hrline} />
          {/* ))} */}
        </div>
        <div className={styles.questionsContainer}>
          {/* {quiz.questions.map((question, index) => ( */}
          {/* key={index} */}
          <div className={styles.questions}>
            {/* {question.text} */}
            <h2 className={styles.questionTitle}>
              Q1. Question place holder for Analysis?
            </h2>
            <div className={styles.grid}>
              <div className={styles.statBox}>
                {/* {question.attempted} */}
                <p className={styles.statNumber}>60</p>
                <p className={styles.statLabel}>
                  people Attempted the question
                </p>
              </div>
              <div className={styles.statBox}>
                {/* {question.correct} */}
                <p className={styles.statNumber}>38</p>
                <p className={styles.statLabel}>people Answered Correctly</p>
              </div>
              <div className={styles.statBox}>
                {/* {question.incorrect} */}
                <p className={styles.statNumber}>22</p>
                <p className={styles.statLabel}>people Answered Incorrectly</p>
              </div>
            </div>
          </div>
          <hr className={styles.Hrline} />
          {/* ))} */}
        </div>

        <div className={styles.questionsContainer}>
          {/* {quiz.questions.map((question, index) => ( */}
          {/* key={index} */}
          <div className={styles.questions}>
            {/* {question.text} */}
            <h2 className={styles.questionTitle}>
              Q1. Question place holder for Analysis?
            </h2>
            <div className={styles.grid}>
              <div className={styles.statBox}>
                {/* {question.attempted} */}
                <p className={styles.statNumber}>60</p>
                <p className={styles.statLabel}>
                  people Attempted the question
                </p>
              </div>
              <div className={styles.statBox}>
                {/* {question.correct} */}
                <p className={styles.statNumber}>38</p>
                <p className={styles.statLabel}>people Answered Correctly</p>
              </div>
              <div className={styles.statBox}>
                {/* {question.incorrect} */}
                <p className={styles.statNumber}>22</p>
                <p className={styles.statLabel}>people Answered Incorrectly</p>
              </div>
            </div>
          </div>
          <hr className={styles.Hrline} />
          {/* ))} */}
        </div>
        </div>
      </div>
    </div>
  );
}
