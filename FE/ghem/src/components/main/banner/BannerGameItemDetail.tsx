import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GameDetailFromSteam } from "../HoverGameItem";
import { MdOutlineRecommend } from "react-icons/md";

type BannerGameItemDetailProps = {
  appId: number;
  genres: string;
  title: string;
};

function BannerGameItemDetail(props: BannerGameItemDetailProps) {
  const [gameData, setGameData] = useState<GameDetailFromSteam>();

  useEffect(() => {
    getGameDetail();
  }, []);

  const getGameDetail = async () => {
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${props.appId}&l=korean`
      );
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
      <p css={gameDescription}>{gameData?.short_description}</p>
      <hr color="#caaed1" />
      <div css={priceDiv}>
        {gameData?.recommendations.total && (
          <span css={recommendBtn}>
            <MdOutlineRecommend size={20} fill="#dceeff" />
            <span>{gameData?.recommendations?.total}</span>
          </span>
        )}
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
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const gameDetail = css`
  margin: 0rem 2rem;
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
`;

const genresCss = css`
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
