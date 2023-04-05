import BannerTwo from "@components/main/BannerTwo";
import FixedButtom from "@components/main/FixedButtom";
import HoverGameItem from "@components/main/HoverGameItem";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { mobile } from "@/util/Mixin";
import Banner from "../components/main/Banner";
import Discount from "../components/main/Discount";
import FriendRecommend from "../components/main/FriendRecommend";
import SteadySeller from "../components/main/SteadySeller";
import TopRankNewRelease from "../components/main/TopRankNewRelease";

export type PageXY = {
  x: number;
  y: number;
};

function MainPage(props: {
  setCheckLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const [appid, setAppid] = useState<number | null>(null);
  const [colId, setColId] = useState<string>("empty");
  const [pageXY, setPageXY] = useState<PageXY>({ x: 0, y: 0 });
  const [canClickWithHover, setCanClickWithHover] = useState<boolean>(true);

  useEffect(() => {
    props.setCheckLogin(true);
  }, []);

  useEffect(() => {
    if (userId) {
      setIsLoginStatus(true);
    }
  }, [userId]);

  return (
    <div css={centerDiv}>
      <div style={{ right: "0" }}>필터버튼</div>
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
      {isLoginStatus && (
        <div>
          <hr />
          <FriendRecommend />
          <hr />
        </div>
      )}
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
  position: relative;
`;

export default MainPage;
