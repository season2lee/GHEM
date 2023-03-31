import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameDetailPage from "./pages/GameDetailPage";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MainPage from "./pages/MainPage";
import WelcomePage from "./pages/WelcomePage";
import StarBackground from "./components/common/StarBackground";
import ProfileUpdatePage from "@/pages/ProfileUpdatePage";
import KakaoLogin from "@components/login/KakaoLogin";
import NaverLogin from "@components/login/NaverLogin";
import ScrollToTop from "./util/ScrollToTop";
import GameBanPage from "./pages/GameBanPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <StarBackground />
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail/:appid" element={<GameDetailPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/*" element={<WelcomePage />} />
        <Route path="/gameban" element={<GameBanPage />} />
        <Route path="/update/profile" element={<ProfileUpdatePage />} />
        <Route path="/oauth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/oauth/naver/callback" element={<NaverLogin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
