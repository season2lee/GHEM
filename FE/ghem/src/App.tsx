import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameDetailPage from "./pages/GameDetailPage";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MainPage from "./pages/MainPage";
import WelcomePage from "./pages/WelcomePage";
import StarBackground from "./components/common/StarBackground";
import ProfileUpdate from "@components/profile/update/ProfileUpdate";
import KakaoLogin from "@components/login/KakaoLogin";
import NaverLogin from "@components/login/NaverLogin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <StarBackground />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail/:appid" element={<GameDetailPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/update/profile" element={<ProfileUpdate />} />
        <Route path="/oauth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/oauth/naver/callback" element={<NaverLogin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
