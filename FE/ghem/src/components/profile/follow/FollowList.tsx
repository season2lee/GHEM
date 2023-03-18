import React from "react";
import { css } from "@emotion/react";
import FollowListItem from "./FollowListItem";

type FollowListProps = {
  path: string;
};

function FollowList({ path }: FollowListProps) {
  return (
    <div css={wrapper}>
      <span>총 3명</span>
      <div>
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
    overflow-y: scroll;
  }
`;

export default FollowList;
