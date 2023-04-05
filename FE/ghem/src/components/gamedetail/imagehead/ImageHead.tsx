/* 보완할 점들
  1. 게임 설명이 담긴 <p>태그에서 설명이 길어질 경우 truncate 해야함
  2. 이미지가 존재하지 않는 경우 디폴트 이미지 보여줄 것
*/
import React, { useEffect } from 'react'

import styled from '@emotion/styled'

type ImageHeadType = {
  appID: number
}

function ImageHead({appID}: ImageHeadType) {
  return (
    <ImageContainer appID={appID}/>
  )
}

const ImageContainer = styled.div<{appID: number}>`
  background-image: radial-gradient(ellipse 100% 100% at 50% 0,rgba(21,21,23,.55) 0,rgba(26,27,30,.65) 32%,#292233 100%), ${(props) => `url(https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appID}/library_hero.jpg)`};
  width: 100%;
  height: 40rem;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0px;
  z-index: -1;
`

export default ImageHead