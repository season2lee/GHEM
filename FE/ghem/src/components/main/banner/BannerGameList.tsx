import { css } from "@emotion/react";
import React from "react";
import BannerGameItem from "./BannerGameItem";

function BannerGameList() {
  return (
    <div>
      <div css={recommendForU}>
        <span>
          <b>WHAT FOR YOU</b>
        </span>
        <span>O</span>
      </div>
      <BannerGameItem appId={367520} title={"hollow"} />
    </div>
  );
}

const recommendForU = css`
  > span {
    font-size: 90px;
  }
  display: flex;
  justify-content: space-between;
  margin: 2rem 6rem 0rem;
  padding: 1rem 4rem 0rem 4rem;
  background-color: #352c42;
  border-radius: 30px 30px 0px 0px;
`;

export default BannerGameList;
