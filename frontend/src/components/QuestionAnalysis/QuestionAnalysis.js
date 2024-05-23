import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./QuestionAnalysis.module.css";

export default function QuizQuestionAnalysis() {
  return (
    <div className={styles.homepage}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          {/* {quiz.number} */}
          <h1 className={styles.title}>Quiz 1 Question Analysis</h1>
          <div className={styles.info}>
            {/* {quiz.createdOn} */}
            <p>Created on: 04 Sep, 2023</p>
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
