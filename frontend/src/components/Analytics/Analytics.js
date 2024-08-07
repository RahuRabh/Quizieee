import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import share from "../../assets/share.png";
import delte from "../../assets/del.png";
import edit from "../../assets/uil_edit.png";

import { convertDate } from "../../utils/convertDate";
import { formatNumber } from "../../utils/formatNumber";

import DeleteModal from "../DeleteModal/DeleteModal";

import { useNavigate } from "react-router-dom";
import { getQuizByUser } from '../../apis/quiz'

import QuizForm2 from "../QuizForm/QuizForm2";

export default function Analytics({onEditQuiz}) {
  
  const navigate = useNavigate();
  const [quizAnalytics, setquizAnalytics] = useState([])
  const [quizIdToDelete, setQuizIdToDelete] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showEditQuizForm] = useState(false);
  const [editQuizId] = useState()
  const handleDeleteClick = (quizId) => {
    setQuizIdToDelete(quizId)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const userId = localStorage.getItem('userId')
  const fetchQuiz = async () => {
    try {
      const response = await getQuizByUser(userId);
      setquizAnalytics(response.quizAnalytics)
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  useEffect(() => {
    fetchQuiz(); 
  }, [userId]);
  
  const handleShareClick = (quizId) => {
    const frontendUrl = process.env.REACT_APP_API_BASE_URL
    const quizUrl = `${frontendUrl}/quiz/playQuiz/${quizId}`
    navigator.clipboard.writeText(quizUrl)
      .then(() => {
        toast.success('Link copied to clipboard', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
      });
  };

  return (
    <div className={styles.analyticsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Quiz Analysis</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr >
                <th className={styles.tableCell}>S.No</th>
                <th className={styles.tableCell}>Quiz Name</th>
                <th className={styles.tableCell}>Created on</th>
                <th className={styles.tableCell}>Impression</th>
                <th className={styles.tableCell}></th>
                <th className={styles.tableCell}></th>
              </tr>
             
            </thead>
            <tbody className={styles.tableBody}>
              {quizAnalytics.map((quiz, index) => (
                <tr
                  key={index}
                  className={`${styles.tableRow} ${
                    index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                  }`}
                >
                  <td className={styles.tableCell}>{index +1}</td>
                  <td className={styles.tableCell}>{quiz.name}</td>
                  <td className={styles.tableCell}>{convertDate(quiz.createdAt)}</td>
                  <td className={styles.tableCell}>{formatNumber(quiz.impression)}</td>
                  <td className={`${styles.tableCell} ${styles.tableActions}`}>
                    <img onClick={ () => onEditQuiz(quiz.quizId)} src={edit} alt="edit" className={styles.tableIcon} />
                    <img
                      onClick={ () => handleDeleteClick(quiz.quizId)}
                      src={delte}
                      alt="delete"
                      className={styles.tableIcon}
                    />
                    <img src={share} onClick= { () => handleShareClick(quiz.quizId)} alt="share" className={styles.tableIcon} />
                  </td>
                  <td
                    onClick={() => navigate(`/question-analysis?quizId=${quiz.quizId}`)}
                    className={`${styles.tableCell} ${styles.tableAnalysis}`}
                  >
                    Question Wise Analysis
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <DeleteModal onConfirm={fetchQuiz} quizId={quizIdToDelete} onClose={handleCloseModal} />
        )}
      </div>
      {showEditQuizForm && <QuizForm2 editQuizId={editQuizId} />}
      <ToastContainer toastContainerClassName="customToast" />
      </div>
  );
}
