import React from "react";
import { css } from "@emotion/react";
import baseProfile from "../../../assets/image/baseProfile.png";
import { useNavigate } from "react-router-dom";

function FollowListItem() {
  const navigate = useNavigate();

  const moveToOtherProfile = (): void => {
    navigate("/profile/1/gamelist"); // 임시 유저 아이디
    // 모달 닫기
  };

  const handleFollowUser = (): void => {
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
      <button onClick={handleFollowUser}>팔로우</button>
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
    background: #756292;
    border-radius: 20px;
    color: white;
    padding: 5px 12px;

    :hover {
      transition: all 0.5s;
      background: #695883;
    }
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
