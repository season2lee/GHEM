import { css } from "@emotion/react";
import axios from "axios";
import { FaHeart, FaRegMeh } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { disLikeGameList } from "@/store/mainState";

type BannerGameItemButtonsProps = {
  appId: number;
};

function BannerGameItemButtons(props: BannerGameItemButtonsProps) {
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
      const timer = setTimeout(() => {
        setUnLikeTimer(unLikeTimer - 1);
        // console.log("카운트중", unLikeTimer);
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
        `http://j8d107.p.ssafy.io:32000/user/dibs/${props.appId}/${userId}`
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
      appId: props.appId,
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
          app_id: props.appId,
        }
      );
      console.log(response);
      // disLikegame을 store에서도 업데이트
      if (props.appId) {
        setUserDisLikeGame([...userDisLikeGame, props.appId]);
      }
      const items = document.getElementById(`${props.appId}`) as HTMLDivElement;
      items.style.display = "none";
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  useEffect(() => {
    if (userId) {
      getIsLike();
    }
  }, [userId, props.appId]);

  return (
    <div css={bannerDetail}>
      {isWish && (
        <FaHeart
          onClick={unWishGame}
          size="25"
          color="red"
          style={{ cursor: "pointer" }}
        />
      )}
      {!isWish && (
        <FaHeart
          onClick={wishGame}
          size="25"
          color="white"
          style={{ cursor: "pointer" }}
        />
      )}
      <span>
        <FaRegMeh
          onClick={() => {
            setRealyUnLike(true);
          }}
          size="25"
          color="white"
          style={{ cursor: "pointer" }}
        />
        {realyUnLike && (
          <span>
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
          </span>
        )}
      </span>
    </div>
  );
}

const bannerDetail = css`
  /* margin: 0rem 6rem 2rem; */
  /* padding: 1rem 0rem 1rem 1rem; */
  padding-top: 0.7rem;
  height: 3rem;
  background-color: #584a6e;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  > * {
    margin: 0% 10%;
  }
  /* border-radius: 0px 0px 30px 30px; */
`;

const cancelBtn= css`
  height: 100%;
  display: inline-flex;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
  font-size: 1rem;
  p {
    width: 1.6rem;
    height: 1rem;
    color: white;
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
    text-align: center;
    width: 4rem;
    height: 1.5rem;
    border-radius: 5px;
    border: none;
    color: white;
    margin-right: 10%;
    background-color: rgb(54, 45, 68);
    cursor: pointer;
    &:hover {
      background-color: rgb(117, 98, 146);
    }
  }
`

export default BannerGameItemButtons;
