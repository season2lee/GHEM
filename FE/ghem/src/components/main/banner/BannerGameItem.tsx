import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router";
import BannerGameItemDetail from "./BannerGameItemDetail";

type BannerGameItemProps = {
  appId: number;
  title: string;
};

function BannerGameItem(props: BannerGameItemProps) {
  const navigator = useNavigate();
  const toDetail = () => {
    navigator(`../detail/${props.appId}`);
  };

  return (
    <div>
      <div css={backImgDiv}>
        <div css={blurDiv}>
          <div css={flexDiv}>
            <img
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appId}/hero_capsule.jpg`}
              // src={`https://cdn.akamai.steamstatic.com/steam/apps/${props.appId}/capsule_616x353.jpg`}
              alt={`${props.title}`}
              onClick={toDetail}
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
  background-image: url("https://cdn.cloudflare.steamstatic.com/steam/apps/${367520}/library_hero.jpg");
`;

const blurDiv = css`
  -webkit-backdrop-filter: blur(5px);
  /* backdrop-filter: blur(1rem); */
  backdrop-filter: blur(5px);
  background-color: #8e83bb74;
  padding: 1rem;
`;

const flexDiv = css`
  display: flex;
  justify-content: center;
`;

export default BannerGameItem;
