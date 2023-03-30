import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ProfileImage from "../common/ProfileImage";
import ProfileAccount from "./ProfileAccount";
import ProfileFollow from "./ProfileFollow";
import ProfileIntroduce from "./ProfileIntroduce";
import { mobile } from "@/util/Mixin";
import baseProfile from "../../../assets/image/baseProfile.png";
import { getUserProfile } from "@/api/user";
import { useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "@/store/mainState";

function ProfileInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId: number | null = Number(localStorage.getItem("id"));
  const setUserInfo = useSetRecoilState(userInfoState);
  const [nickname, setNickname] = useState<string>("");
  const [steamId, setSteamId] = useState<string>("미등록");
  const [introduce, setIntroduce] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>(baseProfile);

  const getUserProfileFunc = async (id: number) => {
    const response = await getUserProfile(id);

    if (response) {
      const { user } = response;

      if (user.nickname) setNickname(user.nickname);
      if (user.steamId) setSteamId(user.steamId);
      if (user.introduce) setIntroduce(user.introduce);
      setProfileImage(user.userProfile.substr(1, user.userProfile.length - 2));

      // recoil에 유저의 정보 담기
      setUserInfo((prev) => {
        return {
          ...prev,
          user_id: user.user_id,
          nickname: user.nickname,
          steamId: user.steamId,
          introduce: user.introduce,
          userProfile: user.userProfile,
          birth: user.birth,
          gender: user.gender,
        };
      });
    }
  };

  useEffect(() => {
    // 로그인 유저라면
    if (userId) {
      // 다른 유저의 프로필 조회를 위해 URL에서 id 가져오기
      if (location.pathname === "/profile/computerspec") {
        getUserProfileFunc(userId);
      } else {
        const pathnameId = Number(location.pathname.split("/")[2]);
        getUserProfileFunc(pathnameId);
      }
    }
    // 비로그인 유저는 로그인 페이지로 이동
    else {
      navigate("/login");
    }
  }, [location]);

  return (
    <div css={profileInfoWrapper}>
      <div css={profileWrapper}>
        <div css={profileImageAccountWrapper}>
          <ProfileImage size={130} src={profileImage} />
          <ProfileAccount nickname={nickname} steamId={steamId} />
        </div>
        <ProfileFollow />
      </div>
      <ProfileIntroduce introduce={introduce} />
    </div>
  );
}

const profileInfoWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const profileWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const profileImageAccountWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${mobile} {
    gap: 15px;
    flex-direction: row;
    margin-bottom: 20px;
  }
`;

export default ProfileInfo;
