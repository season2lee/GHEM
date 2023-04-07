import React from "react";
import { css } from "@emotion/react";
import { mobile } from "@/util/Mixin";

type ProfileIntroduceProps = {
  introduce: string;
};

function ProfileIntroduce({ introduce }: ProfileIntroduceProps) {
  return <textarea css={introduceTextarea} readOnly value={introduce}></textarea>;
}

const introduceTextarea = css`
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
