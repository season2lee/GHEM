import { css } from '@emotion/react'
import React, { useState } from 'react'
import StarRating from '@components/common/StarRating'
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Indicator from './Indicator'
import { mobile, tabletH } from '@/util/Mixin'

type GameInfoProps = {
  gameData: {
    appID: number,
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
        <Indicator status={"playable"}/>
        <div css={favoriteContainer}>
          {isLike ? (
            <FaHeart css={filledHeartIconStyle} onClick={handleHeartClick} />
          ) : isHover ? (
            <FaHeart css={filledHeartIconStyle} onMouseLeave={handleMouseLeave} onClick={handleHeartClick} />
          ) : (
            <FaRegHeart css={heartIconStyle} onMouseEnter={handleMouseEnter} />
          )}
          <button css={noMoreRecomm}>추천 안받을래요</button>
        </div>
        <h1 css={titleStyle}>{gameData.name}</h1>
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
  top: 0;
`

const favoriteContainer = css`
  display: flex;
  align-items: center;
  margin-top: 120px;
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