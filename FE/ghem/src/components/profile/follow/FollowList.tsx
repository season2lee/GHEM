import React from "react";
import { css } from "@emotion/react";
import FollowListItem from "./FollowListItem";
import { followListType } from "apiTypes";

type FollowListProps = {
  type: string;
  followList: followListType[];
};

function FollowList({ type, followList }: FollowListProps) {
  return (
    <div css={wrapper}>
      <span>총 {followList.length}명</span>
      <div>
        {followList.length > 0 ? (
          followList.map((followUser, idx) => <FollowListItem key={idx} followUser={followUser} followType={type} />)
        ) : (
          <div css={followNoneWrapper}>
            <span>관심 친구가 없습니다.</span>
          </div>
        )}
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
    height: 300px;
    height: 300px;
    overflow-y: scroll;
  }
`;

const followNoneWrapper = css`
  display: flex;
  justify-content: center;

  > span {
    color: #7d7d7d;
    font-size: 15px;
  }
`;

export default FollowList;
