import { css } from "@emotion/react";
import React, { useEffect } from "react";
import CommonGameListItem from "./CommonGameListItem";

type GameList = {
  appid: number;
};

type CommonGameListProps = {
  gameType?: "discount";
  gameList?: GameList[];
  imgType: "header" | "capsule";
};

function CommonGameList(props: CommonGameListProps) {
  return (
    <div css={rowScroll} id="gameList">
      {props.gameList?.map((item) => {
        return (
          <CommonGameListItem
            gameType={props.gameType}
            appid={item.appid}
            imgType={props.imgType}
            key={item.appid}
          />
        );
      })}
    </div>
  );
}

const rowScroll = css`
  display: flex;
  padding: 20px;
  overflow: scroll;
  border: 1px solid #000;
  /* 가로 스크롤 */
  overflow: auto;
  white-space: nowrap;
`;

export default CommonGameList;
