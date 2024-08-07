// import React, { useEffect, useState } from "react";

// //icons
// import del from "../../assets/del.png";
// import cross from "../../assets/cross.png";

// //styles
// import styles from "./QuizForm2.module.css";

// //toast container
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// //form validation
// const useFormValidation = (slides) => {
//   const [errors] = useState([]);
//   const validate = () => {
//     let validationErrors = [];
//     slides.forEach((slide, index) => {
//       //validating question
//       if (!slide.question) {
//         validationErrors.push(`Slide ${index + 1}: Question is required.`);
//       }
//       //validating answer type
//       if (!slide.answerType) {
//         validationErrors.push(`Slide ${index + 1}: Option type is required.`);
//       }
//       //validating option type
//       slide.options.forEach((option, optionIndex) => {
//         if (!option.text && !option.image) {
//           validationErrors.push(
//             `Slide ${index + 1}, Option ${
//               optionIndex + 1
//             }: Option text or image is required.`
//           );
//         }
//       });
//       //validating correct answer
//       if (!slide.options.some((option) => option.isCorrectAnswer)) {
//         validationErrors.push(
//           `Slide ${index + 1}: Correct answer is required.`
//         );
//       }
//     });
//     validationErrors.forEach((error) => toast.error(error));
    
//     return validationErrors.length === 0;
//   };

//   return { validate, errors };
// };

// export default function QuizForm2({
//   initialSlides,
//   onSubmit,
//   onCancel,
//   quizType,
// }) {
//   const initialOption = { text: "", image: "", isCorrectAnswer: false };
//   const initialSlide = {
//     slideNumber: 1,
//     question: "",
//     options: [initialOption, initialOption],
//   };
//   const [slides, setSlides] = useState(
//     initialSlides.length > 0 ? initialSlides : [initialSlide]
//   );
//   const [currentSlide, setCurrentSlide] = useState(1);
//   const [answerType, setAnswerType] = useState("text");
//   const [selectedTimer, setSelectedTimer] = useState("off");
//   const [userInteracted, setUserInteracted] = useState(false);
//   const { validate, errors } = useFormValidation(slides);

//   useEffect(() => {
//     if (initialSlides && initialSlides.length > 0) {
//       setSlides(
//         initialSlides.map((slide, index) => ({
//           ...slide,
//           slideNumber: index + 1,
//         }))
//       );
//       setCurrentSlide(1);
//       setAnswerType(initialSlides[0].answerType || "text");
//     }
//   }, [initialSlides]);

//   //logic for adding slides
//   const handleAddSlide = () => {
//     if (slides.length < 5) {
//       const newSlide = {
//         ...initialSlide,
//         slideNumber: slides.length + 1,
//         answerType,
//       };
//       setSlides((prevSlides) => [...prevSlides, newSlide]);
//       setCurrentSlide(slides.length + 1);
//     }
//   };
//   //logic for removing slides
//   const handleRemoveSlide = (index) => {
//     const updatedSlides = slides
//       .filter((_, i) => i !== index)
//       .map((slide, i) => ({ ...slide, slideNumber: i + 1 }));
//     setSlides(updatedSlides);
//     setCurrentSlide((prev) =>
//       Math.max(1, Math.min(prev, updatedSlides.length))
//     );
//   };
//   //logic for question change
//   const handleQuestionChange = (e, index) => {
//     const updatedSlides = [...slides];
//     updatedSlides[index].question = e.target.value;
//     setSlides(updatedSlides);
//   };
//   //logic for handling answer type
//   const handleAnswerTypeChange = (type) => {
//     setAnswerType(type);
//     setUserInteracted(true);
//     const updatedSlides = slides.map((slide) => ({
//       ...slide,
//       answerType: type,
//       options: slide.options
//         ? slide.options.map(() => ({ ...initialOption }))
//         : [],
//     }));
//     setSlides(updatedSlides);
//   };
//   //logic for handling option change
//   const handleOptionChange = (e, slideIndex, optionIndex, field) => {
//     const updatedSlides = [...slides];
//     updatedSlides[slideIndex].options[optionIndex] = {
//       ...updatedSlides[slideIndex].options[optionIndex],
//       [field]: e.target.value,
//     };
//     setSlides(updatedSlides);
//   };
//   //logic for adding options
//   const handleAddOption = (slideIndex) => {
//     const updatedSlides = [...slides];
//     if (updatedSlides[slideIndex].options.length < 4) {
//       updatedSlides[slideIndex].options.push({ ...initialOption });
//       setSlides(updatedSlides);
//     }
//   };
//   //logic for removing options
//   const handleRemoveOption = (slideIndex, optionIndex) => {
//     const updatedSlides = [...slides];
//     updatedSlides[slideIndex].options.splice(optionIndex, 1);
//     setSlides(updatedSlides);
//   };
//   //logic for choosing correct answer
//   const handleCorrectAnswerChange = (slideIndex, optionIndex) => {
//     const updatedSlides = [...slides];
//     updatedSlides[slideIndex].options = updatedSlides[slideIndex].options.map(
//       (option, idx) => ({
//         ...option,
//         isCorrectAnswer: idx === optionIndex,
//       })
//     );
//     setSlides(updatedSlides);
//   };
//   //logic for submiting the form
//   const handleSubmit = () => {
//     if (validate()) {
//       const quizData = slides.map((slide) => ({
//         question: slide.question,
//         answerType: slide.answerType,
//         options: slide.options.map((option) => ({
//           text: option.text,
//           image: option.image,
//           isCorrectAnswer: option.isCorrectAnswer,
//         })),
//         timer: selectedTimer,
//       }));
//       onSubmit(quizData);
//     } else {
//       errors.forEach((error) => alert(error));
//     }
//   }; 

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.container}>
//         <div className={styles.slides}>
//           <div className={styles.slide}>
//             {slides.map((slide, index) => (
//               <div
//                 key={slide.slideNumber}
//                 className={styles.slideButtonContainer}
//               >
//                 <button
//                   key={slide.slideNumber}
//                   className={`${styles.slideButton} ${
//                     slide.slideNumber === currentSlide ? styles.active : ""
//                   }`}
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
//             value={slides[currentSlide - 1]?.question || ""}
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
//                 checked={userInteracted && answerType === "text"}
//                 onChange={() => handleAnswerTypeChange("text")}
//                 disabled={slides.length > 1}
//                 className={styles.radioinput}
//               />
//               Text
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="optionType"
//                 value="imageUrl"
//                 checked={userInteracted && answerType === "imageUrl"}
//                 onChange={() => handleAnswerTypeChange("imageUrl")}
//                 disabled={slides.length > 1}
//                 className={styles.radioinput}
//               />
//               Image URL
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="optionType"
//                 value="textImageUrl"
//                 checked={userInteracted && answerType === "textImageUrl"}
//                 onChange={() => handleAnswerTypeChange("textImageUrl")}
//                 disabled={slides.length > 1}
//                 className={styles.radioinput}
//               />
//               Text & Image URL
//             </label>
//           </div>
//         </div>
//         <div className={styles.answerOption}>
//           <div>
//             {slides[currentSlide - 1].options.map((option, optionIndex) => (
//               <div
//                 key={optionIndex}
//                 className={`${styles.answers} ${
//                   option.isCorrectAnswer ? styles.correctAnswer : ""
//                 }`}
//               >
//                 <label className={styles.radioLabel}>
//                   <input
//                     type="radio"
//                     name={`correctOption-${currentSlide}`}
//                     checked={option.isCorrectAnswer}
//                     onChange={() =>
//                       handleCorrectAnswerChange(currentSlide - 1, optionIndex)
//                     }
//                     className={styles.answerButton}
//                   />
//                   <div className={styles.inputContainer}>
//                     {(answerType === "text" ||
//                       answerType === "textImageUrl") && (
//                       <input
//                         type="text"
//                         placeholder="Text"
//                         value={option.text}
//                         onChange={(e) =>
//                           handleOptionChange(
//                             e,
//                             currentSlide - 1,
//                             optionIndex,
//                             "text"
//                           )
//                         }
//                         className={`${styles.answerText} ${
//                           option.isCorrectAnswer
//                             ? styles.optionInputSelected
//                             : ""
//                         }`}
//                       />
//                     )}
//                     {(answerType === "imageUrl" ||
//                       answerType === "textImageUrl") && (
//                       <input
//                         type="text"
//                         placeholder="Image URL"
//                         value={option.image}
//                         onChange={(e) =>
//                           handleOptionChange(
//                             e,
//                             currentSlide - 1,
//                             optionIndex,
//                             "image"
//                           )
//                         }
//                         className={`${styles.answerText} ${
//                           option.isCorrectAnswer
//                             ? styles.optionInputSelected
//                             : ""
//                         }`}
//                       />
//                     )}
//                     {slides[currentSlide - 1].options.length > 2 &&
//                       optionIndex > 1 && (
//                         <img
//                           className={styles.deletebtn}
//                           src={del}
//                           alt="delete"
//                           onClick={() =>
//                             handleRemoveOption(currentSlide - 1, optionIndex)
//                           }
//                         />
//                       )}
//                   </div>
//                 </label>
//               </div>
//             ))}
//             {slides[currentSlide - 1].options.length < 4 && (
//               <button
//                 type="button"
//                 onClick={() => handleAddOption(currentSlide - 1)}
//                 className={styles.addOptionButton}
//               >
//                 Add Option
//               </button>
//             )}
//           </div>
//           {quizType !== "Poll" && (
//             <div className={styles.timerOptions}>
//               <div className={styles.timerTitle}>Timer</div>
//               <div
//                 className={`${styles.timer} ${
//                   selectedTimer === "off" ? styles.selectedTimer : ""
//                 }`}
//                 onClick={() => setSelectedTimer("off")}
//               >
//                 OFF
//               </div>
//               <div
//                 className={`${styles.timer} ${
//                   selectedTimer === "5sec" ? styles.selectedTimer : ""
//                 }`}
//                 onClick={() => setSelectedTimer("5sec")}
//               >
//                 5 sec
//               </div>
//               <div
//                 className={`${styles.timer} ${
//                   selectedTimer === "10sec" ? styles.selectedTimer : ""
//                 }`}
//                 onClick={() => setSelectedTimer("10sec")}
//               >
//                 10 sec
//               </div>
//             </div>
//           )}
//         </div>
//         <div className={styles.actions}>
//           <button onClick={onCancel} className={styles.cancelButton}>
//             Cancel
//           </button>
//           <button onClick={handleSubmit} className={styles.createButton}>
//             Submit
//           </button>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

//icons
import del from "../../assets/del.png";
import cross from "../../assets/cross.png";

//styles
import styles from "./QuizForm2.module.css";

//toast container
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//form validation
const useFormValidation = (slides, quizType) => {
  const [errors] = useState([]);
  const validate = () => {
    let validationErrors = [];
    slides.forEach((slide, index) => {
      //validating question
      if (!slide.question) {
        validationErrors.push(`Slide ${index + 1}: Question is required.`);
      }
      //validating answer type
      if (!slide.answerType) {
        validationErrors.push(`Slide ${index + 1}: Option type is required.`);
      }
      //validating option type
      slide.options.forEach((option, optionIndex) => {
        if (!option.text && !option.image) {
          validationErrors.push(
            `Slide ${index + 1}, Option ${
              optionIndex + 1
            }: Option text or image is required.`
          );
        }
      });
      //validating correct answer
      if (quizType !== "Poll" && !slide.options.some((option) => option.isCorrectAnswer)) {
        validationErrors.push(
          `Slide ${index + 1}: Correct answer is required.`
        );
      }
    });
    validationErrors.forEach((error) => toast.error(error));
    
    return validationErrors.length === 0;
  };

  return { validate, errors };
};

export default function QuizForm2({
  initialSlides,
  onSubmit,
  onCancel,
  quizType,
}) {
  const initialOption = { text: "", image: "", isCorrectAnswer: false };
  const initialSlide = {
    slideNumber: 1,
    question: "",
    options: [initialOption, initialOption],
  };
  const [slides, setSlides] = useState(
    initialSlides.length > 0 ? initialSlides : [initialSlide]
  );
  const [currentSlide, setCurrentSlide] = useState(1);
  const [answerType, setAnswerType] = useState("text");
  const [selectedTimer, setSelectedTimer] = useState("off");
  const [userInteracted, setUserInteracted] = useState(false);
  const { validate, errors } = useFormValidation(slides, quizType);

  useEffect(() => {
    if (initialSlides && initialSlides.length > 0) {
      setSlides(
        initialSlides.map((slide, index) => ({
          ...slide,
          slideNumber: index + 1,
        }))
      );
      setCurrentSlide(1);
      setAnswerType(initialSlides[0].answerType || "text");
    }
  }, [initialSlides]);

  //logic for adding slides
  const handleAddSlide = () => {
    if (slides.length < 5) {
      const newSlide = {
        ...initialSlide,
        slideNumber: slides.length + 1,
        answerType,
      };
      setSlides((prevSlides) => [...prevSlides, newSlide]);
      setCurrentSlide(slides.length + 1);
    }
  };
  //logic for removing slides
  const handleRemoveSlide = (index) => {
    const updatedSlides = slides
      .filter((_, i) => i !== index)
      .map((slide, i) => ({ ...slide, slideNumber: i + 1 }));
    setSlides(updatedSlides);
    setCurrentSlide((prev) =>
      Math.max(1, Math.min(prev, updatedSlides.length))
    );
  };
  //logic for question change
  const handleQuestionChange = (e, index) => {
    const updatedSlides = [...slides];
    updatedSlides[index].question = e.target.value;
    setSlides(updatedSlides);
  };
  //logic for handling answer type
  const handleAnswerTypeChange = (type) => {
    setAnswerType(type);
    setUserInteracted(true);
    const updatedSlides = slides.map((slide) => ({
      ...slide,
      answerType: type,
      options: slide.options
        ? slide.options.map(() => ({ ...initialOption }))
        : [],
    }));
    setSlides(updatedSlides);
  };
  //logic for handling option change
  const handleOptionChange = (e, slideIndex, optionIndex, field) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].options[optionIndex] = {
      ...updatedSlides[slideIndex].options[optionIndex],
      [field]: e.target.value,
    };
    setSlides(updatedSlides);
  };
  //logic for adding options
  const handleAddOption = (slideIndex) => {
    const updatedSlides = [...slides];
    if (updatedSlides[slideIndex].options.length < 4) {
      updatedSlides[slideIndex].options.push({ ...initialOption });
      setSlides(updatedSlides);
    }
  };
  //logic for removing options
  const handleRemoveOption = (slideIndex, optionIndex) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].options.splice(optionIndex, 1);
    setSlides(updatedSlides);
  };
  //logic for choosing correct answer
  const handleCorrectAnswerChange = (slideIndex, optionIndex) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].options = updatedSlides[slideIndex].options.map(
      (option, idx) => ({
        ...option,
        isCorrectAnswer: idx === optionIndex,
      })
    );
    setSlides(updatedSlides);
  };
  //logic for submiting the form
  const handleSubmit = () => {
    if (validate()) {
      const quizData = slides.map((slide) => ({
        question: slide.question,
        answerType: slide.answerType,
        options: slide.options.map((option) => ({
          text: option.text,
          image: option.image,
          isCorrectAnswer: option.isCorrectAnswer,
        })),
        timer: selectedTimer,
      }));
      onSubmit(quizData);
    } else {
      errors.forEach((error) => alert(error));
    }
  }; 

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.slides}>
          <div className={styles.slide}>
            {slides.map((slide, index) => (
              <div
                key={slide.slideNumber}
                className={styles.slideButtonContainer}
              >
                <button
                  key={slide.slideNumber}
                  className={`${styles.slideButton} ${
                    slide.slideNumber === currentSlide ? styles.active : ""
                  }`}
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
            value={slides[currentSlide - 1]?.question || ""}
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
                checked={userInteracted && answerType === "text"}
                onChange={() => handleAnswerTypeChange("text")}
                disabled={slides.length > 1}
                className={styles.radioinput}
              />
              Text
            </label>
            <label>
              <input
                type="radio"
                name="optionType"
                value="imageUrl"
                checked={userInteracted && answerType === "imageUrl"}
                onChange={() => handleAnswerTypeChange("imageUrl")}
                disabled={slides.length > 1}
                className={styles.radioinput}
              />
              Image URL
            </label>
            <label>
              <input
                type="radio"
                name="optionType"
                value="textImageUrl"
                checked={userInteracted && answerType === "textImageUrl"}
                onChange={() => handleAnswerTypeChange("textImageUrl")}
                disabled={slides.length > 1}
                className={styles.radioinput}
              />
              Text & Image URL
            </label>
          </div>
        </div>
        <div className={styles.answerOption}>
          <div>
            {slides[currentSlide - 1].options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`${styles.answers} ${
                  option.isCorrectAnswer ? styles.correctAnswer : ""
                }`}
              >
                <label className={styles.radioLabel}>
                  {quizType !== "Poll" && (
                    <input
                      type="radio"
                      name={`correctOption-${currentSlide}`}
                      checked={option.isCorrectAnswer}
                      onChange={() =>
                        handleCorrectAnswerChange(currentSlide - 1, optionIndex)
                      }
                      className={styles.answerButton}
                    />
                  )}
                  <div className={styles.inputContainer}>
                    {(answerType === "text" ||
                      answerType === "textImageUrl") && (
                      <input
                        type="text"
                        placeholder="Text"
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(
                            e,
                            currentSlide - 1,
                            optionIndex,
                            "text"
                          )
                        }
                        className={`${styles.answerText} ${
                          option.isCorrectAnswer
                            ? styles.optionInputSelected
                            : ""
                        }`}
                      />
                    )}
                    {(answerType === "imageUrl" ||
                      answerType === "textImageUrl") && (
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={option.image}
                        onChange={(e) =>
                          handleOptionChange(
                            e,
                            currentSlide - 1,
                            optionIndex,
                            "image"
                          )
                        }
                        className={`${styles.answerText} ${
                          option.isCorrectAnswer
                            ? styles.optionInputSelected
                            : ""
                        }`}
                      />
                    )}
                    {slides[currentSlide - 1].options.length > 2 &&
                      optionIndex > 1 && (
                        <img
                          className={styles.deletebtn}
                          src={del}
                          alt="delete"
                          onClick={() =>
                            handleRemoveOption(currentSlide - 1, optionIndex)
                          }
                        />
                      )}
                  </div>
                </label>
              </div>
            ))}
            {slides[currentSlide - 1].options.length < 4 && (
              <button
                type="button"
                onClick={() => handleAddOption(currentSlide - 1)}
                className={styles.addOptionButton}
              >
                Add Option
              </button>
            )}
          </div>
          {quizType !== "Poll" && (
            <div className={styles.timerOptions}>
              <div className={styles.timerTitle}>Timer</div>
              <div
                className={`${styles.timer} ${
                  selectedTimer === "off" ? styles.selectedTimer : ""
                }`}
                onClick={() => setSelectedTimer("off")}
              >
                OFF
              </div>
              <div
                className={`${styles.timer} ${
                  selectedTimer === "5sec" ? styles.selectedTimer : ""
                }`}
                onClick={() => setSelectedTimer("5sec")}
              >
                5 sec
              </div>
              <div
                className={`${styles.timer} ${
                  selectedTimer === "10sec" ? styles.selectedTimer : ""
                }`}
                onClick={() => setSelectedTimer("10sec")}
              >
                10 sec
              </div>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.createButton}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

