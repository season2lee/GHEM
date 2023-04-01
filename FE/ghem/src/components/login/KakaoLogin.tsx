import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRequestKakaoLogin } from "@/api/oauth";
import Loading from "@components/common/Loading";

type responseType = {
  AccessToken: string;
  userId: number;
  userNickname: string | null;
};

function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const authorizationCode: string = location.search.split("=")[1];

  const handleKakaoLogin = async (code: string) => {
    const response: responseType = await getRequestKakaoLogin(code);

    if (response) {
      console.log(response)
      localStorage.setItem("accessToken", response.AccessToken);
      localStorage.setItem("id", JSON.stringify(response.userId));

      if (response.userNickname === null) {
        navigate("/update/profile"); // 닉네임 설정X -> 마이프로필 이동
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    handleKakaoLogin(authorizationCode);
  }, []);

  return <Loading />;
}

export default KakaoLogin;
