import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRequestKakaoLogin } from "@/api/oauth";

function KakaoLogin() {
  const location = useLocation();
  const authorizationCode: string = location.search.split("=")[1];

  const handleKakaoLogin = async (code: string) => {
    const response = await getRequestKakaoLogin(code);
    console.log("response : ", response);
    // 로그인 되면 유저가 닉네임이 있는지 확인하고 없으면 마이페이지로 강제이동
    // 닉네임 있으면 메인페이지로 이동
  };

  useEffect(() => {
    handleKakaoLogin(authorizationCode);
  }, []);

  return <div>KakaoLogin</div>;
}

export default KakaoLogin;
