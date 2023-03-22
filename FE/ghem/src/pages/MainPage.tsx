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
  return (
    <div css={centerDiv}>
      MainPage ######################
      <Banner />
      <Discount setAppid={setAppid} setIsEnter={setIsEnter} />
      <TopRankNewRelease setAppid={setAppid} setIsEnter={setIsEnter} />
      <hr />
      <FriendRecommend />
      <hr />
      <SteadySeller setAppid={setAppid} setIsEnter={setIsEnter} />
      먼가 깐지나는 말
      {isEnter && <HoverGameItem setIsEnter={setIsEnter} appid={appid} />}
    </div>
  );
}

const centerDiv = css`
  text-align: center;
`;

export default MainPage;
