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

      if (response.userNickname === null) {
        navigate("/update/profile"); // 닉네임 설정X -> 마이프로필 이동
      } else {
        navigate("/main");
      }
    }
  };

  useEffect(() => {
    handleNaverLogin(authorizationCode);
  }, []);

  return <Loading />;
}

export default NaverLogin;
