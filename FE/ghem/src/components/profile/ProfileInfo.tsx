import { useState } from "react";
import { css } from "@emotion/react";
import steamLogo from "../../assets/image/steamLogo.png";
import ProfileImage from "./common/ProfileImage";
import FollowModal from "./follow/FollowModal";

function ProfileInfo() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [followType, setFollowType] = useState<string>("");

  const handleOpenFollowModal = (type?: string): void => {
    if (type) {
      setFollowType(type);
    }
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div css={profileInfoWrapper}>
      <ProfileImage size={130} path="info" />
      <p css={nickname}>닉네임</p>
      <p css={email}>email@email.com</p>
      <div css={steamIdWrapper}>
        <img src={steamLogo} />
        <span>미등록</span>
      </div>
      <div css={followWrapper}>
        <span onClick={() => handleOpenFollowModal("팔로잉")}>팔로잉 2</span>
        <div></div>
        <span onClick={() => handleOpenFollowModal("팔로워")}>팔로워 1</span>
      </div>
      <textarea css={introduce} readOnly value={"자기소개"}></textarea>
      {isOpenModal && <FollowModal handleOpenFollowModal={handleOpenFollowModal} type={followType} />}
    </div>
  );
}

const profileInfoWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const nickname = css`
  font-weight: bold;
  margin: 20px 0 5px 0;
`;

const email = css`
  margin-bottom: 20px;
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
`;

const followWrapper = css`
  width: 100%;
  border-top: 1px solid #716969;
  border-bottom: 1px solid #716969;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 25px;

  > span {
    font-size: 16px;
    cursor: pointer;

    :hover {
      transition: all 0.5s;
      color: #c9c9c9;
    }
  }

  > div {
    height: 30px;
    border: 1px solid #716969;
  }
`;

const introduce = css`
  width: 90%;
  height: 70px;
  resize: none;
  border: none;
  outline: none;
  background-color: #352c42;
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 30px;
`;

export default ProfileInfo;
