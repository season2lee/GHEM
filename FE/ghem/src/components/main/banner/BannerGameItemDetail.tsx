import { css } from "@emotion/react";
import axios from "axios";
import React from "react";

type BannerGameItemDetailProps = {
  appId: number;
  title: string;
};

function BannerGameItemDetail(props: BannerGameItemDetailProps) {
  const getGameDetail = async () => {
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${props.appId}&l=korean`
      );
      if (response.data[props.appId ?? "null"].success) {
        // setGamedetail(response.data[props.appid ?? "null"].data);
        // setHaveData("have");
      } else {
        // setHaveData("null");
      }
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div css={bannerDetail}>
      <h1>{props.title}</h1>
      {props.appId}
      BannerGameItemDetail(게임 이미지 + 게임 설명(가격 + 설명 + 좋아요 수 +
      가격 등 정보))
    </div>
  );
}

const bannerDetail = css`
  /* margin: 0rem 6rem 2rem;
  padding: 1rem 0rem 1rem 1rem; */
  /* background-color: #584a6e; */
  /* border-radius: 0px 0px 30px 30px; */
`;

export default BannerGameItemDetail;
