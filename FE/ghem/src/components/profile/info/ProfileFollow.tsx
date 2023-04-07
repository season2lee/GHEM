import { useState } from "react";
import { css } from "@emotion/react";
import FollowModal from "./../follow/FollowModal";

function ProfileFollow() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [followType, setFollowType] = useState<string>("");

  const handleOpenFollowModal = (type?: string): void => {
    if (type) {
      setFollowType(type);
    }
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div css={followWrapper}>
      <span onClick={() => handleOpenFollowModal("팔로잉")}>팔로잉</span>
      <div></div>
      <span onClick={() => handleOpenFollowModal("팔로워")}>팔로워</span>
      {isOpenModal && <FollowModal handleOpenFollowModal={handleOpenFollowModal} type={followType} />}
    </div>
  );
}

const followWrapper = css`
  width: 100%;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
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

  > div:nth-of-type(1) {
    height: 30px;
    border: 1px solid #ffffff;
  }
`;

export default ProfileFollow;
