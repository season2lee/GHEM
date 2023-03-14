import { css } from '@emotion/react'
import React from 'react'

type ChoiceDisplayProps = {
  recommChoice: "recommended" | "notrecommended" | "notchosen"
}

function ChoiceDisplay({recommChoice}: ChoiceDisplayProps) {
  // 유저의 선택 여부에 따라 보여지는 문구가 달라진다
  switch (recommChoice) {
    case "recommended":  // "추천"을 선택한 경우
      return (
        <h2 css={recommendationContainer}>
          <span>이 게임을&nbsp;</span>
          <span style={{color: 'rgb(52,145,255)'}}>추천</span>
          <span>하였습니다</span>
        </h2>
      )
    case "notrecommended":  // "비추천"을 선택한 경우
      return (
        <h2 css={recommendationContainer}>
          <span>이 게임을&nbsp;</span>
          <span style={{color: 'rgb(255,52,52)'}}>비추천</span>
          <span>하였습니다</span>
        </h2>
      )
    default:  // 아무것도 선택하지 않은 경우
      return (
        <h2 css={recommendationContainer}>
          <span>아직 추천하지 않았습니다</span>
        </h2>
      )
  }
}

const recommendationContainer = css`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`

export default ChoiceDisplay