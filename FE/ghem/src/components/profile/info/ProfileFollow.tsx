import { useState } from "react";
import { css } from "@emotion/react";
import FollowModal from "./../follow/FollowModal";
import { mobile } from "@/Mixin";

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
      <span onClick={() => handleOpenFollowModal("팔로잉")}>팔로잉 2</span>
      <div></div>
      <span onClick={() => handleOpenFollowModal("팔로워")}>팔로워 1</span>
      {isOpenModal && <FollowModal handleOpenFollowModal={handleOpenFollowModal} type={followType} />}
    </div>
  );
}

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

  ${mobile} {
    width: 30%;
    flex-direction: column;
    border: none;
    gap: 20px;
    padding: 0;
    margin: 0;

    > span {
      padding: 10px 15px;
      background: #756292;
      border-radius: 10px;
    }

    > div {
      display: none;
    }
  }
`;

export default ProfileFollow;
