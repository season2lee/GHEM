import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegSadTear, FaRegMeh } from "react-icons/fa";
import thumbUp from "@/assets/image/thumbup.svg";
import { css } from "@emotion/react";

type HoverGameTitleProps = {
  appid: number | null;
  haveData: "have" | "null" | "loading";
  gameTitle?: string;
  gameRecommend?: { total: number };
  gameType?: string;
};

function HoverGameTitle(props: HoverGameTitleProps) {
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isWish, setIsWish] = useState<boolean>(false);
  const [numDib, setNumDib] = useState<number | null>(null);
  const [realyUnLike, setRealyUnLike] = useState<boolean>(false);
  const [doUnLike, setDoUnLike] = useState<boolean>(true);
  const [unLikeTimer, setUnLikeTimer] = useState<number>(3);

  // 관심없어요 3초 세기 함수
  useEffect(() => {
    if (realyUnLike) {
      const timer = setTimeout(() => {
        setUnLikeTimer(unLikeTimer - 1);
        console.log("카운트중", unLikeTimer);
      }, 1000);
      if (unLikeTimer === 0) {
        if (doUnLike) {
          clearInterval(timer);
          disLikeGame();
          console.log("관심없음 완료");
          setRealyUnLike(false);
        }
      }
    } else {
      setUnLikeTimer(3);
      setDoUnLike(true);
    }
  }, [realyUnLike, unLikeTimer]);

  useEffect(() => {
    if (!doUnLike) {
      setRealyUnLike(false);
    }
  }, [doUnLike]);

  const getIsLike = async () => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32000/user/dibs/${props.appid}/${userId}`
      );
      // console.log(response);
      if (response.data.data.Dib !== null) {
        setNumDib(response.data.data.Dib.dibs_id);
        setIsWish(true);
      } else {
        setIsWish(false);
      }
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const wishGame = async () => {
    const data = {
      appId: props.appid,
      userId: userId,
    };
    try {
      const response = await axios.post(
        `http://j8d107.p.ssafy.io:32000/user/dibs`,
        data
      );
      setIsWish(true);
      setNumDib(response.data.data.result.dibs_id);
      // console.log(response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const unWishGame = async () => {
    try {
      const response = await axios.delete(
        `http://j8d107.p.ssafy.io:32000/user/dibs/delete/${numDib}`
      );
      setIsWish(false);
      setNumDib(null);
      // console.log(response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const disLikeGame = async () => {
    try {
      const response = await axios.post(
        `http://j8d107.p.ssafy.io:32003/dislike`,
        {
          steam_id: userId,
          app_id: props.appid,
        }
      );
      console.log(response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  useEffect(() => {
    if (userId) {
      getIsLike();
    }
  }, [userId, props.appid]);

  return (
    <div>
      {props.haveData === "null" && (
        <div>
          <p>Can't Find Detail</p>
          <FaRegSadTear size="25" fill="#8e83bb8f" />
        </div>
      )}
      {props.haveData === "have" && (
        <div>
          <p>{props.gameTitle}</p>
          <div css={justifyDiv}>
            <div>
              <span>
                <img src={thumbUp} style={{ height: "15px" }} />
              </span>
              <span>{props.gameRecommend?.total}</span>
            </div>
            <div>
              {isWish && <FaHeart onClick={unWishGame} size="25" color="red" />}
              {!isWish && (
                <FaHeart onClick={wishGame} size="25" color="white" />
              )}
              <FaRegMeh
                onClick={() => {
                  setRealyUnLike(true);
                }}
                size="25"
                fill="#8e83bb8f"
              />
              {unLikeTimer}
              {realyUnLike && (
                <p
                  onClick={() => {
                    setDoUnLike(false);
                  }}
                >
                  취소?
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const justifyDiv = css`
  display: flex;
  justify-content: space-between;
  margin: 0rem 2rem;
`;

export default HoverGameTitle;
