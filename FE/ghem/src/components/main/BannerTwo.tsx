import { css } from "@emotion/react";
import React from "react";
import CommonGameList from "./game/CommonGameList";
import { PageXY } from "@/pages/MainPage";

type BannerTwoProps = {
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  setPageXY: React.Dispatch<React.SetStateAction<PageXY>>;
  currentColId: string;
  canClickWithHover: boolean;
};

function BannerTwo(props: BannerTwoProps) {
  return (
    <div css={bannerTwoDiv}>
      <span css={bannerTwoText}>LIKE YOU LIKE</span>
      <CommonGameList
        gameList={[]}
        imgType="capsule"
        scrollType={-1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        setPageXY={props.setPageXY}
        colId="bannerTwo"
        currentColId={props.currentColId}
        canClickWithHover={props.canClickWithHover}
      />
    </div>
  );
}

const bannerTwoDiv = css`
  > span {
    font-size: 60px;
  }
  margin: 10rem 6rem;
  padding: 1rem 0rem 1rem 0rem;
  background-color: #352c42;
  border-radius: 30px;
`;

const bannerTwoText = css`
  color: #fff;
  text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 7px #f6b4ff,
    0 0 10px #f1c1ff, 0 0 15px #ffd8f8, 0 0 18px #eb68ff, 0 0 23px #ffa9cb;
`;

export default BannerTwo;
