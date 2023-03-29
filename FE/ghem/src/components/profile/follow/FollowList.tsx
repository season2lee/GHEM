import React from "react";
import { css } from "@emotion/react";
import FollowListItem from "./FollowListItem";

type FollowListProps = {
  type: string;
  followList: string[];
};

function FollowList({ type, followList }: FollowListProps) {
  return (
    <div css={wrapper}>
      <span>총 {followList.length}명</span>
      <div>
        {followList.map((followUser, idx) => (
          <FollowListItem key={idx} followUser={followUser} />
        ))}
      </div>
    </div>
  );
}

const wrapper = css`
  > span {
    color: #7d7d7d;
    font-size: 16px;
  }

  > div {
    margin-top: 20px;
    max-height: 320px;
    overflow-y: scroll;
  }
`;

export default FollowList;
