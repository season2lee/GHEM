import { css } from "@emotion/react";
import React from "react";
import FriendListItem from "./FriendListItem";

function FriendList() {
  return (
    <div css={flexDiv}>
      <FriendListItem />
      <FriendListItem />
      <FriendListItem />
      <FriendListItem />
      <FriendListItem />
      <FriendListItem />
    </div>
  );
}

const flexDiv = css`
  display: flex;
  /* justify-content: center; */
  overflow: scroll;
  margin: 3rem;
  /* 가로 스크롤 + 숨기기 */
  /* overflow: hidden;
  white-space: nowrap; */
  /* scroll bar 제거 ( chrome 환경)*/
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

export default FriendList;
