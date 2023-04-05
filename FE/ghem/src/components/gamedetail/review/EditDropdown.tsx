import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react'
import { AiTwotoneAlert } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';

type EditDropdownProps = {
  setIsOpenEditDropdown: React.Dispatch<React.SetStateAction<boolean>>,
  isWriter: boolean
}

function EditDropdown({setIsOpenEditDropdown, isWriter}: EditDropdownProps) {
  const handleClickItem = () => {
    setIsOpenEditDropdown(false);
  }
  return (
    <div css={container}>
      {isWriter &&
      <div css={itemDeleteStyle} onClick={handleClickItem}>
        <span>삭제</span>
        <BsTrash3 />
      </div>}
      <div css={itemStyle} onClick={handleClickItem}>
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