/* 보완할 점들
  1. 토글 동작 조금 더 간결하고 확실하게 동작하게끔 구현할 것
*/

import React from 'react'
import { css } from '@emotion/react'
import gameController from "@/assets/image/gameController.png"

type ChoiceType = "recommended" | "notrecommended" | "notchosen";
type RecommendChoiceProps = {
  choice: ChoiceType,
  setChoice: React.Dispatch<React.SetStateAction<ChoiceType>>
}

function RecommendChoice({choice, setChoice}: RecommendChoiceProps) {
  // 추천 버튼 클릭 핸들러
  const clickRecommHandler = () => {
    setChoice((oldState) => {
      if (oldState === "recommended") {
        return "notchosen"
      } else {
        return "recommended"
      }
    })
  }

  // 비추천 버튼 클릭 핸들러
  const clickNotRecommHandler = () => {
    console.log("비추천비추천");
    setChoice((oldState) => {
      if (oldState === "notrecommended") {
        return "notchosen"
      } else {
        return "notrecommended"
      }
    })
  }

  return (
    <div css={componentContainer}>
      <div css={recommContainer}>
        <img src={gameController} alt="game-controller" style={{width: '10rem'}}/>
        <h3>이 게임을 추천하시나요?</h3>
        <div css={buttonContainer}>
          <button onClick={clickRecommHandler} css={choice === "recommended" ? [recommButtonStyle, recommButtonStyleActive] : recommButtonStyle}>추천해요</button>
          <button onClick={clickNotRecommHandler} css={choice === "notrecommended" ? [recommButtonStyle, recommButtonStyleActive] : recommButtonStyle}>비추천해요</button>
        </div>
      </div>
    </div>
  )
}

const recommButtonStyleActive = css`
  background-color: rgb(94, 78, 117);
`

const componentContainer = css`
  display: flex;
  justify-content: center;
`

const recommContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const buttonContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`

const recommButtonStyle = css`
  width: 7rem;
  color: white;
  background-color: transparent;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: none;
  border: 2px solid rgb(94, 78, 117);
  border-radius: 30px;
  overflow: visible;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 300ms;
  &:hover {
    background-color: rgb(94, 78, 117);
  }
  &:active {
    background-color: rgb(53, 44, 66);
  }
`

export default RecommendChoice