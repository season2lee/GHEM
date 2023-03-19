import React from "react";
import { css } from "@emotion/react";
import FollowListItem from "./FollowListItem";

type FollowListProps = {
  type: string;
};

function FollowList({ type }: FollowListProps) {
  return (
    <div css={wrapper}>
      <span>총 3명</span>
      <div>
        <FollowListItem />
        <FollowListItem />
        <FollowListItem />
        <FollowListItem />
        <FollowListItem />
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
