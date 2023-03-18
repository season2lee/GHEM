import React from "react";
import { css } from "@emotion/react";

type ProfileInputProps = {
  header: string;
  value?: string;
};

function ProfileInput({ header, value }: ProfileInputProps) {
  return (
    <div css={wrapper}>
      <h5>{header}</h5>
      <input type="text" />
    </div>
  );
}

const wrapper = css`
  margin-top: 50px;
  width: 100%;

  > input {
    width: 100%;
    height: 35px;
    background: none;
    border: none;
    border-bottom: 1px solid #ffffff;
    outline: none;
    color: white;
    font-size: 16px;
    padding: 0 5px;
  }
`;

export default ProfileInput;
