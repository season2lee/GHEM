import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import steamLogo from "../../../assets/image/steamLogo.png";
import { mobile } from "@/util/Mixin";
import ProfileSteamIdModal from "./ProfileSteamIdModal";
import { useLocation } from "react-router-dom";

type ProfileAccountProps = {
  nickname: string;
  steamId: string;
};

function ProfileAccount({ nickname, steamId }: ProfileAccountProps) {
  const location = useLocation();
  const pathnameId = Number(location.pathname.split("/")[2]);
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isMyProfile, setIsMyProfile] = useState<boolean>(true);
  const [followType, setFollowType] = useState<string>("팔로우");

  const handleOpenSteamIdModal = (): void => {
    setIsOpenModal(!isOpenModal);
  };

  const handleFollowUser = async (): Promise<void> => {
    if (followType === "팔로우") {
      // 언팔로우 요청
    } else if (followType === "언팔로우") {
      // 팔로우 요청
    }
  };

  const getFollowTypeFunc = async (): Promise<void> => {
    // userId가 pathnameId를 팔로우하는지 언팔로우하는지 api 요청으로 알아내기
    // const response = await getFollowType(userId, pathnameId);
    // setFollowType("팔로우");
    // setFollowType("언팔로우");
  };

  useEffect(() => {
    if (pathnameId === userId) {
      setIsMyProfile(true);
    } else {
      if (location.pathname !== "/profile/computerspec") {
        setIsMyProfile(false);
        getFollowTypeFunc();
      }
    }
  }, [location]);

  return (
    <div css={wrapper}>
      <div css={nicknameWrapper}>
        <p css={nicknameP}>{nickname}</p>
        {!isMyProfile && <button onClick={handleFollowUser}>{followType}</button>}
      </div>
      <div css={steamIdWrapper} onClick={handleOpenSteamIdModal}>
        <img src={steamLogo} alt="스팀 로고" />
        <span>{steamId}</span>
      </div>
      {isOpenModal && <ProfileSteamIdModal handleOpenSteamIdModal={handleOpenSteamIdModal} />}
    </div>
  );
}

const wrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile} {
    align-items: flex-start;
  }
`;

const nicknameWrapper = css`
  margin: 20px 0 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  > button {
    margin-left: 15px;
    border: none;
    outline: none;
    cursor: pointer;
    background: #756292;
    border-radius: 20px;
    color: white;
    padding: 5px 10px;
    font-size: 13px;

    :hover {
      transition: all 0.5s;
      background: #695883;
    }
  }

  ${mobile} {
    margin: 0 0 10px 0;
  }
`;

const nicknameP = css`
  font-weight: bold;

  ${mobile} {
    font-size: 18px;
  }
`;

const steamIdWrapper = css`
  width: 70%;
  height: 39px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;

  :hover {
    transition: all 0.3s;
    background: #cfcfcf;
  }

  > img {
    position: absolute;
    left: 20px;
    width: 30px;
    height: 30px;
  }

  > span {
    color: #7d7d7d;
    font-size: 16px;
  }

  ${mobile} {
    margin-bottom: 0;
    height: 35px;

    > img {
      left: 10px;
      width: 23px;
      height: 23px;
    }

    > span {
      color: #7d7d7d;
      font-size: 13px;
    }
  }
`;

export default ProfileAccount;
