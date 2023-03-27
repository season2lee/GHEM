import React, { useEffect, useState } from 'react'
import ReviewInput from '@components/gamedetail/review/ReviewInput'
import Review from '@components/gamedetail/review/Review'
import { dummyReviews } from '@components/gamedetail/review/dummyReviews'
import { css } from '@emotion/react'
import Pagination from './Pagination'

type ReciewSectionProps = {
  currentRating: number
}

type ReviewType = {
  id?: string,
  profileImageURL?: string,
  name: string,
  date: string,
  content: string,
  helpfulCount: number,
}

function ReviewSection({currentRating}: ReciewSectionProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reviewData, setReviewData] = useState<ReviewType[] | null>()
  const loadReviewData = () => {
    setReviewData(dummyReviews);
  }

  useEffect(() => {
    // 총 리뷰 갯수 받기 -> 페이지당 보여줄 갯수로 페이지 갯수까지 계산 하기 -> Pagination 그리기
    // loadReviewData();
    console.log("페이지 변경됨:", currentPage);
  }, [currentPage])

  return (
    <div css={container}>
      {/* 헤더 타이틀 */}
      <h2 css={header}>리뷰: {currentPage}</h2>

      {/* 리뷰 입력 컴포넌트 */}
      <ReviewInput isRated={currentRating !== 0}/>

      {/* 리뷰들 보여지는 body */}
      <div css={body}>
        {reviewData?.map((review, index) => {
          return <div key={index}>
            <Review review={review} />
            {index !== dummyReviews.length-1 && (
              <div css={reviewBorder}></div>
            )}
          </div>
        })}
      </div>

      {/* 페이지 컴포넌트 */}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}

const container = css`
  width: 100%;
`

const header = css`
  margin-bottom: 2rem;
`
const body = css`
  margin-top: 2rem;
`

const reviewBorder = css`
  /* border-bottom: 1px solid rgb(117, 98, 146); */
  margin-top: 5px;
  margin-bottom: 30px;
`

export default ReviewSection