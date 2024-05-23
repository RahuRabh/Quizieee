import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import QuestionWisePage from "./pages/QuestionWisePage/QuestionWisePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/question-wise" element={<QuestionWisePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
