import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DiscountGameDetail from "../discount/DiscountGameDetail";
import { PageXY } from "@/pages/MainPage";
import HeroCapsule from "../../../assets/image/hero_capsule.jpg";
import HeaderImg from "../../../assets/image/header.jpg";
import axios from "axios";

type CommonGameListItemProps = {
  gameType?: "discount" | "steady";
  appid: number;
  imgType: "header" | "capsule";
  canClick: boolean;
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  setPageXY: React.Dispatch<React.SetStateAction<PageXY>>;
  colId: string;
  isDrag: boolean;
  canClickWithHover: boolean;
  discountPercent?: number;
  originalPrice?: number;
  finalPrice?: number;
  largeImage?: string;
  smallImage?: string;
  headerImage?: string;
};

function CommonGameListItem(props: CommonGameListItemProps) {
  const navigator = useNavigate();
  const [currentHeaderImg, setCurrentHeaderImg] = useState<string>(
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appid}/header.jpg`
  );
  const [currentCapsuleImg, setCurrentCapsuleImg] = useState<string>(
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appid}/hero_capsule.jpg`
  );
  const [errorCount, setErrorCount] = useState<number>(0);
  const [title, setTitle] = useState<string | null>(null);
  const [isData, setIsData] = useState<boolean>(true);

  const toDetail = () => {
    if (props.canClick && props.canClickWithHover) {
      // console.log(props.canClickWithHover);
      navigator(`../detail/${props.appid}`);
    }
  };

  const getGameImgTitle = async (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${props.appid}&l=korean`
      );
      if (response.data[props.appid ?? "null"].success) {
        setTitle(response.data[props.appid ?? "null"].data.name);
        setCurrentHeaderImg(
          response.data[props.appid ?? "null"].data.header_image
        );
        setCurrentCapsuleImg(
          `https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appid}/capsule_616x353.jpg`
        );
      } else {
        setIsData(false);
        const target = e.target as HTMLInputElement;
        target.style.display = "none";
      }
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const handleHeaderImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (errorCount === 0) {
      getGameImgTitle(e);
      setErrorCount(errorCount + 1);
    } else if (errorCount === 1) {
      setCurrentHeaderImg(HeaderImg);
      setErrorCount(errorCount + 1);
    }
  };
  const handleCapsuleImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (errorCount === 0) {
      getGameImgTitle(e);
      setErrorCount(errorCount + 1);
    } else if (errorCount === 1) {
      setCurrentCapsuleImg(HeroCapsule);
      setErrorCount(errorCount + 1);
    }
  };

  return (
    <div
      id={`${props.appid}`}
      css={gameItem}
      onMouseOver={(e) => {
        props.setAppid(props.appid);
        props.setColId(props.colId);
        if (!props.isDrag) {
          props.setIsEnter(true);
          let x: number = e.clientX;
          let y: number = e.clientY;
          let windowWidth: number = window.innerWidth;
          let windowHeight: number = window.innerHeight;
          if (x > windowWidth / 2) {
            x -= windowWidth * 0.3;
          }
          if (y > windowHeight / 2) {
            y -= windowHeight * 0.4;
          }
          props.setPageXY({ x, y });
        }
      }}
      onMouseLeave={() => {
        props.setIsEnter(false);
        props.setColId("empty");
      }}
    >
      <div onClick={toDetail} css={relativeDiv}>
        {props.imgType === "header" && (
          <img
            css={headerImgSize}
            src={props.headerImage ? props.headerImage : currentHeaderImg}
            alt={`${props.appid}`}
            onError={handleHeaderImgError}
            draggable="false"
          />
        )}
        {props.imgType === "capsule" && (
          <img
            css={capsuleImgSize}
            src={currentCapsuleImg}
            alt={`${props.appid}`}
            onError={handleCapsuleImgError}
            draggable="false"
          />
        )}
        {isData && errorCount === 2 && (
          <div css={inImgText}>
            <p>
              <b>{title}</b>
            </p>
          </div>
        )}
      </div>
      {isData && props.gameType === "discount" && (
        <DiscountGameDetail
          discountPercent={props.discountPercent}
          originalPrice={props.originalPrice}
          finalPrice={props.finalPrice}
          largeImage={props.largeImage}
          smallImage={props.smallImage}
        />
      )}
    </div>
  );
}

const gameItem = css`
  /* margin: 5px; */
`;

const relativeDiv = css`
  position: relative;
`;

const headerImgSize = css`
  width: auto;
  height: 20vh;
`;

const capsuleImgSize = css`
  width: auto;
  height: 45vh;
`;

const inImgText = css`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  word-break: break-all;
  > p {
    font-size: large;
    color: #1e043d;
    text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 7px #f6b4ff,
      0 0 10px #f1c1ff, 0 0 15px #ffd8f8, 0 0 18px #eb68ff, 0 0 23px #ffa9cb;
  }
`;

export default CommonGameListItem;

// src={`https://cdn.akamai.steamstatic.com/steam/apps/${props.appid}/capsule_616x353.jpg`}
