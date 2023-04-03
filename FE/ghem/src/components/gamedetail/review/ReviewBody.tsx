import { css } from '@emotion/react'
import React from 'react'
import { dummyReviews } from './dummyReviews'
import Review from './Review'
import EmptyBox from "@/assets/image/emptybox.svg"

type ReviewType = {
  id?: string,
  profileImageURL?: string,
  name: string,
  date: string,
  content: string,
  helpfulCount: number,
}

type ReviewBodyType = {
  reviewData: ReviewType[] | undefined
}

function ReviewBody({reviewData}: ReviewBodyType) {
  if (reviewData) {
    return (
      <div css={container}>
        {reviewData?.map((review, index) => {
          return <div key={index}>
            <Review review={review} />
            {index !== dummyReviews.length-1 && (
              <div css={reviewBorder}></div>
            )}
          </div>
        })}
      </div>
    )
  } else {
    return (
      <div css={imageContainer}>
        <img src={EmptyBox} style={{height: "200px"}} />
        <p>아직 작성된 리뷰가 없습니다</p>
        <p>이 게임에대한 첫 리뷰를 남겨보세요!</p>
      </div>
    )
  }
}

const container = css`
  margin-top: 30px;
`

const imageContainer = css`
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-top: 10px;
    font-size: 1.5rem;
    font-weight: bold;
  }
`

const reviewBorder = css`
  /* border-bottom: 1px solid rgb(117, 98, 146); */
  margin-top: 5px;
  margin-bottom: 30px;
`

export default ReviewBody