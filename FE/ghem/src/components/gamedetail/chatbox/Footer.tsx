// Footer는 단순히 textarea를 통해 사용자로부터 입력을 받아, ChatBox에서 props로 받은 핸들러에 입력값을 넘겨주는 컴포넌트 이다

import { css } from '@emotion/react'
import React, { useRef } from 'react'
import { MessageType } from './MessageType';

type FooterProps = {
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
}

function Footer({setMessages}: FooterProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 보내기 버튼 클릭 했을 때의 핸들러
  const sendClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (textareaRef.current?.value) {
      console.log(textareaRef.current.value);
      textareaRef.current.value = "";
    }
  }
  
  return (
    <form css={container}>
      <textarea css={textareaStyle} cols={30} rows={3} ref={textareaRef}></textarea>
      <div>
        <button onClick={sendClickHandler} css={sendButtonStyle}>보내기</button>
      </div>
    </form>
  )
}

const container = css`
  font-size: 16px;
  min-height: 120px;
  border-radius: 0px 0px 10px 10px;
  background-color: rgb(70, 59, 88);
`

const textareaStyle = css`
  width: 100%;
  resize: none;
  font-size: 1em;
  padding: 10px 10px 0px 10px;
  border: none;
  outline-style: none;
  background-color: transparent;
  color: white;
  display: block;
`

const sendButtonStyle = css`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 5px;
  padding: 7px 10px;
  border: none;
  color: white;
  background-color: rgb(88, 74, 110);
  cursor: pointer;
  &:hover {
    background-color: rgb(117, 98, 146);
  }
`

export default Footer