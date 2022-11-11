import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import ConfigPage from "./pages/ConfigPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/config" element={<ConfigPage />} />
      </Routes>
    </Router>
  );
}

export default App;
