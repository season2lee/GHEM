import { css } from "@emotion/react";
import { FaHeart, FaRegMeh } from "react-icons/fa";
import React from "react";

type BannerGameItemButtonsProps = {
  appId: number;
};

function BannerGameItemButtons(props: BannerGameItemButtonsProps) {
  return (
    <div css={bannerDetail}>
      <FaHeart size="25" color="red" style={{ cursor: "pointer" }} />
      <FaHeart size="25" color="white" style={{ cursor: "pointer" }} />
      <FaRegMeh size="25" color="white" style={{ cursor: "pointer" }} />
    </div>
  );
}

const bannerDetail = css`
  /* margin: 0rem 6rem 2rem; */
  /* padding: 1rem 0rem 1rem 1rem; */
  padding: 0.2rem;
  background-color: #584a6e;
  /* border-radius: 0px 0px 30px 30px; */
`;

export default BannerGameItemButtons;
