import { css } from '@emotion/react'
import React, { useState } from 'react'
import StarRating from '@components/common/StarRating'
import { FaHeart, FaRegHeart } from "react-icons/fa"

type GameInfoProps = {
  gameData: {
    appID: string,
    name: string,
    shortDescription: string
  } | null,
  currentRating: number,
  ratingHandler: (newRating: number) => void,
}

function GameInfo({gameData, currentRating, ratingHandler}: GameInfoProps) {
  const [isHover, setIsHover] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const handleHeartClick = () => {
    setIsLike(!isLike);
  }
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  if (gameData) {
    return (
      <div css={container}>
        <div css={tempContainer}>
          {isLike ? (
            <FaHeart css={filledHeartIconStyle} onClick={handleHeartClick} />
          ) : isHover ? (
            <FaHeart css={filledHeartIconStyle} onMouseLeave={handleMouseLeave} onClick={handleHeartClick} />
          ) : (
            <FaRegHeart css={heartIconStyle} onMouseEnter={handleMouseEnter} />
          )}
          <button css={noMoreRecomm}>추천 안받을래요</button>
        </div>
        <h1 style={{fontSize: "5rem"}}>{gameData.name}</h1>
        <p css={descContinater}>{gameData.shortDescription}</p>
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
  margin-top: 120px;
`

const tempContainer = css`
  display: flex;
  align-items: center;
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

const descContinater = css`
  width: 50%;
  max-height: 10rem;
  overflow: hidden;
  line-height: 30px;
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

export default GameInfo