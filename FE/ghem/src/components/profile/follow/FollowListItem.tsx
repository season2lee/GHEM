import React from "react";
import { css } from "@emotion/react";

function FollowListItem() {
  return (
    <div css={wrapper}>
      <div css={userInfoWrapper}>
        <img />
        <span>티코</span>
        <small>@steamid</small>
      </div>
      <button>팔로우</button>
    </div>
  );
}

const wrapper = css`
  width: 100%;
  padding: 10px;
  margin: 15px 0;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  > button {
    cursor: pointer;
    border: none;
    outline: none;
    background: #756292;
    border-radius: 20px;
    color: white;
    padding: 5px 10px;
  }
`;

const userInfoWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #7d7d7d;

  > span {
    font-size: 16px;
    margin: 0 5px;
  }
`;

export default FollowListItem;
