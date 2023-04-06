import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import GameDetailPage from "./pages/GameDetailPage";
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
import {
  loginRandomGameList,
  banGameList,
  disLikeGameList,
  userDevice,
} from "@/store/mainState";
import { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import Footer from "@components/common/Footer";
import SteamLogin from "@components/login/SteamLogin";

function App() {
  const userId: number | null = Number(localStorage.getItem("id"));
  const [loginRandomGame, setLoginRandomGame] =
    useRecoilState<{ appid: number }[]>(loginRandomGameList);
  const [allBanGame, setAllBanGame] = useRecoilState<number[]>(banGameList);
  const [userDisLikeGame, setUserDisLikeGame] =
    useRecoilState<number[]>(disLikeGameList);
  const [userDeviceSet, setUserDeviceSet] = useRecoilState<boolean | number>(
    userDevice
  );

  const [randomAppList, setRandomAppList] = useState<number[]>();
  const [randomAppid, setRandomAppid] = useState<number>();
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [checkLogin, setCheckLogin] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const navigate = useNavigate();

  // 위험 요소 게임은 로그인 여부 관계 없이 필요
  useEffect(() => {
    getAllBanGame();
    // 디바이스 종류 확인
    const isTouchDevice: boolean | number =
      navigator.maxTouchPoints || "ontouchstart" in document.documentElement;
    setUserDeviceSet(isTouchDevice);
  }, []);

  // App => Main페이지로 가며 로그인 상태 확인
  useEffect(() => {
    // console.log(userId, "============");
    if (userId) {
      setIsLoginStatus(true);
      // console.log("why,,,");
    }
  }, [checkLogin]);

  // 유저 아이디 있고, 로그인 했으면 bannerTwo를 위한 작업 시작
  useEffect(() => {
    // console.log("ㅠㅠ...");
    if (userId && isLoginStatus) {
      getUserDisLikeGame();
      bannerTwoListApi();
      // console.log("여기는?", userId);
    }
  }, [isLoginStatus]);

  // 내가 평가한 게임 목록 가져와서... 랜덤 1개 뽑기
  useEffect(() => {
    if (randomAppList) {
      getRandomAppId();
    }
  }, [randomAppList]);

  //랜덤 뽑은 게임으로 랜덤한 한 게임의 유사 게임 10개 가져오기
  useEffect(() => {
    if (randomAppid) {
      randomAppidGameList();
      console.log(randomAppid)
    }
  }, [randomAppid]);

  // 내가 평가한 게임 리스트에서 랜덤 1개를 뽑기 위한  함수
  const getRandomAppId = () => {
    if (randomAppList) {
      const newAppid =
        randomAppList[Math.floor(Math.random() * randomAppList.length)];
      setRandomAppid(newAppid);
    }
  };

  // 새로고침 전까지 바뀌지 않을 현재 로그인 유저를 위한
  // 유저가 평가한 게임 리스트 (이후 그중 랜덤 1개와 유사한 게임 10개 리스트 만들 것)
  const bannerTwoListApi = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32000/user/rating/v2/${userId}`
        // `http://192.168.100.124:8080/rating/v2/${userId}`
      );
      const ids = response.data.data;
      // console.log("여기까진 된 건지", response);
      if (ids.length > 0) {
        setRandomAppList(ids);
      } else {
        // 내가 평가한 게임이 0개면 카테고리로 게임 평가하러 보내기
        navigate("/category");
      }
      // setRandomAppid(ids[Math.floor(Math.random() * ids.length)]);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  // (이후 그중 랜덤 1개와 유사한 게임 10개 리스트 만들 것)
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
      // 유사 게임 없는 게임 데이터를 사용했을 시를 대비
      getRandomAppId();
      console.log("Error >>", err);
    }
  };

  // store에 특정 유저의 관심없어요 게임 저장
  const getUserDisLikeGame = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32003/dislike`,
        {
          params: { steam_id: userId },
        }
      );
      // console.log(response.data);
      const newDataList = response.data.map((disLike: { app_id: number }) => {
        return disLike.app_id;
      });
      // console.log(newDataList, "???");
      setUserDisLikeGame(newDataList);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  // store에 주의 게임 저장
  const getAllBanGame = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32003/disapproving`
      );
      // console.log(response.data);
      const newDataList = response.data.map((ban: { app_id: number }) => {
        return ban.app_id;
      });
      // console.log(newDataList);
      setAllBanGame(newDataList);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div>
      <Navbar />
      <StarBackground />
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detail/:appid" element={<GameDetailPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route
          path="/main"
          element={
            <MainPage setCheckLogin={setCheckLogin} randomAppid={randomAppid} />
          }
        />
        <Route path="/*" element={<WelcomePage />} />
        <Route path="/gameban" element={<GameBanPage />} />
        <Route path="/update/profile" element={<ProfileUpdatePage />} />
        <Route path="/oauth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/oauth/naver/callback" element={<NaverLogin />} />
        <Route path="/oauth/steam/callback" element={<SteamLogin />} />
      </Routes>
      <Footer />
    </div>
  );
}

const container = css`
  background-color: transparent;

  /* .pointer {
        position: absolute;
        border: 1px solid white;
        background: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        left: -15px;
        top: -15px;
        :hover{
          cursor: Crosshair;
        animation: hover 0.5s ease forwards ;
        }
        @keyframes hover {
          from {
            width: 30px;
            height: 30px;
            left: -15px;
            top: -15px;
          }
          to {
            width: 60px;
            height: 60px;
            left: -30px;
            top: -30px;
          }
        }
    } */
`;

export default App;
