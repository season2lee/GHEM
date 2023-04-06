import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GameDetailFromSteam } from "../HoverGameItem";
import { MdOutlineRecommend } from "react-icons/md";
import { mobile } from "@/util/Mixin";

type BannerGameItemDetailProps = {
  appId: number;
  genres: string;
  title: string;
};

function BannerGameItemDetail(props: BannerGameItemDetailProps) {
  const [gameData, setGameData] = useState<GameDetailFromSteam>();
  const [gameDescripbe, setGameDescripbe] = useState<string>();
  const env = import.meta.env;

  useEffect(() => {
    getGameDetail();
  }, []);

  useEffect(() => {
    let describe: string | undefined = gameData?.short_description;
    if (describe) {
      describe = describe.replaceAll("<br>", "\n");
      describe = describe.replaceAll("&gt;", ">");
      describe = describe.replaceAll("&lt;", "<");
      describe = describe.replaceAll("&quot;", "");
      describe = describe.replaceAll("&nbsp;", " ");
      describe = describe.replaceAll("&amp;", "&");
    }
    setGameDescripbe(describe);
  }, [gameData]);

  const getGameDetail = async () => {
    try {
      const response = await axios.get(env.VITE_GAME_DETAIL + props.appId);
      if (response.data[props.appId ?? "null"].success) {
        setGameData(response.data[props.appId ?? "null"].data);
        // console.log(response);
      } else {
        const items = document.getElementById(`${props.appId}`) as HTMLElement;
        items.style.display = "none";
      }
    } catch (err) {
      console.log("Error >>", err);
      const items = document.getElementById(`${props.appId}`) as HTMLElement;
      items.style.display = "none";
    }
  };

  return (
    <div css={gameDetail}>
      <p css={gameTitle}>
        <b>{props.title}</b>
      </p>
      <p css={genresCss}>{props.genres}</p>
      <p css={gameDescription}>{gameDescripbe}</p>
      <hr color="#caaed1" />
      <div css={priceDiv}>
        {gameData?.recommendations?.total && (
          <span css={recommendBtn}>
            <MdOutlineRecommend size={20} fill="#dceeff" />
            <span>{gameData?.recommendations?.total}</span>
          </span>
        )}
        {!gameData?.recommendations?.total && <div></div>}
        <p>{gameData?.price_overview?.final_formatted}</p>
        {gameData?.is_free && <p>free</p>}
      </div>
    </div>
  );
}

// const bannerDetail = css`
//   /* margin: 0rem 6rem 2rem;
//   padding: 1rem 0rem 1rem 1rem; */
//   /* background-color: #584a6e; */
//   /* border-radius: 0px 0px 30px 30px; */
// `;

const gameTitle = css`
  font-size: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${mobile} {
    font-size: 1rem;
  }
`;

const gameDetail = css`
  margin: 0rem 2rem;
  width: 100%;
`;

const gameDescription = css`
  margin: 1rem 2rem;
  height: 9.5rem;
  overflow-y: auto;
  line-height: 140%;
  font-weight: 300;
  text-indent: 1rem;
  word-break: normal;
  &::-webkit-scrollbar {
    background-color: aliceblue;
  }

  ${mobile} {
    font-size: 0.8rem;
    font-weight: 100;
  }
`;

const genresCss = css`
  overflow: hidden;
  text-overflow: ellipsis;
  text-indent: 1rem;
  font-size: 0.8rem;
  line-height: 120%;
  font-weight: 100;
  background-color: #9575a181;
`;

const recommendBtn = css`
  display: flex;
  align-items: center;
  font-weight: 200;
`;

const priceDiv = css`
  display: flex;
  justify-content: space-between;
  /* background-color: #0000004c; */
  p {
    font-weight: 200;
  }
`;

export default BannerGameItemDetail;
