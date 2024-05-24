import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import QuestionWisePage from "./pages/QuestionWisePage/QuestionWisePage";
import ProtectRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
         <Route path="/home/*" element={<ProtectRoutes Component={HomePage} />}/>
        <Route
          path="/question-wise"
          element={<ProtectRoutes Component={QuestionWisePage} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
