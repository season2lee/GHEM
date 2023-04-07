import React, { useEffect, useState } from "react";
import HoverGameTag from "./HoverGameTag";
import noImage from "../../../assets/image/notgame.png";
import { GameDetailFromSteam } from "../HoverGameItem";
import { css } from "@emotion/react";

type HoverGameDescriptionProps = {
  gameDetail: GameDetailFromSteam | null;
  haveData: "have" | "null" | "loading";
};

function HoverGameDescription(props: HoverGameDescriptionProps) {
  const [thumbImg, setThumbImg] = useState<string>();
  const [isMovie, setIsMovie] = useState<boolean>(false);
  const [gameDescripbe, setGameDescripbe] = useState<string>();

  useEffect(() => {
    const shots = props.gameDetail?.screenshots;
    const moviesWebm = props.gameDetail?.movies;
    let describe: string | undefined = props.gameDetail?.short_description;
    if (describe) {
      describe = describe.replaceAll("<br>", "\n");
      describe = describe.replaceAll("&gt;", ">");
      describe = describe.replaceAll("&lt;", "<");
      describe = describe.replaceAll("&quot;", "");
      describe = describe.replaceAll("&nbsp;", " ");
      describe = describe.replaceAll("&amp;", "&");
    }
    setGameDescripbe(describe);

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
      setIsMovie(false);
    }
  }, [props.gameDetail]);
  return (
    <div>
      {isMovie && props.haveData !== "null" && (
        <video src={thumbImg} css={imgSize} autoPlay muted loop />
      )}
      {!isMovie && props.haveData !== "null" && (
        <img src={thumbImg} alt="" css={imgSize} />
      )}
      <div css={description}>
        {props.haveData === "have" && <p>{gameDescripbe}</p>}
        {props.haveData === "loading" && <p>loading...</p>}
        {props.haveData === "null" && (
          <div>
            <img src={noImage} alt="nodata" css={imgSize} />
            <p>현재 지역에서 플레이 불가능하거나 개발 중인 게임입니다.</p>
            <p>SORRY</p>
          </div>
        )}
      </div>
      <HoverGameTag />
    </div>
  );
}

const description = css`
  p {
    font-size: 0.8rem;
    line-height: 1.6;
    max-height: 4.8em;
    overflow: hidden;
    padding: 0rem 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const imgSize = css`
  width: 100%;
  height: auto;
`;

export default HoverGameDescription;
