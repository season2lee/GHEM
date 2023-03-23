import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRequestKakaoLogin } from "@/api/oauth";
import { useSetRecoilState } from "recoil";
import { userInfoState, userInfoStateType } from "@/store/mainState";

type responseType = {
  AccessToken: string;
  userId: number;
  userNickname: string | null;
};

function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const authorizationCode: string = location.search.split("=")[1];
  const setUserInfo = useSetRecoilState(userInfoState);

  const handleKakaoLogin = async (code: string) => {
    const response: responseType = await getRequestKakaoLogin(code);
    console.log("response : ", response);

    if (response) {
      localStorage.setItem("accessToken", response.AccessToken);
      setUserInfo((prev) => {
        return {
          ...prev,
          user_id: response.userId,
          nickname: response.userNickname,
        };
      });

      // 닉네임을 설정하지 않은 유저라면 마이프로필 페이지로 이동 (최초 로그인)
      if (response.userNickname === null) {
        navigate("/update/profile");
      } else {
        navigate(`/profile/${response.userId}/gamelist`);
      }
    }
  };

  useEffect(() => {
    handleKakaoLogin(authorizationCode);
  }, []);

  return <div>KakaoLogin</div>;
}

export default KakaoLogin;
