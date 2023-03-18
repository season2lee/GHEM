import React from "react";
import { css } from "@emotion/react";

function ProfileIntroduce() {
  return (
    <div css={wrapper}>
      <div css={headerWrapper}>
        <h5>자기소개</h5>
        <span>( 10 / 150 )</span>
      </div>
      <textarea />
    </div>
  );
}

const wrapper = css`
  margin: 50px 0;
  width: 100%;

  > textarea {
    width: 100%;
    padding-bottom: 10px;
    background: none;
    resize: none;
    border: none;
    outline: none;
    border-bottom: 1px solid #ffffff;
    color: white;
    font-size: 16px;
  }
`;

const headerWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;

  > span {
    font-size: 16px;
  }
`;

export default ProfileIntroduce;
