/* 보완할 점들
1. 전반적으로 레이아웃 설정이 불안정하다. 재조정 해야함
2. 게임 설명이 담긴 <p>태그에서 설명이 매우 길어질 경우 truncate 해야함
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
  recommChoice: "recommended" | "notrecommended" | "notchosen"
}

function ImageHead({gameData, recommChoice}: ImageHeadProps) {
  return (
    <div>
      <div css={headContainer} style={{backgroundImage: `url('https://cdn.cloudflare.steamstatic.com/steam/apps/${gameData?.appID}/library_hero.jpg')`}}>
        <div css={descContinater}>
          <h1 css={detaillHead}>{gameData?.name}</h1>
          <ChoiceDisplay recommChoice={recommChoice}/>
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
`

const descContinater = css`
  width: 50%;
  height: 100%;
  position: absolute;
  background: rgb(41,34,51);
  background: linear-gradient(90deg, rgba(41,34,51,0) 0%, rgba(41,34,51,0.8) 10%, rgba(41,34,51,1) 25%, rgba(41,34,51,1) 100%);
  top: 0;
  right: 0;
  padding-left: 8rem;
  padding-top: 3.5rem;
  padding-bottom: 1rem;
  padding-right: 2rem;
`

const detaillHead = css`
  font-size: 4rem;
`

const detailHeadParagraph = css`
  line-height: 150%;
`

export default ImageHead