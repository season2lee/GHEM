import FixedButtom from "@components/main/FixedButtom";
import HoverGameItem from "@components/main/HoverGameItem";
import { css } from "@emotion/react";
import React, { useState } from "react";
import Banner from "../components/main/Banner";
import Discount from "../components/main/Discount";
import FriendRecommend from "../components/main/FriendRecommend";
import SteadySeller from "../components/main/SteadySeller";
import TopRankNewRelease from "../components/main/TopRankNewRelease";

export type PageXY = {
  x: number;
  y: number;
};

function MainPage() {
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const [appid, setAppid] = useState<number | null>(null);
  const [colId, setColId] = useState<string>("empty");
  const [pageXY, setPageXY] = useState<PageXY>({ x: 0, y: 0 });
  return (
    <div css={centerDiv}>
      <FixedButtom />
      <Banner />
      <Discount
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        setPageXY={setPageXY}
        currentColId={colId}
      />
      <TopRankNewRelease
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        setPageXY={setPageXY}
        currentColId={colId}
      />
      <hr />
      <FriendRecommend />
      <hr />
      <SteadySeller
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        setPageXY={setPageXY}
        currentColId={colId}
      />
      먼가 깐지나는 말
      {isEnter && (
        <HoverGameItem
          setIsEnter={setIsEnter}
          appid={appid}
          colId={colId}
          pageXY={pageXY}
          setColId={setColId}
        />
      )}
    </div>
  );
}

const centerDiv = css`
  text-align: center;
`;

export default MainPage;
