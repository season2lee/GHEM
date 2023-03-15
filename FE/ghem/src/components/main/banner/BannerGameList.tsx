import { css } from "@emotion/react";
import React from "react";
import BannerGameItem from "./BannerGameItem";

function BannerGameList() {
  return (
    <div>
      <p css={recommendForU}>
        <span>
          <b>WHAT FOR YOU</b>
        </span>
        <span>◎</span>
      </p>
      <BannerGameItem />
    </div>
  );
}

const recommendForU = css`
  font-size: 90px;
`;

export default BannerGameList;
