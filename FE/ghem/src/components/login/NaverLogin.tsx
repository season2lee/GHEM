import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRequestNaverLogin } from "@/api/oauth";
import Loading from "@components/common/Loading";

function NaverLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const authorizationCode: string = location.search.split("=")[1];

  const handleNaverLogin = async (code: string) => {
    const response = await getRequestNaverLogin(code);

    if (response) {
      localStorage.setItem("accessToken", response.AccessToken);
      localStorage.setItem("id", JSON.stringify(response.userId));

      // 닉네임을 설정하지 않은 유저라면 마이프로필 페이지로 이동 (최초 로그인)
      if (response.userNickname === null) {
        navigate("/update/profile");
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    handleNaverLogin(authorizationCode);
  }, []);

  return <Loading />;
}

export default NaverLogin;
