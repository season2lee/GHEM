import { useEffect } from "react";
import { css } from "@emotion/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "@components/profile/Profile";
import GameList from "@components/profile/gamelist/GameList";
import ComputerSpec from "@components/profile/computerSpec/ComputerSpec";
import { mobile } from "@/util/Mixin";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/mainState";
import { getUserProfile } from "@/api/user";

function ProfilePage() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
    } else {
      console.log(userInfo);
      console.log(userInfo.nickname);
      if (userInfo.nickname === "") {
        alert("닉네임을 설정해주세요. 😀");
        location.href = "/update/profile";
      }
    }
  }, []);

  return (
    <div css={wrapper}>
      <div css={profileWrapper}>
        <h2>{userInfo.nickname} 님의 프로필</h2>
        <div>
          <Profile />
          <Routes>
            <Route path="/:userid/gamelist" element={<GameList />} />
            <Route path="/computerspec" element={<ComputerSpec />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const wrapper = css`
  padding: 50px 136px;

  ${mobile} {
    padding: 30px 15px;
  }
`;

const profileWrapper = css`
  width: 100%;

  > h2 {
    margin-bottom: 30px;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 60px;
  }

  ${mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      flex-direction: column;
      align-items: center;
    }

    > h2 {
      font-size: 24px;
    }
  }
`;

export default ProfilePage;
