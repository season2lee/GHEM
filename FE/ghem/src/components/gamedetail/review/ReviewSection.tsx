import React, { useEffect, useState } from 'react'
import ReviewInput from '@components/gamedetail/review/ReviewInput'
import { css } from '@emotion/react'
import Pagination from './Pagination'
import ReviewBody from './ReviewBody';
import axios from 'axios';

const REVIEW_COUNT = 5;

type ReciewSectionProps = {
  currentRating: number,
  appID: number,
  userID: number
}

type ReviewType = {
  appId: number,
  userId: number,
  profileImageURL?: string,
  name: string,
  date: string,
  content: string,
  helpfulCount?: number,
  rating: number
}

function ReviewSection({currentRating, appID, userID}: ReciewSectionProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reviewData, setReviewData] = useState<ReviewType[]>([]);
  const [lastPageNum, setLastPageNum] = useState(1);  // 마지막 페이지 번호
  const env = import.meta.env;
  
  const getReviewData = async (reviewCount: number, pageNum: number) => {
    try {
      const response = await axios.get(`${env.VITE_API_USER_BASE_URL}/review/${appID}`, {
        params: {
          size: REVIEW_COUNT,
          page: pageNum-1
        }
      });
      const reviewDatas = response.data?.data.content ?? null;
      const temp: ReviewType[] = [];
      if (reviewDatas !== null) {
        for (const reviewData of reviewDatas) {
          const data: ReviewType = {
            appId: appID,
            userId: parseInt(reviewData.user.user_id),
            profileImageURL: reviewData.user.userProfile.substr(1, reviewData.user.userProfile.length - 2),
            name: reviewData.user.nickname,
            date: reviewData.updateDate,
            content: reviewData.content,
            rating: reviewData.rating
          }
          temp.unshift(data);
        }
        setReviewData(temp);
      } else {
        console.log("리뷰 데이터 없음");
        setReviewData([]);
      }
    } catch {
      console.log("ratingData 불러오기 실패");
    }
  }

  // useEffect(() => {
  //   console.log("리뷰데이터:", reviewData);
  // }, [])

  useEffect(() => {
    getReviewData(REVIEW_COUNT, currentPage);
  }, [currentPage, appID])
  
  return (
    <div css={container}>
      {/* 헤더 타이틀 */}
      <h2 css={header}>리뷰</h2>

      {/* 리뷰 입력 컴포넌트 */}
      <ReviewInput isRated={currentRating !== 0} getReviewData={getReviewData} appID={appID} userID={userID}/>

      {/* 리뷰들 보여지는 body */}
      <ReviewBody reviewData={reviewData} getReviewData={getReviewData}/>

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