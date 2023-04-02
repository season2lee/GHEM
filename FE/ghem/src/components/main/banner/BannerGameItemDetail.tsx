import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GameDetailFromSteam } from "../HoverGameItem";

type BannerGameItemDetailProps = {
  appId: number;
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
      <p css={gameDescription}>{gameData?.short_description}</p>
      {/* <p>{gameData?.price_overview?.final_formatted}</p>
      {gameData?.is_free && <p>free</p>}
      <p>{gameData?.recommendations?.total}</p> */}
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
  font-size: 200%;
`;

const gameDetail = css`
  margin: 0rem 2rem;
`;

const gameDescription = css`
  margin: 1rem 2rem;
  height: 9.5rem;
  overflow: scroll;
  line-height: 140%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default BannerGameItemDetail;
