import { css } from "@emotion/react";
import React, { useEffect, useRef, RefObject } from "react";
import { useNavigate } from "react-router";
import BannerGameItemDetail from "./BannerGameItemDetail";

type BannerGameItemProps = {
  appId: number;
  title: string;
  canClick: boolean;
};

function BannerGameItem(props: BannerGameItemProps) {
  const navigator = useNavigate();
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
            <img
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appId}/hero_capsule.jpg`}
              // src={`https://cdn.akamai.steamstatic.com/steam/apps/${props.appId}/capsule_616x353.jpg`}
              alt={`${props.title}`}
            />
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
`;

export default BannerGameItem;
