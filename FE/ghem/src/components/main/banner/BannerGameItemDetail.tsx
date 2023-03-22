import { css } from "@emotion/react";
import React from "react";

function BannerGameItemDetail() {
  return (
    <div css={bannerDetail}>
      BannerGameItemDetail(게임 이미지 + 게임 설명(가격 + 설명 + 좋아요 수 +
      가격 등 정보))
    </div>
  );
}

const bannerDetail = css`
  margin: 0rem 6rem 2rem;
  padding: 1rem 0rem 1rem 1rem;
  background-color: #352c42;
  border-radius: 0px 0px 30px 30px;
`;

export default BannerGameItemDetail;
