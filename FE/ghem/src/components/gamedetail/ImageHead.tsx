/* 보완할 점들
  1. 전반적으로 레이아웃 설정이 불안정하다. 재조정 해야함
  2. 게임 설명이 담긴 <p>태그에서 설명이 길어질 경우 truncate 해야함
  3. 이미지가 존재하지 않는 경우 디폴트 이미지 보여줄 것
  radial-gradient(ellipse 100% 100% at 50% 0,rgba(21,21,23,.55) 0,rgba(26,27,30,.65) 32%,#1a1b1e 100%)
*/
import React, { useEffect } from 'react'

import { css } from '@emotion/react'
import ChoiceDisplay from './ChoiceDisplay'

type ImageHeadProps = {
  gameData: {
    appID: string,
    name: string,
    shortDescription: string
  } | null,
  choice: "recommended" | "notrecommended" | "notchosen"
}

function ImageHead({gameData, choice}: ImageHeadProps) {
  return (
    <div>
      <div css={headContainer} style={{backgroundImage: `url('https://cdn.cloudflare.steamstatic.com/steam/apps/${gameData?.appID}/library_hero.jpg')`}}>
        <div css={descContinater}>
          <h1 css={detaillHead}>{gameData?.name}</h1>
          <ChoiceDisplay choice={choice}/>
          <p css={detailHeadParagraph}>
            {gameData?.shortDescription}
          </p>
        </div>
      </div>
    </div>
  )
}

const headContainer = css`
  position: relative;
  height: 27rem;
  background-position: center;
  background-size: cover;
`

const descContinater = css`
  width: 50%;
  height: 100%;
  position: absolute;
  background: rgb(41,34,51);
  background: linear-gradient(90deg, rgba(41,34,51,1) 0%, rgba(41,34,51,1) 75%, rgba(41,34,51,0.8) 90%, rgba(41,34,51,0) 100%);
  top: 0;
  left: 0;
  padding-left: 2rem;
  padding-top: 3.5rem;
  padding-bottom: 1rem;
  padding-right: 8rem;
`

const detaillHead = css`
  font-size: 4rem;
`

const detailHeadParagraph = css`
  line-height: 150%;
`

export default ImageHead