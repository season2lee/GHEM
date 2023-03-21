import React from "react";
import { css } from "@emotion/react";
import ProfileImage from "../common/ProfileImage";
import ProfileNickname from "./ProfileNickname";
import ProfileInput from "./ProfileInput";
import ProfileGender from "./ProfileGender";
import ProfileIntroduce from "./ProfileIntroduce";
import { useNavigate } from "react-router-dom";
import { mobile } from "@/Mixin";

function ProfileUpdate() {
  const navigate = useNavigate();

  const handleCancelUpdateProfile = (): void => {
    navigate("/profile/gamelist");
  };

  return (
    <div css={wrapper}>
      <div css={profileUpdateWrapper}>
        <h3>프로필 수정</h3>
        <ProfileImage size={150} path="update" />
        <ProfileNickname />
        <ProfileInput header="Steam ID" />
        <div css={rowFlexWrapper}>
          <ProfileGender />
          <ProfileInput header="생년월일" />
        </div>
        <ProfileIntroduce />
        <div css={buttonWrapper}>
          <button>수정</button>
          <button onClick={handleCancelUpdateProfile}>취소</button>
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

const profileUpdateWrapper = css`
  margin: 0 auto;
  width: 630px;
  background: #352c42;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 100px;

  > h3 {
    margin-bottom: 30px;
  }

  ${mobile} {
    width: 450px;
    padding: 50px 60px;
  }
`;

const rowFlexWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${mobile} {
    align-items: flex-start;
  }
`;

const buttonWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;

  > button {
    cursor: pointer;
    padding: 15px 70px;
    font-size: 16px;
    border: none;
    color: white;
    border-radius: 5px;
  }

  ${mobile} {
    gap: 30px;

    > button {
      padding: 12px 40px;
    }
  }

  > button:nth-of-type(1) {
    background: #756292;

    :hover {
      transition: all 1s;
      background: #a692c4;
    }
  }

  > button:nth-of-type(2) {
    background: #d4cedd;

    :hover {
      transition: all 1s;
      background: #9e9da0;
    }
  }
`;

export default ProfileUpdate;
