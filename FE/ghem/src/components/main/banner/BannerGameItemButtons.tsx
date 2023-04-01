import { css } from "@emotion/react";
import { FaHeart, FaRegSadTear, FaRegMeh } from "react-icons/fa";
import React from "react";

function BannerGameItemButtons() {
  return (
    <div css={bannerDetail}>
      <FaHeart size="25" color="red" style={{ cursor: "pointer" }} />
      BannerGameItemButtons 좋아요 버튼 + 리뷰 몇개? + 관심 없어요 버튼
    </div>
  );
}

const bannerDetail = css`
  /* margin: 0rem 6rem 2rem;
  padding: 1rem 0rem 1rem 1rem; */
  background-color: #584a6e;
  /* border-radius: 0px 0px 30px 30px; */
`;

export default BannerGameItemButtons;
