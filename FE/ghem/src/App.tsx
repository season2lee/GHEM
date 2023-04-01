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
import { useRecoilState, useRecoilValue } from "recoil";
import { loginRandomGameList } from "@/store/mainState";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const userId: number | null = Number(localStorage.getItem("id"));
  const [loginRandomGame, setLoginRandomGame] =
    useRecoilState<{ appid: number }[]>(loginRandomGameList);
  const [randomAppid, setRandomAppid] = useState<number>();
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [checkLogin, setCheckLogin] = useState<boolean>(false);

  // 로그인 하고 새로고침 안 하면 안 되는 방식이라서 수정이 필요함
  useEffect(() => {
    console.log(userId, "============");
    if (userId) {
      setIsLoginStatus(true);
      console.log("why,,,");
    }
  }, [checkLogin]);

  useEffect(() => {
    if (randomAppid) {
      randomAppidGameList();
    }
  }, [randomAppid]);

  useEffect(() => {
    console.log("ㅠㅠ...");
    if (userId && isLoginStatus) {
      bannerTwoListApi();
      console.log("여기는?", userId);
    }
  }, [isLoginStatus]);

  // 새로고침 전까지 바뀌지 않을 현재 로그인 유저를 위한
  // 유저가 평가한 게임 중 랜덤 1개와 유사한 게임 10개 리스트
  const bannerTwoListApi = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32000/user/rating/v2/${userId}`
        // `http://192.168.100.124:8080/rating/v2/${userId}`
      );
      const ids = response.data.data;
      console.log("여기까진 된 건지");
      setRandomAppid(ids[Math.floor(Math.random() * ids.length)]);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const randomAppidGameList = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32003/games/v2`,
        {
          params: { apps: randomAppid, steam_id: userId },
        }
      );
      const newDataList = response.data.map((special: { app_id: number }) => {
        return {
          appid: special.app_id,
        };
      });
      setLoginRandomGame(newDataList);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

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
        <Route
          path="/*"
          element={<WelcomePage setCheckLogin={setCheckLogin} />}
        />
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
