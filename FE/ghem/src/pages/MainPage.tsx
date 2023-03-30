import BannerTwo from "@components/main/BannerTwo";
import FixedButtom from "@components/main/FixedButtom";
import HoverGameItem from "@components/main/HoverGameItem";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { gameRecommendState, gameRecommendStateType } from "@/store/mainState";
import { useRecoilState } from "recoil";
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
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const [appid, setAppid] = useState<number | null>(null);
  const [colId, setColId] = useState<string>("empty");
  const [pageXY, setPageXY] = useState<PageXY>({ x: 0, y: 0 });
  const [canClickWithHover, setCanClickWithHover] = useState<boolean>(true);

  const [gameRecommend, setGameRecommend] =
    useRecoilState<gameRecommendStateType[]>(gameRecommendState);

  useEffect(() => {
    if (userId) {
      setIsLoginStatus(true);
    }
  }, [userId]);

  return (
    <div css={centerDiv}>
      <FixedButtom />
      {isLoginStatus && <Banner />}
      <BannerTwo
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        setPageXY={setPageXY}
        currentColId={colId}
        canClickWithHover={canClickWithHover}
      />
      <Discount
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        setPageXY={setPageXY}
        currentColId={colId}
        canClickWithHover={canClickWithHover}
      />
      <TopRankNewRelease
        setAppid={setAppid}
        setIsEnter={setIsEnter}
        setColId={setColId}
        setPageXY={setPageXY}
        currentColId={colId}
        canClickWithHover={canClickWithHover}
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
        canClickWithHover={canClickWithHover}
      />
      먼가 깐지나는 말
      {isEnter && (
        <HoverGameItem
          setIsEnter={setIsEnter}
          appid={appid}
          colId={colId}
          pageXY={pageXY}
          setColId={setColId}
          setCanClickWithHover={setCanClickWithHover}
        />
      )}
    </div>
  );
}

const centerDiv = css`
  text-align: center;
`;

export default MainPage;
