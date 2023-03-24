import { useEffect } from "react";
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
import { userInfoState } from "./store/mainState";
import { useSetRecoilState } from "recoil";
import { getUserProfile } from "@/api/user";

function App() {
  const setUserInfo = useSetRecoilState(userInfoState);

  const getUserProfileFunc = async (id: string) => {
    const userId = Number(id);
    const response = await getUserProfile(userId);

    // recoil에 유저의 정보 담기
    if (response) {
      const { user } = response;

      setUserInfo((prev) => {
        return {
          ...prev,
          user_id: user.user_id,
          nickname: user.nickname,
          steamId: user.steamId,
          introduce: user.introduce,
          userProfile: user.userProfile,
        };
      });
    }
  };

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem("accessToken");
    const id: string | null = localStorage.getItem("id");

    // 로그인된 유저가 있다면
    if (accessToken && id) {
      getUserProfileFunc(id);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <StarBackground />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail/:appid" element={<GameDetailPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/*" element={<WelcomePage />} />
        <Route path="/update/profile" element={<ProfileUpdatePage />} />
        <Route path="/oauth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/oauth/naver/callback" element={<NaverLogin />} />z
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
