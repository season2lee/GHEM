import React from "react";
import { css } from "@emotion/react";
import baseProfile from "../../../assets/image/baseProfile.png";
import { useNavigate } from "react-router-dom";

type FollowListItemProps = {
  key: number;
  followUser: string;
  followType: string;
};

function FollowListItem({ key, followUser, followType }: FollowListItemProps) {
  const navigate = useNavigate();

  const moveToOtherProfile = (): void => {
    navigate("/profile/1/gamelist"); // 임시 유저 아이디
    // 모달 닫기
  };

  const handleUnfollowUser = (): void => {
    // 다른 유저 팔로우
    alert("다른 유저 팔로우");
  };

  return (
    <div css={wrapper}>
      <div css={userInfoWrapper} onClick={moveToOtherProfile}>
        <img src={baseProfile} alt="유저 프로필 이미지" />
        <span>티코</span>
        <small>@steamid</small>
      </div>
      {followType === "팔로잉" ? (
        <button css={unfollowButton} onClick={handleUnfollowUser}>
          언팔로우
        </button>
      ) : (
        <button css={deleteButton} onClick={handleUnfollowUser}>
          삭제
        </button>
      )}
    </div>
  );
}

const wrapper = css`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  :hover {
    background: #f3f3f3;
  }

  > button {
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 20px;
    color: white;
    padding: 5px 12px;
  }
`;

const unfollowButton = css`
  background: #756292;

  :hover {
    transition: all 0.5s;
    background: #695883;
  }
`;

const deleteButton = css`
  background: #f90808;

  :hover {
    transition: all 0.5s;
    background: #d50707;
  }
`;

const userInfoWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #7d7d7d;
  cursor: pointer;

  > img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  > span {
    font-size: 16px;
    margin: 0 5px;
  }

  > small {
    font-size: 14px;
  }
`;

export default FollowListItem;
