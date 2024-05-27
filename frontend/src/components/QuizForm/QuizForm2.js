import React, { useState } from 'react';
import del from '../../utils/del.png';
import cross from '../../utils/cross.png';
import styles from './QuizForm2.module.css';
const useFormValidation = (slides) => {
  const [errors, setErrors] = useState([]);

  const validate = () => {
    let validationErrors = [];
    slides.forEach((slide, index) => {
      if (!slide.question) {
        validationErrors.push(`Slide ${index + 1}: Question is required.`);
      }
      slide.options.forEach((option, optionIndex) => {
        if (!option.text && !option.image) {
          validationErrors.push(`Slide ${index + 1}, Option ${optionIndex + 1}: Option text or image is required.`);
        }
      });
      if (!slide.options.some(option => option.isCorrectAnswer)) {
        validationErrors.push(`Slide ${index + 1}: Correct answer is required.`);
      }
    });
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  return { validate, errors };
};

export default function QuizForm2({ onSubmit, onCancel, quizType }) {
  const initialOption = { text: '', image: '', isCorrectAnswer: false };
  const initialSlide = { slideNumber: 1, question: '', options: [initialOption, initialOption] };
  const [slides, setSlides] = useState([initialSlide]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [answerType, setAnswerType] = useState('text');
  const [selectedTimer, setSelectedTimer] = useState('off');
  const { validate, errors } = useFormValidation(slides);

  const handleAddSlide = () => {
    if (slides.length < 5) {
      const newSlide = { ...initialSlide, slideNumber: slides.length + 1, answerType };
      setSlides([...slides, newSlide]);
    }
  };

  const handleRemoveSlide = (index) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides.map((slide, i) => ({ ...slide, slideNumber: i + 1 })));
    setCurrentSlide(1);
  };

  const handleQuestionChange = (e, index) => {
    const updatedSlides = [...slides];
    updatedSlides[index].question = e.target.value;
    setSlides(updatedSlides);
  };

  const handleAnswerTypeChange = (type) => {
    setAnswerType(type);
    const updatedSlides = slides.map(slide => ({
      ...slide,
      answerType: type,
      options: slide.options.map(() => ({ ...initialOption }))
    }));
    setSlides(updatedSlides);
  };

  const handleOptionChange = (e, slideIndex, optionIndex, field) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].options[optionIndex] = {
      ...updatedSlides[slideIndex].options[optionIndex],
      [field]: e.target.value
    };
    setSlides(updatedSlides);
  };

  const handleAddOption = (slideIndex) => {
    const updatedSlides = [...slides];
    if (updatedSlides[slideIndex].options.length < 4) {
      updatedSlides[slideIndex].options.push({ ...initialOption });
      setSlides(updatedSlides);
    }
  };

  const handleRemoveOption = (slideIndex, optionIndex) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].options.splice(optionIndex, 1);
    setSlides(updatedSlides);
  };

  const handleCorrectAnswerChange = (slideIndex, optionIndex) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].options = updatedSlides[slideIndex].options.map((option, idx) => ({
      ...option,
      isCorrectAnswer: idx === optionIndex
    }));
    setSlides(updatedSlides);
  };

  const handleSubmit = () => {
    if (validate()) {
      const quizData = {
        slides,
        timer: selectedTimer,
      };
      onSubmit(quizData);
    } else {
      errors.forEach(error => alert(error));
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.slides}>
          <div className={styles.slide}>
            {slides.map((slide, index) => (
              <div key={slide.slideNumber} className={styles.slideButtonContainer}>
                <button
                  key={slide.slideNumber}
                  className={`${styles.slideButton} ${slide.slideNumber === currentSlide ? styles.active : ""}`}
                  onClick={() => setCurrentSlide(slide.slideNumber)}
                >
                  {slide.slideNumber}
                </button>
                {index > 0 && (
                  <img
                    className={styles.closeSlide}
                    src={cross}
                    alt="close"
                    onClick={() => handleRemoveSlide(index)}
                  />
                )}
              </div>
            ))}
            {slides.length < 5 && (
              <button onClick={handleAddSlide} className={styles.plus}>
                +
              </button>
            )}
          </div>
          <div>
            <p>Max 5 questions</p>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Question"
            value={slides[currentSlide - 1].question}
            onChange={(e) => handleQuestionChange(e, currentSlide - 1)}
            className={styles.questionInput}
          />
        </div>
        <div className={styles.optionType}>
          <label className={styles.optionLabel}>Option Type</label>
          <div className={styles.optionButtons}>
            <label>
              <input
                type="radio"
                name="optionType"
                value="text"
                checked={answerType === 'text'}
                onChange={() => handleAnswerTypeChange('text')}
                disabled={slides.length > 1}
              />
              Text
            </label>
            <label>
              <input
                type="radio"
                name="optionType"
                value="imageUrl"
                checked={answerType === 'imageUrl'}
                onChange={() => handleAnswerTypeChange('imageUrl')}
                disabled={slides.length > 1}
              />
              Image URL
            </label>
            <label>
              <input
                type="radio"
                name="optionType"
                value="textImageUrl"
                checked={answerType === 'textImageUrl'}
                onChange={() => handleAnswerTypeChange('textImageUrl')}
                disabled={slides.length > 1}
              />
              Text & Image URL
            </label>
          </div>
        </div>
        <div className={styles.answerOption}>
          <div>
            {slides[currentSlide - 1].options.map((option, optionIndex) => (
              <div key={optionIndex} className={`${styles.answers} ${option.isCorrectAnswer ? styles.correctAnswer : ''}`}>
                <input
                  type="radio"
                  name={`correctOption-${currentSlide}`}
                  checked={option.isCorrectAnswer}
                  onChange={() => handleCorrectAnswerChange(currentSlide - 1, optionIndex)}
                  className={styles.answerButton}
                />
                {(answerType === 'text' || answerType === 'textImageUrl') && (
                  <input
                    type="text"
                    placeholder="Text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(e, currentSlide - 1, optionIndex, 'text')}
                    className={styles.answerText}
                  />
                )}
                {(answerType === 'imageUrl' || answerType === 'textImageUrl') && (
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={option.image}
                    onChange={(e) => handleOptionChange(e, currentSlide - 1, optionIndex, 'image')}
                    className={styles.answerText}
                  />
                )}
                {slides[currentSlide - 1].options.length > 2 && optionIndex > 1 && (
                  <img className={styles.deletebtn} src={del} alt='delete' onClick={() => handleRemoveOption(currentSlide - 1, optionIndex)} />
                )}
              </div>
            ))}
            {slides[currentSlide - 1].options.length < 4 && (
              <button type="button" onClick={() => handleAddOption(currentSlide - 1)} className={styles.addOptionButton}>
                Add Option
              </button>
            )}
          </div>
          {quizType !== 'poll' && (
            <div className={styles.timerOptions}>
              <div className={styles.timerTitle}>Timer</div>
              <div className={`${styles.timer} ${selectedTimer === 'off' ? styles.selectedTimer : ''}`} onClick={() => setSelectedTimer('off')}>
                OFF
              </div>
              <div className={`${styles.timer} ${selectedTimer === '5sec' ? styles.selectedTimer : ''}`} onClick={() => setSelectedTimer('5sec')}>
                5 sec
              </div>
              <div className={`${styles.timer} ${selectedTimer === '10sec' ? styles.selectedTimer : ''}`} onClick={() => setSelectedTimer('10sec')}>
                10 sec
              </div>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          <button onClick={handleSubmit} className={styles.createButton}>Submit</button>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import del from '../../utils/del.png';
// import cross from '../../utils/cross.png';
// import styles from './QuizForm2.module.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const useFormValidation = (slides) => {
//   const [errors, setErrors] = useState([]);

//   const validate = () => {
//     let validationErrors = [];
//     slides.forEach((slide, index) => {
//       if (!slide.question) {
//         validationErrors.push(`Slide ${index + 1}: Question is required.`);
//       }
//       slide.options.forEach((option, optionIndex) => {
//         if (!option.text && !option.image) {
//           validationErrors.push(`Slide ${index + 1}, Option ${optionIndex + 1}: Option text or image is required.`);
//         }
//       });
//       if (!slide.options.some(option => option.isCorrectAnswer)) {
//         validationErrors.push(`Slide ${index + 1}: Correct answer is required.`);
//       }
//     });
//     setErrors(validationErrors);
//     return validationErrors.length === 0;
//   };

//   return { validate, errors };
// };

// export default function QuizForm2({ onSubmit, onCancel }) {
//   const initialOption = { text: '', image: '', isCorrectAnswer: false };
//   const initialSlide = { slideNumber: 1, question: '', options: [initialOption, initialOption] };
//   const [slides, setSlides] = useState([initialSlide]);
//   const [currentSlide, setCurrentSlide] = useState(1);
//   const [answerType, setAnswerType] = useState('text');
//   const [selectedTimer, setSelectedTimer] = useState('off');
//   const { validate, errors } = useFormValidation(slides);

//   const handleAddSlide = () => {
//     if (slides.length < 5) {
//       const newSlide = { ...initialSlide, slideNumber: slides.length + 1, answerType };
//       setSlides([...slides, newSlide]);
//     }
//   };

//   const handleRemoveSlide = (index) => {
//     const updatedSlides = slides.filter((_, i) => i !== index);
//     setSlides(updatedSlides.map((slide, i) => ({ ...slide, slideNumber: i + 1 })));
//     setCurrentSlide(1);
//   };

//   const handleQuestionChange = (e, index) => {
//     const updatedSlides = [...slides];
//     updatedSlides[index].question = e.target.value;
//     setSlides(updatedSlides);
//   };

//   const handleAnswerTypeChange = (type) => {
//     setAnswerType(type);
//     const updatedSlides = slides.map(slide => ({
//       ...slide,
//       answerType: type,
//       options: slide.options.map(() => ({ ...initialOption }))
//     }));
//     setSlides(updatedSlides);
//   };

//   const handleOptionChange = (e, slideIndex, optionIndex, field) => {
//     const updatedSlides = [...slides];
//     updatedSlides[slideIndex].options[optionIndex] = {
//       ...updatedSlides[slideIndex].options[optionIndex],
//       [field]: e.target.value
//     };
//     setSlides(updatedSlides);
//   };

//   const handleAddOption = (slideIndex) => {
//     const updatedSlides = [...slides];
//     if (updatedSlides[slideIndex].options.length < 4) {
//       updatedSlides[slideIndex].options.push({ ...initialOption });
//       setSlides(updatedSlides);
//     }
//   };

//   const handleRemoveOption = (slideIndex, optionIndex) => {
//     const updatedSlides = [...slides];
//     updatedSlides[slideIndex].options.splice(optionIndex, 1);
//     setSlides(updatedSlides);
//   };

//   const handleCorrectAnswerChange = (slideIndex, optionIndex) => {
//     const updatedSlides = [...slides];
//     updatedSlides[slideIndex].options = updatedSlides[slideIndex].options.map((option, idx) => ({
//       ...option,
//       isCorrectAnswer: idx === optionIndex
//     }));
//     setSlides(updatedSlides);
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       const quizData = {
//         slides,
//         timer: selectedTimer,
//       };
//       onSubmit(quizData);
//     } else {
//       errors.forEach(error => toast.error(error));
//     }
//   };

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.container}>
//         <ToastContainer />
//         <div className={styles.slides}>
//           <div className={styles.slide}>
//             {slides.map((slide, index) => (
//               <div key={slide.slideNumber} className={styles.slideButtonContainer}>
//                 <button
//                   key={slide.slideNumber}
//                   className={`${styles.slideButton} ${slide.slideNumber === currentSlide ? styles.active : ""}`}
//                   onClick={() => setCurrentSlide(slide.slideNumber)}
//                 >
//                   {slide.slideNumber}
//                 </button>
//                 {index > 0 && (
//                   <img
//                     className={styles.closeSlide}
//                     src={cross}
//                     alt="close"
//                     onClick={() => handleRemoveSlide(index)}
//                   />
//                 )}
//               </div>
//             ))}
//             {slides.length < 5 && (
//               <button onClick={handleAddSlide} className={styles.plus}>
//                 +
//               </button>
//             )}
//           </div>
//           <div>
//             <p>Max 5 questions</p>
//           </div>
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Question"
//             value={slides[currentSlide - 1].question}
//             onChange={(e) => handleQuestionChange(e, currentSlide - 1)}
//             className={styles.questionInput}
//           />
//         </div>
//         <div className={styles.optionType}>
//           <label className={styles.optionLabel}>Option Type</label>
//           <div className={styles.optionButtons}>
//             <label>
//               <input
//                 type="radio"
//                 name="optionType"
//                 value="text"
//                 checked={answerType === 'text'}
//                 onChange={() => handleAnswerTypeChange('text')}
//                 disabled={slides.length > 1}
//               />
//               Text
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="optionType"
//                 value="imageUrl"
//                 checked={answerType === 'imageUrl'}
//                 onChange={() => handleAnswerTypeChange('imageUrl')}
//                 disabled={slides.length > 1}
//               />
//               Image URL
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="optionType"
//                 value="textImageUrl"
//                 checked={answerType === 'textImageUrl'}
//                 onChange={() => handleAnswerTypeChange('textImageUrl')}
//                 disabled={slides.length > 1}
//               />
//               Text & Image URL
//             </label>
//           </div>
//         </div>
//         <div className={styles.answerOption}>
//           <div>
//             {slides[currentSlide - 1].options.map((option, optionIndex) => (
//               <div key={optionIndex} className={`${styles.answers} ${option.isCorrectAnswer ? styles.correctAnswer : ''}`}>
//                 <input
//                   type="radio"
//                   name={`correctOption-${currentSlide}`}
//                   checked={option.isCorrectAnswer}
//                   onChange={() => handleCorrectAnswerChange(currentSlide - 1, optionIndex)}
//                   className={styles.answerButton}
//                 />
//                 {(answerType === 'text' || answerType === 'textImageUrl') && (
//                   <input
//                     type="text"
//                     placeholder="Text"
//                     value={option.text}
//                     onChange={(e) => handleOptionChange(e, currentSlide - 1, optionIndex, 'text')}
//                     className={styles.answerText}
//                   />
//                 )}
//                 {(answerType === 'imageUrl' || answerType === 'textImageUrl') && (
//                   <input
//                     type="text"
//                     placeholder="Image URL"
//                     value={option.image}
//                     onChange={(e) => handleOptionChange(e, currentSlide - 1, optionIndex, 'image')}
//                     className={styles.answerText}
//                   />
//                 )}
//                 {slides[currentSlide - 1].options.length > 2 && optionIndex > 1 && (
//                   <img className={styles.deletebtn} src={del} alt='delete' onClick={() => handleRemoveOption(currentSlide - 1, optionIndex)} />
//                 )}
//               </div>
//             ))}
//             {slides[currentSlide - 1].options.length < 4 && (
//               <button type="button" onClick={() => handleAddOption(currentSlide - 1)} className={styles.addOptionButton}>
//                 Add Option
//               </button>
//             )}
//           </div>
//           {/* {quizType !== 'poll' && ( */}
//             <div className={styles.timerOptions}>
//               <div className={styles.timerTitle}>Timer</div>
//               <div className={`${styles.timer} ${selectedTimer === 'off' ? styles.selectedTimer : ''}`} onClick={() => setSelectedTimer('off')}>
//                 OFF
//               </div>
//               <div className={`${styles.timer} ${selectedTimer === '5sec' ? styles.selectedTimer : ''}`} onClick={() => setSelectedTimer('5sec')}>
//                 5 sec
//               </div>
//               <div className={`${styles.timer} ${selectedTimer === '10sec' ? styles.selectedTimer : ''}`} onClick={() => setSelectedTimer('10sec')}>
//                 10 sec
//               </div>
//             </div>
//           {/* )} */}
//         </div>
//         <div className={styles.actions}>
//           <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
//           <button onClick={handleSubmit} className={styles.createButton}>Submit</button>
//         </div>
//       </div>
//     </div>
//   );
// }
