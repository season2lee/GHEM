import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { gameRecommendState, gameRecommendStateType } from "@/store/mainState";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaInfoCircle } from "react-icons/fa";
import CommonGameList from "./game/CommonGameList";
import { PageXY } from "@/pages/MainPage";
import axios from "axios";

type BannerTwoProps = {
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  setPageXY: React.Dispatch<React.SetStateAction<PageXY>>;
  currentColId: string;
  canClickWithHover: boolean;
};

// type GameList = {
//   appid: number;
//   discountPercent?: number;
//   originalPrice?: number;
//   finalPrice?: number;
//   largeImage?: string;
//   smallImage?: string;
//   headerImage?: string;
// };

function BannerTwo(props: BannerTwoProps) {
  const userId: number | null = Number(localStorage.getItem("id"));
  const [gameRecommend, setGameRecommend] =
    useRecoilState<gameRecommendStateType[]>(gameRecommendState);
  const [secondBannerList, setSecondBannerList] = useState<{ appid: number }[]>(
    []
  );
  const [randomAppid, setRandomAppid] = useState<number>();

  useEffect(() => {
    if (gameRecommend.length > 0) {
      const newList = gameRecommend.map((game) => {
        return { appid: game.app_id };
      });
      setSecondBannerList(newList);
    } else {
      // 내가 평가한 게임 중 하나 랜덤의 유사게임
      // console.log("???");
      bannerTwoListApi();
    }
  }, [gameRecommend]);

  useEffect(() => {
    if (randomAppid) {
      randomAppidGameList();
    }
  }, [randomAppid]);

  const bannerTwoListApi = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32000/user/rating/v2/${userId}`
        // `http://192.168.100.124:8080/rating/v2/${userId}`
      );
      const ids = response.data.data;
      setRandomAppid(ids[Math.floor(Math.random() * ids.length)]);
      // console.log(response, "=================");
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const randomAppidGameList = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32003/games/v2`,
        {
          params: { apps: randomAppid, steam_id: userId },
        }
      );
      const newDataList = response.data.map((special: { app_id: number }) => {
        return {
          appid: special.app_id,
        };
      });
      // console.log(response, "--------------------");
      setSecondBannerList(newDataList);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div css={bannerTwoDiv}>
      <div css={flexDiv}>
        <span css={bannerTwoText}>LIKE YOU LIKE</span>
        <span>
          <FaInfoCircle size={25} />
        </span>
      </div>
      <CommonGameList
        gameList={secondBannerList}
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

const flexDiv = css`
  display: flex;
  justify-content: space-between;
  > span {
    font-size: 70px;
    padding: 1rem 4rem 0rem 4rem;
  }
`;

const bannerTwoDiv = css`
  margin: 8rem 6rem;
  padding: 1rem 0rem;
  background-color: #352c42;
  border-radius: 30px;
`;

const bannerTwoText = css`
  color: #fff;
  text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 7px #f6b4ff,
    0 0 10px #f1c1ff, 0 0 15px #ffd8f8, 0 0 18px #eb68ff, 0 0 23px #ffa9cb;
`;

export default BannerTwo;
