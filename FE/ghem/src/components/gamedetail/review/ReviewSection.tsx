import React, { useEffect, useState } from 'react'
import ReviewInput from '@components/gamedetail/review/ReviewInput'
import { css } from '@emotion/react'
import Pagination from './Pagination'
import ReviewBody from './ReviewBody';

const REVIEW_COUNT = 5;

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
  const [reviewData, setReviewData] = useState<ReviewType[]>()
  const [lastPageNum, setLastPageNum] = useState(1);  // 마지막 페이지 번호
  
  const loadReviewData = (reviewCount: number, pageNum: number) => {
    // 비동기 요청하기
    console.log("요청합니다:", reviewCount, "개 만큼", pageNum, "페이지를 요청함");
  }

  // useEffect(() => {
  //   console.log("리뷰데이터:", reviewData);
  // }, [])

  useEffect(() => {
    loadReviewData(5, currentPage);
  }, [currentPage])
  
  return (
    <div css={container}>
      {/* 헤더 타이틀 */}
      <h2 css={header}>리뷰</h2>

      {/* 리뷰 입력 컴포넌트 */}
      <ReviewInput isRated={currentRating !== 0} setCurrentPage={setCurrentPage}/>

      {/* 리뷰들 보여지는 body */}
      <ReviewBody reviewData={reviewData}/>

      {/* 페이지 컴포넌트 */}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPageNum={lastPageNum}/>
    </div>
  )
}

const container = css`
  width: 100%;
`

const header = css`
  margin-bottom: 2rem;
`



export default ReviewSection