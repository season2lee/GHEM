import { css } from '@emotion/react';
import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { AiTwotoneAlert } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';

type ReviewType = {
  appId: number,
  userId: number,
  profileImageURL?: string,
  name: string,
  date: string,
  content: string,
  helpfulCount?: number,
}

type EditDropdownProps = {
  setIsOpenEditDropdown: React.Dispatch<React.SetStateAction<boolean>>,
  getReviewData: (reviewCount: number, pageNum: number) => void,
  isWriter: boolean,
  userID: number
  appID: number,
}

function EditDropdown({setIsOpenEditDropdown, getReviewData, isWriter, userID, appID}: EditDropdownProps) {
  const env = import.meta.env;

  const handleDelete = async () => {
    setIsOpenEditDropdown(false);
    if (confirm("삭제 하시겠습니까??")) {
      try {
        const response = await axios.put(env.VITE_API_USER_BASE_URL + "/review", {
          app_id: appID,
          user_id: userID,
          content: null
        })
        
        // 삭제 결과 반영하기
        console.log("put 요청 결과:", response);
        getReviewData(5, 1);
      } catch {
        console.log("삭제 실패...");
      }
    }
  }

  const handleReport = () => {
    console.log("신고할 리뷰의 정보:", userID, appID);
    setIsOpenEditDropdown(false);
  }

  return (
    <div css={container}>
      {isWriter &&
      <div css={itemDeleteStyle} onClick={handleDelete}>
        <span>삭제</span>
        <BsTrash3 />
      </div>}
      <div css={itemStyle} onClick={handleReport}>
        <span>신고하기</span>
        <AiTwotoneAlert />
      </div>
    </div>
  )
}

const container = css`
  position: absolute;
  top: 2  0px;
  right: 10px;
  padding: 5px;
  width: 8rem;
  background-color: rgb(70, 59, 88);
  border-radius: 0.5rem;
`

const itemDeleteStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 1rem;
  color: red;
  &:hover {
    background-color: rgb(88, 74, 110);
    border-radius: 0.5rem;
  }
`

const itemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 1rem;
  &:hover {
    background-color: rgb(88, 74, 110);
    border-radius: 0.5rem;
  }
`

export default EditDropdown