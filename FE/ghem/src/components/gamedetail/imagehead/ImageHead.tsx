/* 보완할 점들
  1. 전반적으로 레이아웃 설정이 불안정하다. 재조정 해야함
  2. 게임 설명이 담긴 <p>태그에서 설명이 길어질 경우 truncate 해야함
  3. 이미지가 존재하지 않는 경우 디폴트 이미지 보여줄 것
*/
import React, { useEffect } from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import StarRating from './StarRating'

type ImageHeadProps = {
  gameData: {
    appID: string,
    name: string,
    shortDescription: string
  } | null
}

function ImageHead({gameData}: ImageHeadProps) {
  if (gameData === null) {
    return (
      <div>스켈레톤...</div>
    )
  } else {
    return (
      <ImageContainer appID={gameData.appID}>
        <div css={infoContainer}>
          <h1 style={{fontSize: "5rem"}}>{gameData.name}</h1>
          <p css={descContinater}>{gameData.shortDescription}</p>
          <StarRating />
        </div>
      </ImageContainer>
    )
  }
}

const ImageContainer = styled.div<{appID:string}>`
  background-image: radial-gradient(ellipse 100% 100% at 50% 0,rgba(21,21,23,.55) 0,rgba(26,27,30,.65) 32%,#292233 100%), ${(props) => `url(https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appID}/library_hero.jpg)`};
  height: 40rem;
  background-position: center;
  background-size: cover;
  padding: 50px;
`

const infoContainer = css`
  margin-top: 150px;
`

const descContinater = css`
  width: 50%;
  max-height: 10rem;
  overflow: hidden;
  line-height: 30px;
`

export default ImageHead