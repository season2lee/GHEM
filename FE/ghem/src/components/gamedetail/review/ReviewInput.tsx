import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'

function ReviewInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null)
  const onFocusHandler = () => {
    setIsFocused(true);
  }
  const onClickCancel = () => {
    setIsFocused(false);
    setIsActive(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }

  return (
    <div>
      <input onChange={onChangeHandler} css={reviewInputStyle} type="text" ref={inputRef} onFocus={onFocusHandler} placeholder="입력해주세요..." />
      {isFocused &&
      <div css={buttonsContainer}>
        <button onClick={onClickCancel} css={cancelButton}>취소</button>
        <button css={isActive ? addReplyButton : disabledButton}>확인</button>
      </div>
      }
    </div>
  )
}
const reviewInputStyle = css`
  width: 100%;
  background-color: transparent;
  padding: 4px 0px 4px 0px;
  color: white;
  border: none;
  border-bottom: 2px solid gray;
  font-size: 16px;
  &:focus {
    outline: none;
    border-bottom: 2px solid white;
  }
  transition-property: border-bottom;
  transition-duration: 300ms;
`

const buttonsContainer = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

const cancelButton = css`
  font-size: 14px;
  padding: 8px 13px 8px 13px;
  border: none;
  border-radius: 20px;
  margin-left: 10px;
  color: white;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: rgb(117, 98, 146);
  }
`

const addReplyButton = css`
  font-size: 14px;
  padding: 8px 13px 8px 13px;
  border: none;
  border-radius: 20px;
  margin-left: 10px;
  color: white;
  background-color: rgb(28, 132, 255);
  cursor: pointer;
  &:hover {
    background-color: rgb(52, 145, 255);
  }
`


const disabledButton = css`
  font-size: 14px;
  padding: 8px 13px 8px 13px;
  border: none;
  border-radius: 20px;
  margin-left: 10px;
  color: rgb(255,255,255,0.5);
  background-color: rgb(91,91,91,0.5);
  cursor: default;
`

export default ReviewInput