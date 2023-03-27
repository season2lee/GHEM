import { css } from '@emotion/react'
import React, { useRef, useState, useEffect } from 'react'
import chad from '@/assets/image/chad.jpeg';

type ReviewInputProps = {
  isRated: boolean,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

function ReviewInput({isRated}: ReviewInputProps) {
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

  const onClickConfirm = () => {
    if (inputRef.current) {
      console.log(inputRef.current.value);
      // API 요청하기...
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
  const handleInputClick = () => {
    if (inputRef?.current) {
      if (inputRef.current.disabled === true) {
        alert("평가를 먼저 진행해주세요");
      }
    }
  }

  useEffect(() => {
    if (inputRef?.current) {
      if (isRated) {
        inputRef.current.disabled = false;
        inputRef.current.placeholder = "리뷰를 입력해주세요...";
      } else {
        inputRef.current.disabled = true;
        inputRef.current.placeholder = "평가를 먼저 해주세요";
      }
    }
  }, [isRated])

  return (
    <div>
      <div css={inputContainer}>
        <img src={chad} css={profileImageStyle} />
        <input onChange={onChangeHandler} css={reviewInputStyle} type="text" ref={inputRef} onFocus={onFocusHandler} onClick={handleInputClick} placeholder="입력해주세요..." />
      </div>
      {isFocused &&
      <div css={buttonsContainer}>
        <button onClick={onClickCancel} css={cancelButton}>취소</button>
        <button onClick={onClickConfirm} css={isActive ? addReplyButton : disabledButton}>확인</button>
      </div>
      }
    </div>
  )
}

const inputContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const profileImageStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`

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