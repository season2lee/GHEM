import { css } from "@emotion/react";
import React from "react";
import FriendList from "./friend/FriendList";

function FriendRecommend() {
  return (
    <div>
      <p css={friendText}>CAN BE YOUR FRIEND</p>
      <FriendList />
    </div>
  );
}

const friendText = css`
  font-size: 60px;
  margin: 3rem;
  color: #fff;
  text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 7px #f6b4ff,
    0 0 10px #f1c1ff, 0 0 15px #ffd8f8, 0 0 18px #eb68ff, 0 0 23px #ffa9cb;
  /* color: #352c42;
  text-shadow: -1px 0px #f6b4ff, 0 0 2px #fff, 0 0 8px #ffd8f8, 0 0 4px #fff,
    0px 1px #f1c1ff, 1px 0px #ffd8f8, 0px -1px #ffa9cb; */
`;

export default FriendRecommend;
