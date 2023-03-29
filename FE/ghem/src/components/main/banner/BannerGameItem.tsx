import { css } from "@emotion/react";
import React, { useEffect, useRef, RefObject, useState } from "react";
import { useNavigate } from "react-router";
import BannerGameItemDetail from "./BannerGameItemDetail";
import heroCapsule from "../../../assets/image/hero_capsule.jpg";

type BannerGameItemProps = {
  appId: number;
  title: string;
  canClick: boolean;
};

function BannerGameItem(props: BannerGameItemProps) {
  const navigator = useNavigate();
  const [errorCount, setErrorCount] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>(
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appId}/hero_capsule.jpg`
  );

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (errorCount === 0) {
      setImgSrc(
        `https://cdn.akamai.steamstatic.com/steam/apps/${props.appId}/capsule_616x353.jpg`
      );
      setErrorCount(errorCount + 1);
    } else if (errorCount === 1) {
      setImgSrc(
        `https://cdn.akamai.steamstatic.com/steam/apps/${props.appId}/header.jpg`
      );
      setErrorCount(errorCount + 1);
    } else if (errorCount === 2) {
      setImgSrc(heroCapsule);
      //기본이미지
    }
  };
  // 374 448
  const toDetail = () => {
    if (props.canClick) {
      navigator(`../detail/${props.appId}`);
    }
  };

  return (
    <div>
      <div
        css={backImgDiv}
        onClick={toDetail}
        style={{
          backgroundImage: `url('https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appId}/library_hero.jpg')`,
        }}
      >
        <div css={blurDiv}>
          <div css={flexDiv}>
            <div
              css={flexDiv}
              style={errorCount ? { width: "auto", height: "448px" } : {}}
            >
              <img
                src={imgSrc}
                alt={`${props.title}`}
                onError={handleImgError}
                style={errorCount ? { objectFit: "cover" } : {}}
                draggable="false"
              />
              {errorCount === 2 && (
                <div css={inImgText}>
                  <p>
                    <b>{props.title}</b>
                  </p>
                </div>
              )}
            </div>
            <div>게임 설명 들어갈 건데 그렇게만 알고 있으면 됨</div>
          </div>
        </div>
      </div>
      <BannerGameItemDetail />
    </div>
  );
}

const backImgDiv = css`
  text-align: center;
  width: 100vw;
  height: auto;
`;

const blurDiv = css`
  /* backdrop-filter: blur(1rem); */
  background-color: #8e83bb74;
  padding: 1rem;
`;

const flexDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const inImgText = css`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  > p {
    font-size: 50px;
    color: #1e043d;
    text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 7px #f6b4ff,
      0 0 10px #f1c1ff, 0 0 15px #ffd8f8, 0 0 18px #eb68ff, 0 0 23px #ffa9cb;
  }
`;

export default BannerGameItem;
