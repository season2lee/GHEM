import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { disLikeGameList } from "@/store/mainState";
import { FaHeart, FaRegSadTear, FaRegMeh } from "react-icons/fa";
import thumbUp from "@/assets/image/thumbup.svg";
import { css } from "@emotion/react";

type HoverGameTitleProps = {
  appid: number | null;
  haveData: "have" | "null" | "loading";
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  gameTitle?: string;
  gameRecommend?: { total: number };
  gameType?: string;
};

function HoverGameTitle(props: HoverGameTitleProps) {
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isWish, setIsWish] = useState<boolean>(false);
  const [numDib, setNumDib] = useState<number | null>(null);
  const [realyUnLike, setRealyUnLike] = useState<boolean>(false);
  // ㄴ 언라이크 버튼 눌렀음 확인
  const [doUnLike, setDoUnLike] = useState<boolean>(true);
  // ㄴ 진짜로 언라이크 할 건지 3초 뒤 확인함(취소하면 false 되어서 언라이크 못함)
  const [unLikeTimer, setUnLikeTimer] = useState<number>(3);

  const [userDisLikeGame, setUserDisLikeGame] =
    useRecoilState<number[]>(disLikeGameList);
  // ㄴ 관심없어요 누를 때마다 store의 dislike리스트 갱신해야함

  // 관심없어요 3초 세기 함수
  useEffect(() => {
    if (realyUnLike) {
      if (!userId) {
        alert("로그인 하세요!");
      } else {
        const timer = setTimeout(() => {
          setUnLikeTimer(unLikeTimer - 1);
          // console.log("카운트중", unLikeTimer);
        }, 1000);
        if (unLikeTimer === 0) {
          if (doUnLike) {
            clearInterval(timer);
            disLikeGame();
            console.log("관심없음 완료");
            props.setIsEnter(false);
            setRealyUnLike(false);
          }
        }
      }
    } else {
      setUnLikeTimer(3);
      setDoUnLike(true);
    }
  }, [realyUnLike, unLikeTimer]);

  useEffect(() => {
    setUnLikeTimer(3);
    setDoUnLike(true);
    setRealyUnLike(false);
  }, [props.appid]);

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
      addGame();
    }
  };

  const addGame = async () => {
    try {
      const response = await axios.post(`http://j8d107.p.ssafy.io:32003/game`, {
        app_id: props.appid,
      });
      console.log(response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const wishGame = async () => {
    if (!userId) {
      alert("로그인 하세요!");
    } else {
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
        // console.log(userDisLikeGame);
      } catch (err) {
        console.log("Error >>", err);
      }
    }
  };

  const unWishGame = async () => {
    if (!userId) {
      alert("로그인 하세요!");
    } else {
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
      // disLikegame을 store에서도 업데이트
      if (props.appid) {
        setUserDisLikeGame([...userDisLikeGame, props.appid]);
      }
      const items = document.getElementById(`${props.appid}`) as HTMLDivElement;
      items.style.display = "none";
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
        <div><span 
        css={titleContainer}>
          <p>{props.gameTitle}</p>
          {isWish && (
                <FaHeart 
                  className="heart"
                  onClick={unWishGame}
                  size="25"
                  color="red"
                  style={{ cursor: "pointer" }}
                />
              )}
              {!isWish && (
                <FaHeart
                 className="heart"
                  onClick={wishGame}
                  size="25"
                  color="white"
                  style={{ cursor: "pointer" }}
                />
              )}
        </span>
          <div css={justifyDiv}>
            <div className="thumbup">
              <span >
                <img src={thumbUp} style={{ height: "15px" }} />
              </span>
              <span>{props.gameRecommend?.total}</span>
            </div>
            <div css={btnContainer}>
              
              <FaRegMeh
                onClick={() => {
                  setRealyUnLike(true);
                }}
                style={{ cursor: "pointer" }}
                size="25"
                fill="#8e83bb8f"
              />

              {realyUnLike && (
                <div css={cancelBtn}>
                  <p>{unLikeTimer} </p>
                  <button
                    onClick={() => {
                      setDoUnLike(false);
                    }}
                  >
                    취소?
                  </button>
                </div>
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
  .thumbup {
   margin-top: 1.3rem;
  }
`;

const btnContainer = css`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const cancelBtn = css`
  display: inline-flex;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
  p {
    width: 1.6rem;
    height: 1.4rem;
    color: rgb(88, 74, 110);
    border: 0.2rem solid rgb(88, 74, 110);
    border-radius: 1.5rem;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-weight: 700;
    margin: 0.5rem;
  }
  button {
    font-size: 0.5rem;
    text-align: center;
    align-items: center;
    width: 3rem;
    height: 1rem;
    border-radius: 5px;
    /* padding: 7px 10px; */
    border: none;
    color: white;
    /* margin-right: 10%; */
    background-color: rgb(88, 74, 110);
    cursor: pointer;
    &:hover {
      background-color: rgb(117, 98, 146);
    }
  }
`;

const titleContainer = css`
  display: inline-flex;
  .heart {
    margin-left: 0.5rem;
  }
`

export default HoverGameTitle;
