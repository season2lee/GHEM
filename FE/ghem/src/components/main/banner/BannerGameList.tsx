import { css, keyframes } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { disLikeGameList, banGameList, userAllApp } from "@/store/mainState";
import useIntersectionObsever from "@/util/hooks/useIntersectionObserver";
import { mobile } from "@/util/Mixin";
import BannerGameItem from "./BannerGameItem";
import {
  MdAutorenew,
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";

type BannerList = {
  app_id: number;
  genre: string;
  negative_reviews: number;
  positive_reviews: number;
  rating: number;
  rating_desc: string;
  release_date: string;
  title: string;
};

function BannerGameList() {
  const userId: number | null = Number(localStorage.getItem("id"));

  const scrollRef = useRef<HTMLDivElement>(null);
  const leftTarget = useRef<HTMLDivElement>(null);
  const rightTarget = useRef<HTMLDivElement>(null);

  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [canClick, setCanClick] = useState<boolean>(true);
  const [startX, setStartX] = useState<number>(0);
  const [startPage, setStartPage] = useState<number>(0);

  const isLeftInViewport = useIntersectionObsever(leftTarget);
  const isRightInViewport = useIntersectionObsever(rightTarget);

  const [bannerList, setBannerList] = useState<BannerList[]>();

  const [userDisLikeGame, setUserDisLikeGame] =
    useRecoilState<number[]>(disLikeGameList); // 가져온 게임 리스트에서 밴 or 관심 없는 게임 필터링 처리
  const [banGame, setBanGame] = useRecoilState<number[]>(banGameList);
  const [useAllApp, setUseAllApp] = useRecoilState<boolean>(userAllApp);

  const [loading, setLoading] = useState<boolean>(false)

  const scrollElement = scrollRef.current as HTMLDivElement;

  useEffect(() => {
    bannerListApi();
    return () => {};
  }, [userDisLikeGame, startPage, useAllApp]);

  useEffect(() => {
    if (bannerList) {
      scrollElement.scrollLeft = 0;
    }
  }, [bannerList]);

  const bannerListApi = async () => {
    try {
      const response = await axios.get(
        // `http://192.168.100.124:8000/user/games`,
        `http://j8d107.p.ssafy.io:32003/user/games`,
        {
          params: { steam_id: userId, start: startPage, end: startPage + 10 },
        }
      );
      if (response) {setLoading(true)}
      const bannerListData = response.data.filter(
        (game: { app_id: number }) => {
          return !userDisLikeGame.includes(game.app_id);
        }
      );
      if (!useAllApp) {
        const newBanner = bannerListData.filter(
          (newGame: { app_id: number }) => {
            return !banGame.includes(newGame.app_id);
          }
        );
        setBannerList(newBanner);
      } else {
        setBannerList(bannerListData);
      }
      // console.log(response);
      // console.log(newBanner);
      // console.log(userDisLikeGame);
      // console.log(banGame);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const onDragStart = (e: React.MouseEvent<HTMLElement>) => {
    setIsDrag(true);
    setStartX(e.pageX);
  };

  const onDragLeave = () => {
    setIsDrag(false);
    setTimeout(() => setCanClick(true), 50); // 약간의 시간차가 있어야 클릭과 드래그를 구분 가능
  };

  const onDragEnd = () => {
    setIsDrag(false);
    setTimeout(() => setCanClick(true), 50); // 약간의 시간차가 있어야 클릭과 드래그를 구분 가능
  };

  const onDragMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isDrag) {
      setCanClick(false); // 드래그에 있어야 일반 클릭과 드래그를 true false 나누어 처리 가능
      e.preventDefault();
      scrollElement.scrollLeft += startX - e.pageX;
      setStartX(e.pageX);
    }
  };

  const toLeft = () => {
    const current =
      (scrollElement.scrollLeft - window.innerWidth) / window.innerWidth;
    scrollElement.scrollLeft = Math.round(current) * window.innerWidth - 5;
  };

  const toRight = () => {
    const current =
      (scrollElement.scrollLeft + window.innerWidth) / window.innerWidth;
    scrollElement.scrollLeft = Math.round(current) * window.innerWidth + 5;
  };

  return (
    <div>
      <div css={recommendForU}>
        <span>
          <b css={boxStyle}>WHAT FOR YOU</b>
        </span>
        <span
          onClick={() => {
            setStartPage(startPage + 10);
          }}
          style={{ cursor: "pointer" }}
        >
          <MdAutorenew size={40} color="white" />
        </span>
      </div>
      {loading ? (
        <>
        
        <div css={relativeDiv}>
          {!isLeftInViewport && (
            <MdOutlineArrowBackIos
              css={absoluteLeft}
              size={40}
              onClick={toLeft}
            />
          )}
          {!isRightInViewport && (
            <MdOutlineArrowForwardIos
              css={absoluteRight}
              size={40}
              onClick={toRight}
            />
          )}
          <div
            css={recommendList}
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragLeave}
          >
            <div ref={leftTarget}></div>
            {bannerList?.map((bannerGame) => {
              return (
                <BannerGameItem
                  appId={bannerGame.app_id}
                  title={bannerGame.title}
                  genres={bannerGame.genre}
                  canClick={canClick}
                  key={bannerGame.app_id}
                />
              );
            })}
            <div ref={rightTarget}></div>
          </div>
        </div>
        <div css={bannerDetail}></div>
        </>
      ):(
        <div ref={scrollRef} css={spanWrapper}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      )}
    </div>
  );
}

const bannerDetail = css`
  margin: 0rem 6rem 2rem;
  padding: 1rem 0rem 1rem 1rem;
  background-color: #352c42;
  border-radius: 0px 0px 30px 30px;

  ${mobile} {
    margin: 0rem 1.5rem 1rem;
    padding: 1rem 0rem 1rem 1rem;
    background-color: #352c42;
    border-radius: 0px 0px 20px 20px;
  }
`;

const recommendForU = css`
  > span {
    font-size: 90px;
  }
  display: flex;
  justify-content: space-between;
  margin: 2rem 6rem 0rem;
  padding: 1rem 4rem 0rem 4rem;
  background-color: #352c42;
  border-radius: 30px 30px 30px 30px;

  ${mobile} {
    > span {
      font-size: 35px;
    }
    display: flex;
    justify-content: space-between;
    margin: 1rem 1.5rem 0rem;
    padding: 1rem 1rem 0rem 1rem;
    background-color: #352c42;
    border-radius: 20px 20px  20px 20px;
  }
`;

const recommendList = css`
  display: flex;
  position: relative;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const floating = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow:
    0 0 1px #fff,
    0 0 6px #fff,
    0 0 8px #fff,
    0 0 10px #f6b4ff,
    0 0 15px #f1c1ff,
    0 0 20px #ffd8f8,
    0 0 30px #dd00ff,
    0 0 40px #ffa9cb;
  }

  20%, 24%, 55% {        
    text-shadow: none;
  }    
`;

const boxStyle = css`
  color: #fff;
  animation: ${floating} 1.5s infinite alternate; ;
`;

const absoluteLeft = css`
  z-index: 100;
  top: 45%;
  position: absolute;
  left: 0;
  margin: 0rem 1.5rem;
`;

const absoluteRight = css`
  z-index: 100;
  top: 45%;
  position: absolute;
  right: 0;
  margin: 0rem 1.5rem;
`;

const relativeDiv = css`
  position: relative;
`;

const spanWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 86%;
  margin-left: 7%;
  height: 3rem;


  > span {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    animation: loading 1s 0s linear infinite;
  }

  > span:nth-of-type(1) {
    animation-delay: 0s;
    background-color: #f1eff4;
  }

  > span:nth-of-type(2) {
    animation-delay: 0.2s;
    background-color: #756292;
  }

  > span:nth-of-type(3) {
    animation-delay: 0.4s;
    background-color: #584a6e;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;

export default BannerGameList;
