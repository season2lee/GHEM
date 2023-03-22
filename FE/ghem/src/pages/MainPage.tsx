import HoverGameItem from "@components/main/HoverGameItem";
import { css } from "@emotion/react";
import React, { useState } from "react";
import Banner from "../components/main/Banner";
import Discount from "../components/main/Discount";
import FriendRecommend from "../components/main/FriendRecommend";
import SteadySeller from "../components/main/SteadySeller";
import TopRankNewRelease from "../components/main/TopRankNewRelease";

function MainPage() {
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const [appid, setAppid] = useState<number | null>(null);
  const [colId, setColId] = useState<string>("empty");
  return (
    <div css={centerDiv}>
      <Banner />
      <Discount
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        currentColId={colId}
      />
      <TopRankNewRelease
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        currentColId={colId}
      />
      <hr />
      <FriendRecommend />
      <hr />
      <SteadySeller
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        currentColId={colId}
      />
      먼가 깐지나는 말
      {isEnter && (
        <HoverGameItem
          setIsEnter={setIsEnter}
          appid={appid}
          colId={colId}
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
