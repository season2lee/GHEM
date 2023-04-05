/*
  1. 날짜 파싱하여 n일전, n개월 전과 같은 문구로 생성해내야함
  2. 도움됨 버튼 기능 구현할 것
*/

import React, { useEffect, useRef, useState } from 'react'
import defaultProfile from '@/assets/image/defaultProfile.jpg';
import thumbupLine from '@/assets/image/thumbup-line.svg';
import thumbUp from '@/assets/image/thumbup.svg';


import { css } from '@emotion/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import EditDropdown from './EditDropdown';
import { getUserID } from '@/api/user';

type ReviewType = {
  userId: number,
  profileImageURL?: string,
  name: string,
  date: string,
  content: string,
  helpfulCount?: number,
}

type ReviewProps = {
  review: ReviewType
}

function Review({review}: ReviewProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [userID, setUserID] = useState<number | null>(null);
  const [isOpenEditDropdown, setIsOpenEditDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickEditButton = () => {
    setIsOpenEditDropdown(!isOpenEditDropdown);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpenEditDropdown(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [])

  useEffect(() => {
    setUserID(() => {
      const id = getUserID();
      console.log("kkk", id, review.userId);
      if (id !== null) {
        return id;
      } else {
        return null;
      }
    });
  }, [userID])

  return (
    <div css={container}>
      {/* 프로필 이미지 */}
      <div style={{marginRight: "10px"}}>
        <img src={review.profileImageURL ?? defaultProfile} css={profileImageStyle} />
      </div>
      {/* 리뷰 본문 */}
      <div style={{width: "100%"}}>
        {/* 작성자명과 작성일자 */}
        <div css={headContainer}>
          <div>
            <p css={nameStyle}>{review.name}</p>
            <p css={dateStyle}>{review.date}</p>
          </div>
          {/* 삭제, 수정 드롭다운 */}
          <div css={editContainer} ref={dropdownRef}>
            <span><BiDotsVerticalRounded css={threeDotStyle} onClick={handleClickEditButton}/></span>
            {isOpenEditDropdown && <EditDropdown setIsOpenEditDropdown={setIsOpenEditDropdown} isWriter={review.userId === userID} />}
          </div>
          {/* 해당 유저가 평가한 점수 들어갈 것 
            ...
          */}
        </div>
        {/* 리뷰 텍스트 */}
        <div css={reviewContentStyle}>
          {review.content}
        </div>
        {/* 도움됨 버튼 및 누적된 횟수 */}
        {/* <div css={helpfulContainer}>
          <p css={helpfulTextStyle}>이 리뷰가 도움되었나요??</p>
          <button css={helpfulButton}>
            <img src={isHelpful ? thumbUp : thumbupLine} style={{height: "15px"}} />
          </button>
          <p css={helpfulTextStyle}>{review.helpfulCount}</p>
        </div> */}
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
  justify-content: space-between;
`

const editContainer = css`
  position: relative;
`

const threeDotStyle = css`
  cursor: pointer;
`

const nameStyle = css`
  font-weight: bold;
  margin-bottom: 3px;
`

const dateStyle = css`
  font-size: 16px;
  color: gray;
`

const reviewContentStyle = css`
  font-size: 16px;
  line-height: 1.3rem;
`

const helpfulContainer = css`
  display: flex;
  margin-top: 5px;
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