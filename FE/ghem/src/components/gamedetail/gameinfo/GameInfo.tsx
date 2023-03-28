import { css } from '@emotion/react'
import React from 'react'
import StarRating from '@components/common/StarRating'

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
  if (gameData) {
    return (
      <div css={container}>
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

const descContinater = css`
  width: 50%;
  max-height: 10rem;
  overflow: hidden;
  line-height: 30px;
`

export default GameInfo