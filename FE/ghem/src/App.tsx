import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

