import React from "react";
import { css } from "@emotion/react";
import baseProfile from "../../../assets/image/baseProfile.png";

type ProfileImageProps = {
  size: number;
  path: string;
};

function ProfileImage({ size, path }: ProfileImageProps) {
  return (
    <div css={profileImageWrapper(size)}>
      <img src={baseProfile} alt="유저 프로필 이미지" />
      {path === "update" && (
        <div css={fileInputWrapper}>
          <label htmlFor="file">수정</label>
          <input type="file" id="file" />
        </div>
      )}
    </div>
  );
}

const profileImageWrapper = (size: number) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > img {
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;

    @media (max-width: 768px) {
      width: 120px;
      height: 120px;
    }
  }
`;

const fileInputWrapper = css`
  position: absolute;
  bottom: 15px;
  left: 62px;
  color: #352c42;

  > label {
    cursor: pointer;

    :hover {
      color: #756292;
    }
  }

  @media (max-width: 768px) {
    bottom: 15px;
    left: 48px;

    > label {
      font-size: 15px;
    }
  }

  > input {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

export default ProfileImage;
