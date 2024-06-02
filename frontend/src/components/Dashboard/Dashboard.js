// import React, { useEffect, useState } from "react";

// import styles from "./Dashboard.module.css";
// import eye from "../../assets/eye.png";

// import { getQuizByUser } from '../../apis/quiz';

// import { formatNumber } from '../../utils/formatNumber'
// import { convertDate} from '../../utils/convertDate'

// import Loader from '../../components/Loader/Loader'

// export default function Dashboard() {
//   const [quizData, setQuizData] = useState(null);
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await getQuizByUser(userId);
//         setQuizData(response);
//       } catch (error) {
//         console.error('Error fetching quiz:', error);
//       }
//     };

//     fetchQuiz();
//   }, [userId]);

//   if (!quizData) return <div><Loader /></div>;

//   const { dashboardData, quizAnalytics } = quizData;

//   return (
//     <div className={styles.main}>
//       <div className={styles.heading}>
//         <div className={styles.quiz}>
//           <p className={styles.no}>{dashboardData.totalQuizzes}</p>
//           <p className={styles.title}>Quiz</p>
//           <p className={styles.text}>Created</p>
//         </div>
//         <div className={styles.questions}>
//           <p className={styles.no}>{dashboardData.totalQuestions}</p>
//           <p className={styles.title}>questions</p>
//           <p className={styles.text}>Created</p>
//         </div>
//         <div className={styles.impressions}>
//           <p className={styles.no}>{formatNumber(dashboardData.totalImpression)}</p>
//           <p className={styles.title}>Total</p>
//           <p className={styles.text}>Impressions</p>
//         </div>
//       </div>
//       <div className={styles.content}>
//         <h2>Trending Quizzes</h2>
//         <div className={styles.quizList}>
//           {quizAnalytics.map((quiz, index) => (
//             <div key={index} className={styles.tquiz}>
//             <div className={styles.container}>
//               <p className={styles.name}>{quiz.name}</p>
//               <p className={styles.eye}>
//                 {formatNumber(quiz.impression)}
//               </p>
//               <img className={styles.eyeIcon} alt="eye" src={eye} />
//               </div>
//               <div>
//               <p className={styles.date}>{convertDate(quiz.createdAt)}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import eye from "../../assets/eye.png";
import { getQuizByUser } from '../../apis/quiz';
import { formatNumber } from '../../utils/formatNumber'
import { convertDate} from '../../utils/convertDate'
import Loader from '../../components/Loader/Loader'

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

  if (!quizData) return <div><Loader /></div>;

  const { dashboardData, quizAnalytics } = quizData;

  // Sort quizAnalytics in decreasing order based on impressions
  const sortedQuizAnalytics = quizAnalytics.sort((a, b) => b.impression - a.impression);

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
          <p className={styles.no}>{formatNumber(dashboardData.totalImpression)}</p>
          <p className={styles.title}>Total</p>
          <p className={styles.text}>Impressions</p>
        </div>
      </div>
      <div className={styles.content}>
        <h2>Trending Quizzes</h2>
        <div className={styles.quizList}>
          {sortedQuizAnalytics.map((quiz, index) => (
            <div key={index} className={styles.tquiz}>
              <div className={styles.container}>
                <p className={styles.name}>{quiz.name}</p>
                <p className={styles.eye}>
                  {formatNumber(quiz.impression)}
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