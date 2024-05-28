import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import QuestionAnalysisPage from './pages/QuestionAnalysisPage/QuestionAnalysisPage'
import ProtectRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import QuizPage from "./pages/QuizPage/QuizPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/home/*"
          element={<ProtectRoutes Component={HomePage} />}
        />
        <Route
          path="/question-analysis"
          element={<ProtectRoutes Component={QuestionAnalysisPage} />}
        />
        <Route path="/quiz/playQuiz/:id" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
