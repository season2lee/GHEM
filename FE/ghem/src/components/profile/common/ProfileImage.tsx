import React from "react";
import { css } from "@emotion/react";
import { mobile } from "@/util/Mixin";

type ProfileImageProps = {
  size: number;
  src: string;
};

function ProfileImage({ size, src }: ProfileImageProps) {
  return (
    <div css={profileImageWrapper(size)}>
      <img src={src} alt="유저 프로필 이미지" />
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

    ${mobile} {
      width: 100px;
      height: 100px;
    }
  }
`;

export default ProfileImage;
