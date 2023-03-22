/*
  1. 날짜 파싱하여 n일전, n개월 전과 같은 문구로 생성해내야함
  2. 도움됨 버튼 기능 구현할 것
*/

import React from 'react'
import chad from '@/assets/image/chad.jpeg';
import thumbup from '@/assets/image/thumbup.svg';
import thumbupLine from '@/assets/image/thumbup-line.svg';

import { css } from '@emotion/react';

type ReviewProps = {
  review: {
    id?: string,
    profileImageURL?: string,
    name: string,
    date: string,
    isRecomm: boolean,
    content: string,
    helpfulCount: number,
  }
}

function Review({review}: ReviewProps) {
  return (
    <div css={container}>
      {/* 프로필 이미지 */}
      <div style={{marginRight: "10px"}}>
        <img src={review.profileImageURL ?? chad} css={profileImageStyle} />
      </div>
      {/* 리뷰 본문 */}
      <div style={{width: "100%"}}>
        {/* 작성자명과 작성일자 */}
        <div css={headContainer}>
          <div>
            <p css={nameStyle}>{review.name}</p>
            <p css={dateStyle}>{review.date}</p>
          </div>
          <div css={tempContainer}>
            <img src={thumbup} css={thumbImageStyle} />
            <p css={recommStyle}>추천</p>
          </div>
        </div>
        {/* 리뷰 텍스트 */}
        <div css={reviewContentStyle}>
          {review.content}
        </div>
        {/* 도움됨 버튼 및 누적된 횟수 */}
        <div css={helpfulContainer}>
          <p css={helpfulTextStyle}>이 리뷰가 도움되었나요??</p>
          <button css={helpfulButton}>
            <img src={thumbupLine} style={{height: "15px"}} />
          </button>
          <p css={helpfulTextStyle}>{review.helpfulCount}</p>
        </div>
      </div>
    </div>
  )
}

const container = css`
  display: flex;
`

const profileImageStyle = css`
  height: 2.8rem;
  width: 2.8rem;
  border-radius: 50%;
`

const headContainer = css`
  height: 2.8rem;
  display: flex;
  align-items: center;
`

const nameStyle = css`
  font-weight: bold;
  margin-bottom: 3px;
`

const dateStyle = css`
  font-size: 16px;
  color: gray;
`

const tempContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
`

const thumbImageStyle = css`
  height: 1.2rem;
  margin-bottom: 3px;
`

const recommStyle = css`
  color: rgb(28,132,255);
  font-weight: bold;
`

const reviewContentStyle = css`
  font-size: 16px;
  line-height: 1.3rem;
`

const helpfulContainer = css`
  display: flex;
  /* justify-content: flex-end; */
`

const helpfulTextStyle = css`
  font-size: 14px;
  color: gray;
  margin-right: 10px;
`

const helpfulButton = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 5px;
`

export default Review