import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRequestNaverLogin } from "@/api/oauth";

function NaverLogin() {
  const location = useLocation();
  const authorizationCode: string = location.search.split("=")[1];

  const handleNaverLogin = async (code: string) => {
    const response = await getRequestNaverLogin(code);
    console.log("response : ", response);
    // 로그인 되면 유저가 닉네임이 있는지 확인하고 없으면 마이페이지로 강제이동
    // 닉네임 있으면 메인페이지로 이동
  };

  useEffect(() => {
    handleNaverLogin(authorizationCode);
  }, []);

  return <div>NaverLogin</div>;
}

export default NaverLogin;
