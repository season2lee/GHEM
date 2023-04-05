import { useEffect } from "react";
import Loading from "@components/common/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { getRequestSteamLogin } from "@/api/oauth";

type responseType = {
  AccessToken: string;
  userId: number;
  userNickname: string | null;
};

function SteamLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const authorizationCode: string = location.search.split("=")[1];

  const handleKakaoLogin = async (code: string) => {
    const response: responseType = await getRequestSteamLogin(code);

    if (response) {
      console.log(response);
      localStorage.setItem("accessToken", response.AccessToken);
      localStorage.setItem("id", JSON.stringify(response.userId));

      if (response.userNickname === null) {
        navigate("/update/profile"); // 닉네임 설정X -> 마이프로필 이동
      } else {
        navigate("/main");
      }
    }
  };

  useEffect(() => {
    console.log("@@@@", location.pathname);
    // handleKakaoLogin(authorizationCode);
  }, []);

  return <Loading />;
}

export default SteamLogin;
