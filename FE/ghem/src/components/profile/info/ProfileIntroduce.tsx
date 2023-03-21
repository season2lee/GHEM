import React from "react";
import { css } from "@emotion/react";
import { mobile } from "@/Mixin";

function ProfileIntroduce() {
  return <textarea css={introduce} readOnly value={"자기소개"}></textarea>;
}

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

  ${mobile} {
    font-size: 14px;
  }
`;

export default ProfileIntroduce;
