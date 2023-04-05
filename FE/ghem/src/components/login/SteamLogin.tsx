import Loading from "@components/common/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SteamLogin() {
  const navigate = useNavigate();

  const handleSteamLogin = async (code: string) => {
    console.log(code);
    // const response = await getRequestSteamLogin(code);

    // if (response) {
    //   console.log(response);
    //   localStorage.setItem("accessToken", response.AccessToken);
    //   localStorage.setItem("id", JSON.stringify(response.userId));

    //   if (response.userNickname === null) {
    //     navigate("/update/profile"); // 닉네임 설정X -> 마이프로필 이동
    //   } else {
    //     navigate("/main");
    //   }
    // }
  };

  useEffect(() => {
    const url = window.location.href;
    const regex = /openid%2Fid%2F(\d{17})/;
    const match = url.match(regex);

    if (match && match[1]) {
      handleSteamLogin(match[1]);
    } else {
      navigate("/");
    }
  }, []);

  return <Loading />;
}

export default SteamLogin;
