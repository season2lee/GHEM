import { css } from '@emotion/react'
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react'

const RATING_COUNT = 5;
const PROPMPTS = ["", "정말 재미없었어요", "재미없었어요", "평범했어요", "재밌었어요", "정말 재밌었어요"];
const ratingArr = Array.from(Array(RATING_COUNT), (_, index) => index + 1);

type StarRatingProps = {
  starSize: number,
  currentRating: number,
  ratingHandler: (newRating: number) => void,  // 평점 입력에 대한 핸들러. 직접 정의해서 넘겨주어야 한다
  isPromptAvailable?: boolean  // 프롬프트를 껐다 키는 것을 선택
}

function StarRating({starSize, currentRating, ratingHandler, isPromptAvailable = true}: StarRatingProps) {
  const [prompt, setPrompt] = useState("");
  const handleClickStar = (newRating: number) => {
    if (currentRating === newRating) {
      setPrompt("");
      ratingHandler(0);
    } else {
      ratingHandler(newRating);
    }
  }

  useEffect(() => {
     setPrompt(promptMapping(currentRating));
  }, [currentRating])
  
  // 현재 평가 점수에 맞춰 프롬프트를 리턴
  const promptMapping = (rating: number) => {
    switch (rating) {
      case 1:
        return PROPMPTS[1];
      case 2:
        return PROPMPTS[2];
      case 3:
        return PROPMPTS[3];
      case 4:
        return PROPMPTS[4];
      case 5:
        return PROPMPTS[5];
      default:
        return ""
    }
  }

  // 별점 위를 호버링 하였을 때 프롬프트를 설정함
  const hoverHandler = (rating: number) => {
    setPrompt(promptMapping(rating));
  }

  // 별점 위에서 마우스를 떠날 때 프롬프트를 설정함
  const leaveHandler = (rating: number) => {
    if (rating !== currentRating) {  // 마우스가 올려진 별점과 현재의 평점이 다를 경우엔 
      setPrompt(promptMapping(currentRating))  // 기존의 프롬프트를 그대로 사용한다
    }
  }

  return (
    <div css={container}>
      {/* 별점 */}
      <StyledContainer starSize={starSize} rating={currentRating}>
        {ratingArr.map((rating, index) => {
          return (
            <button onClick={() => handleClickStar(rating)} onMouseEnter={() => hoverHandler(rating)} onMouseLeave={() => leaveHandler(rating)} key={index}>★</button>
          )
        })}
      </StyledContainer>
      {/* 프롬프트 */}
      {isPromptAvailable &&
        <p css={promptStyle}>{prompt}</p>
      }
    </div>
  )
}

const container = css`
  margin-top: 10px;
`

const containerWithPropmpt = css`
  
`

const StyledContainer = styled.span<{starSize: number, rating: number}>`
  button {
    font-size: ${props => `${props.starSize}` + "rem"};
    border: none;
    background-color: transparent;
    color: rgb(94, 78, 117);
    cursor: pointer;
    &:hover ~ button {
      color: rgb(94, 78, 117);
    }
  }
  @media(hover: hover) {
    &:hover {
      button {
        color: #fc0;
      }
    }
  }
  ${props => `
    button {
      &:nth-of-type(-n+${props.rating}) {
        color: #fc0;
      }
    }
  `}
`

const promptStyle = css`
  font-size: 2rem;
  font-weight: bold;
  height: 2rem;
  margin-top: 10px;
`

export default StarRating