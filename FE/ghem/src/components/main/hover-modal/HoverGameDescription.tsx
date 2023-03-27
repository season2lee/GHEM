import React, { useEffect, useState } from "react";
import HoverGameTag from "./HoverGameTag";
import { GameDetailFromSteam } from "../HoverGameItem";
import { css } from "@emotion/react";

type HoverGameDescriptionProps = {
  gameDetail: GameDetailFromSteam | null;
  haveData: "have" | "null" | "loading";
};

function HoverGameDescription(props: HoverGameDescriptionProps) {
  const [thumbImg, setThumbImg] = useState<string>();
  const [isMovie, setIsMovie] = useState<boolean>(false);
  useEffect(() => {
    const shots = props.gameDetail?.screenshots;
    const moviesWebm = props.gameDetail?.movies;
    if (moviesWebm) {
      setThumbImg(
        moviesWebm[Math.floor(Math.random() * moviesWebm.length)].mp4[480]
        // shots[Math.floor(Math.random() * shots.length)].path_thumbnail
      );
      setIsMovie(true);
    } else if (shots) {
      setThumbImg(
        // moviesWebm[Math.floor(Math.random() * moviesWebm.length)].mp4[480]
        shots[Math.floor(Math.random() * shots.length)].path_thumbnail
      );
    }
  }, [props.gameDetail]);
  return (
    <div>
      {isMovie && props.haveData && (
        <video src={thumbImg} css={imgSize} controls autoPlay />
      )}
      {!isMovie && props.haveData && (
        <img src={thumbImg} alt="" css={imgSize} />
      )}
      <div css={description}>
        {props.haveData === "have" && props.gameDetail?.short_description}
        {props.haveData === "loading" && <p>loading...</p>}
        {props.haveData === "null" && (
          <p>현재 지역에서 플레이 불가능하거나 개발 중인 게임입니다.</p>
        )}
      </div>
      <HoverGameTag />
    </div>
  );
}

const description = css`
  font-size: 0.8rem;
  line-height: 1.6;
  max-height: 4.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const imgSize = css`
  width: 100%;
  height: auto;
`;

export default HoverGameDescription;
