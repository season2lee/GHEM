import { css } from '@emotion/react'
import React, { useState, useEffect } from 'react'
import StarRating from '@components/common/StarRating'
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Indicator from './Indicator'
import { mobile, tabletH } from '@/util/Mixin'
import steamLogo from '@/assets/image/steamLogo.png'
import axios from 'axios'

type GameInfoProps = {
  gameData: {
    appID: number,
    name: string,
    shortDescription: string
  } | null,
  userID: number,
  currentRating: number,
  ratingHandler: (newRating: number) => void,
}

function GameInfo({gameData, userID, currentRating, ratingHandler}: GameInfoProps) {
  const [isHover, setIsHover] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [dibsID, setDibsID] = useState<number | null>(null);
  const env = import.meta.env;

  const handleHeartClick = () => {
    setIsLike(!isLike);
  }

  const likeGame = async () => {
    if (isLike === false) {
      try {
        await axios.post(`${env.VITE_API_USER_BASE_URL}/dibs/`, {
          appId: gameData?.appID,
          userId: userID
        })
        alert("찜하기 등록 성공");
        getLikeInfo();
        setIsLike(true);
      } catch {
        alert("찜하기 등록 실패...");
      }
    } else {
      console.log(dibsID);
      if (dibsID === null) {
        return;
      }
      try {
        await axios.delete(`${env.VITE_API_USER_BASE_URL}/dibs/delete/${dibsID}`)
        setIsLike(false);
        alert("찜하기 삭제 성공");
      } catch {
        alert("찜하기 삭제 실패...");
      }
    }
  }

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const getLikeInfo = async () => {
    try {
      const { data } = await axios.get(`${env.VITE_API_USER_BASE_URL}/dibs/${gameData?.appID}/${userID}`)
      setDibsID(data.data.Dib.dibs_id);
      if (data.data.Dib.dibs_id === null) {
        setIsLike(false);
      } else {
        setIsLike(true);
      }
      console.log(data.data.Dib.dibs_id);
      
    } catch {
      console.log("찜하기 정보 얻어오기 실패...");
    }
  }

  useEffect(() => {
    getLikeInfo();
  }, [])

  if (gameData) {
    return (
      <div css={container}>
        <Indicator status={null}/>
        <div css={favoriteContainer}>
          {isLike ? (
            <FaHeart css={filledHeartIconStyle} onClick={likeGame} />
          ) : isHover ? (
            <FaHeart css={filledHeartIconStyle} onMouseLeave={handleMouseLeave} onClick={likeGame} />
          ) : (
            <FaRegHeart css={heartIconStyle} onMouseEnter={handleMouseEnter} />
          )}
          <button css={noMoreRecomm}>추천 안받을래요</button>
        </div>
        <h1 css={titleStyle}>{gameData.name}</h1>
        <p css={descContinater}>{gameData.shortDescription}</p>
        <a css={toSteamButtonStyle} href={'https://store.steampowered.com/app/' + gameData.appID} target='_blank'>
          <img src={steamLogo} />
          <p>Steam에서 보기</p>
        </a>
        <StarRating starSize={3} currentRating={currentRating} ratingHandler={ratingHandler} />
      </div>
    )
  } else {
    return (
      <div>gameData 없음!</div>
    )
  }
}

const container = css`
  position: relative;
  top: 0;
`

const favoriteContainer = css`
  display: flex;
  align-items: center;
  margin-top: 120px;
`

const filledHeartIconStyle = css`
  cursor: pointer;
  font-size: 1.5rem;
  color: red;
  &:active {
    color: rgb(255, 75, 75);
  }
`

const heartIconStyle = css`
  cursor: pointer;
  font-size: 1.5rem;
`

const noMoreRecomm = css`
  padding: 0.8rem;
  font-size: 0.8rem;
  border-radius: 0.5rem;
  border: none;
  color: white;
  background-color: rgb(88, 74, 110);
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: rgb(105, 88, 131);
  }
  &:active {
    background-color: rgb(94, 78, 117);
  }
`

const titleStyle = css`
  font-size: 5rem;
  ${tabletH} {
    font-size: 3.5rem;
  }
  ${mobile} {
    font-size: 2.5rem;
  }
`

const descContinater = css`
  width: 65%;
  ${tabletH} {
    width: 100%;
  }
  ${mobile} {
    width: 100%;
  }
  max-height: 10rem;
  overflow: hidden;
  line-height: 30px;
`

const toSteamButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  background-color: white;
  color: black;
  margin-top: 10px;
  padding: 10px 50px 10px 10px;
  border-radius: 10px;
  img {
    width: 35px;
  }
  cursor: pointer;
  &:hover {
    background-color: #D8D8D8;
  }
  &:active {
    background-color: #D8D8D8;
  }
`

export default GameInfo